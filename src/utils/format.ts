export type Options = string[] | { en: string[]; de: string[] }

export const fmt = (d: number) => (d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`)
export const mins = (d: number, kmh: number) => Math.max(1, Math.round(d / ((kmh * 1000) / 60)))
export const localized = (o: Options, lang: 'en' | 'de') => (Array.isArray(o) ? o : o[lang])
