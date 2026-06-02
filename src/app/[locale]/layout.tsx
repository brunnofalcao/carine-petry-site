import type {Metadata} from 'next'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {locales} from '@/i18n'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const isEn = locale === 'en'
  return {
    title: isEn ? 'Brunno Falcão — Authority & Movement' : 'Brunno Falcão — Autoridade & Movimento',
    description: isEn
      ? 'Strategy, health and positioning for professionals who refuse to play small.'
      : 'Estratégia, saúde e posicionamento para profissionais que se recusam a jogar pequeno.',
    alternates: {
      languages: {pt: '/', en: '/en'},
    },
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'pt_BR',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!locales.includes(locale as any)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
