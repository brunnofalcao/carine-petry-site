import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post do Blog',
  type: 'document',
  fields: [
    // ---- CONTEÚDO EM PORTUGUÊS (você escreve aqui) ----
    defineField({
      name: 'title',
      title: 'Título (PT)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo (PT) — usado em SEO e cards',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo (PT)',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),

    // ---- CONTEÚDO EM INGLÊS (preenchido automaticamente pela IA) ----
    defineField({
      name: 'title_en',
      title: 'Title (EN) — auto',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'excerpt_en',
      title: 'Excerpt (EN) — auto',
      type: 'text',
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: 'body_en',
      title: 'Body (EN) — auto',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
      readOnly: true,
    }),

    // ---- SEO / GEO ----
    defineField({
      name: 'seoKeywords',
      title: 'Palavras-chave (SEO)',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (potencializa GEO — citação em IA)',
      description: 'Perguntas e respostas diretas. Aumenta chance de ser citado por ChatGPT/Perplexity.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Pergunta', type: 'string'},
            {name: 'answer', title: 'Resposta', type: 'text', rows: 2},
          ],
        },
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Brunno Falcão',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage'},
  },
})
