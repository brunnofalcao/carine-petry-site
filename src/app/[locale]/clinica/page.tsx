import Link from 'next/link'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {locales} from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default async function Clinica({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const base = locale === 'en' ? '/en' : ''
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">{t('clinica.eyebrow')}</div>
          <h1>{t('clinica.title')}</h1>
          <p>{t('clinica.intro')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>{t('clinica.h2_method')}</h2>
          <p>{t('clinica.method')}</p>
          <h2>{t('clinica.h2_who')}</h2>
          <p>{t('clinica.who')}</p>
          <div className="expertise">
            <span className="tag">SAM</span>
            <span className="tag">SED</span>
            <span className="tag">Covid Longa</span>
            <span className="tag">Medicina do Sono</span>
          </div>
        </div>
      </section>
      <section className="cta-band">
        <div className="container">
          <h2>{t('cta_band.title')}</h2>
          <a href="tel:+5561992721947" className="btn btn-primary">{t('clinica.cta')}</a>
        </div>
      </section>
    </main>
  )
}
