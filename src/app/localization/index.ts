import i18next, { type TOptions } from 'i18next'
import ru from '@/app/localization/locales/ru'

export const defaultLocale = 'ru-RU'
export const localization = (key: string, options?: TOptions): string => i18next.t(key, options)
export const localizationInit = (lng = defaultLocale) => {
  return i18next.init({
    lng,
    resources: {
      ru
    }
  })
}
