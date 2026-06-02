import Link from 'next/link'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {locales} from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

const PORTRAIT =
  'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923045/logo_principal_completo_vvzn8v.png'

export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const base = locale === 'en' ? '/en' : ''

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-eyebrow">{t('hero.eyebrow')}</div>
            <h1>
              {t('hero.title_1')} <em>{t('hero.title_em')}</em>
            </h1>
            <p className="hero-sub">{t('hero.sub')}</p>
            <div className="btn-row">
              <Link href={`${base}/clinica`} className="btn btn-primary">
                {t('hero.cta_consulta')}
              </Link>
              <Link href={`${base}/mentorias`} className="btn btn-outline">
                {t('hero.cta_mentoria')}
              </Link>
            </div>
            <p className="hero-credentials">{t('hero.credentials')}</p>
          </div>
          <div className="hero-portrait">
            <img src={PORTRAIT} alt="Dra. Carine Petry" />
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t('pillars.eyebrow')}</div>
            <h2>{t('pillars.title')}</h2>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pillar-num">01</div>
              <h3>{t('pillars.clinica_title')}</h3>
              <p>{t('pillars.clinica_desc')}</p>
              <Link href={`${base}/clinica`}>{t('pillars.link')} →</Link>
            </div>
            <div className="pillar">
              <div className="pillar-num">02</div>
              <h3>{t('pillars.mentoria_title')}</h3>
              <p>{t('pillars.mentoria_desc')}</p>
              <Link href={`${base}/mentorias`}>{t('pillars.link')} →</Link>
            </div>
            <div className="pillar">
              <div className="pillar-num">03</div>
              <h3>{t('pillars.palestra_title')}</h3>
              <p>{t('pillars.palestra_desc')}</p>
              <Link href={`${base}/palestras`}>{t('pillars.link')} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t('expertise.eyebrow')}</div>
            <h2>{t('expertise.title')}</h2>
            <p>{t('expertise.desc')}</p>
          </div>
          <div className="expertise">
            <span className="tag">Síndrome de Ativação de Mastócitos (SAM)</span>
            <span className="tag">Síndrome de Ehlers-Danlos (SED)</span>
            <span className="tag">Covid Longa</span>
            <span className="tag">Medicina do Sono</span>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="container">
          <h2>"{t('manifesto.text')}"</h2>
          <p className="attr">— {t('manifesto.attr')}</p>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container">
          <h2>{t('cta_band.title')}</h2>
          <p>{t('cta_band.desc')}</p>
          <Link href={`${base}/clinica`} className="btn btn-primary">
            {t('cta_band.btn')}
          </Link>
        </div>
      </section>
    </main>
  )
}
