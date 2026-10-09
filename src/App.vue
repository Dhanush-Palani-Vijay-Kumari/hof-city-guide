<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MapView from './components/MapView.vue'
import PlaceCard from './components/PlaceCard.vue'
import PlaceSheet from './components/PlaceSheet.vue'
import ProgressView from './components/ProgressView.vue'
import QuizModule from './components/QuizModule.vue'
import StatusBar from './components/StatusBar.vue'
import { useLang } from './composables/useLang'
import { places, type Place } from './data/places'
import { useApp } from './stores/app'
import { distance } from './utils/geo'

type Tab = 'places' | 'map' | 'quiz' | 'progress'
const tabs: Tab[] = ['places', 'map', 'quiz', 'progress']
const icons: Record<Tab, string> = { places: '📍', map: '🗺️', quiz: '❓', progress: '🏆' }
const cats = ['all', 'history', 'nature', 'culture']

const { t, locale, lang } = useLang()
const app = useApp()
const tab = ref<Tab>('places')
const sel = ref<Place | null>(null)
const params = new URLSearchParams(location.search)
const demo = params.has('demo') // ?demo: sample data and simulated status bar (used for the README screenshots)
const list = computed(() => places.filter((p) => app.filter === 'all' || p.cat === app.filter))
const pick = (id: string) => (sel.value = places.find((p) => p.id === id) ?? null)

onMounted(() => {
  const forced = params.get('lang')
  if (forced) locale.value = forced
  if (demo) app.demo()
  else app.startGps()
})
</script>

<template>
  <div class="phone">
    <StatusBar v-if="demo" />
    <header>
      <h1>Hof City Guide</h1>
      <button @click="locale = lang === 'en' ? 'de' : 'en'">
        {{ lang === 'en' ? 'DE' : 'EN' }}
      </button>
    </header>

    <main v-if="tab === 'places'">
      <div class="chips">
        <button
          v-for="c in cats"
          :key="c"
          :class="{ on: app.filter === c }"
          @click="app.filter = c"
        >
          {{ t(c) }}
        </button>
      </div>
      <PlaceCard
        v-for="p in list"
        :key="p.id"
        :place="p"
        :visited="app.visited.includes(p.id)"
        :distance="app.pos ? distance(app.pos, p) : null"
        @select="sel = p"
      />
    </main>

    <main v-else-if="tab === 'map'"><MapView @pick="pick" /></main>

    <main v-else-if="tab === 'quiz'">
      <template v-for="p in places" :key="p.id">
        <QuizModule v-if="app.visited.includes(p.id)" :place="p" />
        <section v-else class="card locked">🔒 {{ t('locked', { name: p.name }) }}</section>
      </template>
    </main>

    <main v-else><ProgressView /></main>

    <PlaceSheet v-if="sel" :place="sel" @close="sel = null" />

    <nav>
      <button v-for="x in tabs" :key="x" :class="{ on: tab === x }" @click="tab = x">
        {{ icons[x] }}<span>{{ t(x) }}</span>
      </button>
    </nav>
    <div v-if="demo" class="home"></div>
  </div>
</template>
