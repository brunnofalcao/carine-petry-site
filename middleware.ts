import createMiddleware from 'next-intl/middleware'
import {locales, defaultLocale} from './src/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // PT na raiz (/), EN em /en
})

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)']
}
