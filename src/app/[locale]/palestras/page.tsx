import {getTranslations, setRequestLocale} from 'next-intl/server'
import {locales} from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default async function Palestras({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">{t('palestras.eyebrow')}</div>
          <h1>{t('palestras.title')}</h1>
          <p>{t('palestras.intro')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>{t('palestras.h2_themes')}</h2>
          <p>{t('palestras.themes')}</p>
        </div>
      </section>
      <section className="cta-band">
        <div className="container">
          <h2>{t('cta_band.title')}</h2>
          <a href="tel:+5561992721947" className="btn btn-primary">{t('palestras.cta')}</a>
        </div>
      </section>
    </main>
  )
}
