'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useTranslations} from 'next-intl'

const LOGO = 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923045/logo_principal_completo_vvzn8v.png'

export function Header({locale}: {locale: string}) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const base = locale === 'en' ? '/en' : ''

  const cleanPath = pathname.replace(/^\/en/, '') || '/'
  const ptHref = cleanPath
  const enHref = cleanPath === '/' ? '/en' : `/en${cleanPath}`

  return (
    <header className="header">
      <Link href={base || '/'}>
        <img className="logo-img" src={LOGO} alt="Dra. Carine Petry" />
      </Link>
      <nav className="nav-links">
        <Link href={`${base}/clinica`}>{t('clinica')}</Link>
        <Link href={`${base}/mentorias`}>{t('mentorias')}</Link>
        <Link href={`${base}/blog`}>{t('blog')}</Link>
        <Link href={`${base}/palestras`}>{t('palestras')}</Link>
        <div className="lang-switch">
          <Link href={ptHref} className={locale === 'pt' ? 'active' : ''}>PT</Link>
          <Link href={enHref} className={locale === 'en' ? 'active' : ''}>EN</Link>
        </div>
      </nav>
    </header>
  )
}
