import {NextRequest, NextResponse} from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {createClient} from 'next-sanity'

/**
 * Webhook do Sanity: dispara quando um post é publicado.
 * Traduz título, resumo e corpo PT -> EN via Claude e
 * grava de volta no documento (campos *_en).
 *
 * Configurar no Sanity: Manage > API > Webhooks
 *   URL: https://SEU-DOMINIO.vercel.app/api/translate
 *   Trigger: Create + Update
 *   Filter: _type == "post"
 */

const anthropic = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY})

const sanityWrite = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // token com permissão de escrita
  useCdn: false,
})

async function translate(text: string, kind: string): Promise<string> {
  if (!text?.trim()) return ''
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `Translate this ${kind} from Brazilian Portuguese to natural, fluent English. Keep the tone premium and professional. Return ONLY the translation, no preamble:\n\n${text}`,
      },
    ],
  })
  const block = msg.content.find((b) => b.type === 'text')
  return block && block.type === 'text' ? block.text.trim() : ''
}

// Traduz blocos de Portable Text preservando a estrutura
async function translateBody(body: any[]): Promise<any[]> {
  if (!Array.isArray(body)) return []
  const out = []
  for (const block of body) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      const children = []
      for (const child of block.children) {
        if (child._type === 'span' && child.text?.trim()) {
          children.push({...child, text: await translate(child.text, 'paragraph')})
        } else {
          children.push(child)
        }
      }
      out.push({...block, children})
    } else {
      out.push(block) // imagens e outros tipos passam intactos
    }
  }
  return out
}

export async function POST(req: NextRequest) {
  try {
    const doc = await req.json()
    if (doc._type !== 'post') {
      return NextResponse.json({skipped: true})
    }

    const [title_en, excerpt_en, body_en] = await Promise.all([
      translate(doc.title || '', 'blog title'),
      translate(doc.excerpt || '', 'summary'),
      translateBody(doc.body || []),
    ])

    await sanityWrite
      .patch(doc._id)
      .set({title_en, excerpt_en, body_en})
      .commit()

    return NextResponse.json({ok: true, translated: doc._id})
  } catch (err: any) {
    console.error('Erro na tradução:', err)
    return NextResponse.json({error: err.message}, {status: 500})
  }
}
