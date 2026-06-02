'use client'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import {usePathname} from 'next/navigation'

export function Footer() {
  const t = useTranslations()
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')
  const base = isEn ? '/en' : ''

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem'}}>Dra. Carine Petry</h4>
            <p style={{fontSize: '0.9rem', maxWidth: '320px'}}>{t('footer.tagline')}</p>
            <p style={{fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6}}>CRM-DF 15342 · RQE 16243</p>
          </div>
          <div>
            <h4>{t('footer.nav_title')}</h4>
            <Link href={`${base}/clinica`}>{t('nav.clinica')}</Link>
            <Link href={`${base}/mentorias`}>{t('nav.mentorias')}</Link>
            <Link href={`${base}/blog`}>{t('nav.blog')}</Link>
            <Link href={`${base}/palestras`}>{t('nav.palestras')}</Link>
          </div>
          <div>
            <h4>{t('footer.contact_title')}</h4>
            <a href="tel:+556132637721">(61) 3263-7721</a>
            <a href="tel:+5561992721947">(61) 99272-1947</a>
            <p style={{fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7}}>{t('footer.address')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Dra. Carine Petry. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
