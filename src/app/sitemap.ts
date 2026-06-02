import type {MetadataRoute} from 'next'
import {getPosts} from '@/lib/sanity'

export const dynamic = 'force-dynamic'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://carinepetry.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed: MetadataRoute.Sitemap = [
    {url: BASE, lastModified: new Date()},
    {url: `${BASE}/en`, lastModified: new Date()},
    {url: `${BASE}/clinica`, lastModified: new Date()},
    {url: `${BASE}/en/clinica`, lastModified: new Date()},
    {url: `${BASE}/mentorias`, lastModified: new Date()},
    {url: `${BASE}/en/mentorias`, lastModified: new Date()},
    {url: `${BASE}/palestras`, lastModified: new Date()},
    {url: `${BASE}/en/palestras`, lastModified: new Date()},
    {url: `${BASE}/blog`, lastModified: new Date()},
    {url: `${BASE}/en/blog`, lastModified: new Date()},
  ]

  try {
    const posts = await getPosts()
    const postUrls = posts.flatMap((p: any) => [
      {url: `${BASE}/blog/${p.slug.current}`, lastModified: p.publishedAt},
      {url: `${BASE}/en/blog/${p.slug.current}`, lastModified: p.publishedAt},
    ])
    return [...fixed, ...postUrls]
  } catch {
    return fixed // sem Sanity configurado, retorna só páginas fixas
  }
}
