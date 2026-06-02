import Link from 'next/link'
import {getTranslations} from 'next-intl/server'
import {getPosts, urlFor} from '@/lib/sanity'

export const dynamic = 'force-dynamic' // ISR: atualiza a cada 60s

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  const t = await getTranslations('blog')
  const posts = await getPosts()
  const isEn = locale === 'en'
  const base = isEn ? '/en' : ''

  return (
    <main className="blog-section">
      <div className="container">
        <div className="section-head">
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>

        <div className="posts-grid">
          {posts.map((post: any) => {
            const title = isEn && post.title_en ? post.title_en : post.title
            const excerpt = isEn && post.excerpt_en ? post.excerpt_en : post.excerpt
            return (
              <article key={post._id} className="post-card">
                {post.coverImage && (
                  <Link href={`${base}/blog/${post.slug.current}`} className="post-card-img">
                    <img src={urlFor(post.coverImage).width(600).url()} alt={title} />
                  </Link>
                )}
                <div className="post-card-body">
                  <h3>{title}</h3>
                  <p>{excerpt}</p>
                  <Link href={`${base}/blog/${post.slug.current}`} className="post-card-link">
                    {t('readMore')} →
                  </Link>
                </div>
              </article>
            )
          })}
          {posts.length === 0 && (
            <p style={{color: 'var(--text-dim)'}}>
              {isEn ? 'No posts yet.' : 'Nenhum post ainda. Publique pelo painel /studio.'}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
