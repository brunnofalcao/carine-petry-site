import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {PortableText} from '@portabletext/react'
import {getTranslations} from 'next-intl/server'
import {getPost, urlFor} from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>
}): Promise<Metadata> {
  const {locale, slug} = await params
  const post = await getPost(slug)
  if (!post) return {}
  const isEn = locale === 'en'
  const title = isEn && post.title_en ? post.title_en : post.title
  const desc = isEn && post.excerpt_en ? post.excerpt_en : post.excerpt
  return {
    title,
    description: desc,
    keywords: post.seoKeywords,
    openGraph: {
      title,
      description: desc,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [urlFor(post.coverImage).width(1200).url()] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>
}) {
  const {locale, slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const t = await getTranslations('blog')
  const isEn = locale === 'en'
  const base = `/${locale}`
  const title = isEn && post.title_en ? post.title_en : post.title
  const body = isEn && post.body_en?.length ? post.body_en : post.body

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: {'@type': 'Person', name: post.author || 'Brunno Falcão'},
    datePublished: post.publishedAt,
    image: post.coverImage ? urlFor(post.coverImage).width(1200).url() : undefined,
  }
  const faqSchema =
    post.faq?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f: any) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {'@type': 'Answer', text: f.answer},
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
        />
      )}

      <article className="article">
        <Link href={`${base}/blog`} className="back-link">
          ← {t('backToBlog')}
        </Link>
        <h1 style={{marginTop: '1.5rem'}}>{title}</h1>
        <div className="article-meta">
          {post.author} ·{' '}
          {new Date(post.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div className="article-content">
          <PortableText value={body} />
        </div>

        {post.faq?.length > 0 && (
          <section className="faq">
            <h2>FAQ</h2>
            {post.faq.map((f: any, i: number) => (
              <div key={i} className="faq-item">
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </section>
        )}
      </article>
    </>
  )
}
