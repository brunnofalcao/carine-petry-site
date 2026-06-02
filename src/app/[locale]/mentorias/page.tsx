import {getTranslations, setRequestLocale} from 'next-intl/server'
import {locales} from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default async function Mentorias({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">{t('mentorias.eyebrow')}</div>
          <h1>{t('mentorias.title')}</h1>
          <p>{t('mentorias.intro')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>{t('mentorias.h2_what')}</h2>
          <p>{t('mentorias.what')}</p>
          <h2>{t('mentorias.h2_format')}</h2>
          <p>{t('mentorias.format')}</p>
        </div>
      </section>
      <section className="cta-band">
        <div className="container">
          <h2>{t('cta_band.title')}</h2>
          <a href="tel:+5561992721947" className="btn btn-primary">{t('mentorias.cta')}</a>
        </div>
      </section>
    </main>
  )
}
