import { reactive } from 'vue'
import type { Place } from '../data/places'

// images without a real .jpg fall back to the generated .svg illustration
const bad = reactive(new Set<string>())
export const markBad = (name: string) => bad.add(name)
export const src = (name: string) => `places/${name}.${bad.has(name) ? 'svg' : 'jpg'}`
export const gallery = (p: Place) => [p.id, `${p.id}-2`, `${p.id}-3`]
