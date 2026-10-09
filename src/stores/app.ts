import { defineStore } from 'pinia'
import { Geolocation } from '@capacitor/geolocation'
import { places } from '../data/places'
import { quizOf } from '../data/quiz'
import { distance, type LatLng } from '../utils/geo'
export const RADIUS = 100
const load = <T>(k: string, d: T): T => {
  try {
    return JSON.parse(localStorage.getItem(k) ?? '') as T
  } catch {
    return d
  }
}
export const useApp = defineStore('app', {
  state: () => ({
    filter: 'all',
    pos: null as LatLng | null,
    visited: load<string[]>('visited', []),
    answers: load<Record<string, number>>('answers', {}),
    persist: true,
  }),
  getters: {
    score: (s) =>
      places.reduce(
        (n, p) => n + quizOf(p).filter((q, i) => s.answers[`${p.id}:${i}`] === q.a).length,
        0,
      ),
    moduleScore: (s) => (id: string) =>
      quizOf(places.find((p) => p.id === id)!).filter((q, i) => s.answers[`${id}:${i}`] === q.a)
        .length,
  },
  actions: {
    save() {
      if (this.persist) {
        localStorage.setItem('visited', JSON.stringify(this.visited))
        localStorage.setItem('answers', JSON.stringify(this.answers))
      }
    },
    setPos(p: LatLng) {
      this.pos = p
      for (const pl of places)
        if (distance(p, pl) <= RADIUS && !this.visited.includes(pl.id)) this.visited.push(pl.id)
      this.save()
    },
    answer(id: string, i: number) {
      if (this.answers[id] === undefined) {
        this.answers[id] = i
        this.save()
      }
    },
    async startGps() {
      try {
        await Geolocation.requestPermissions()
        await Geolocation.watchPosition({ enableHighAccuracy: true }, (r) => {
          if (r) this.setPos({ lat: r.coords.latitude, lng: r.coords.longitude })
        })
      } catch {
        /* no GPS (e.g. desktop) */
      }
    },
    demo() {
      this.persist = false
      this.visited = ['rathaus', 'lorenzkirche', 'theresienstein']
      this.answers = { 'rathaus:0': 1, 'rathaus:1': 1, 'lorenzkirche:0': 0 }
      this.pos = { lat: 50.3175, lng: 11.9148 }
    },
  },
})
