import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLang() {
  const { t, locale } = useI18n()
  const lang = computed(() => locale.value as 'en' | 'de')
  return { t, locale, lang }
}
