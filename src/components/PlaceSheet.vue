<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Place } from '../data/places'
import { useLang } from '../composables/useLang'
import { useApp } from '../stores/app'
import { distance } from '../utils/geo'
import { fmt, mins } from '../utils/format'
import { gallery, markBad, src } from '../utils/images'
import { hasKey, route } from '../utils/maps'

const props = defineProps<{ place: Place }>()
defineEmits<{ close: [] }>()
const { t, lang } = useLang()
const app = useApp()
const dist = computed(() => (app.pos ? distance(app.pos, props.place) : null))
const etas = ref<Record<string, string>>({}) // real durations from the Directions API (needs key + GPS)

watch(
  () => props.place,
  (p) => {
    etas.value = {}
    if (!app.pos || !hasKey) return
    for (const m of ['WALKING', 'DRIVING', 'TRANSIT'] as const) {
      route(app.pos, p, m).then((r) => {
        if (r) etas.value[m] = r
      })
    }
  },
  { immediate: true },
)

const open = (mode: string) =>
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.place.name + ', Hof')}&travelmode=${mode}`,
    '_blank',
  )
</script>

<template>
  <div class="sheet" @click.self="$emit('close')">
    <div class="panel">
      <div class="gal">
        <img
          v-for="n in gallery(place)"
          :key="n"
          :src="src(n)"
          :alt="place.name"
          @error="markBad(n)"
        />
      </div>
      <h2>{{ place.name }}</h2>
      <p>{{ place.desc[lang] }}</p>
      <div v-if="dist !== null" class="eta">
        <div>
          🚶 {{ t('walk') }}<b>{{ etas.WALKING ?? mins(dist, 5) + ' min' }}</b>
        </div>
        <div>
          🚗 {{ t('car') }}<b>{{ etas.DRIVING ?? mins(dist, 40) + ' min' }}</b>
        </div>
        <div v-if="etas.TRANSIT">
          🚌 {{ t('transit') }}<b>{{ etas.TRANSIT }}</b>
        </div>
        <div>
          📏<b>{{ fmt(dist) }}</b>
        </div>
      </div>
      <div class="modes">
        <button @click="open('walking')">🚶 {{ t('walk') }}</button>
        <button @click="open('driving')">🚗 {{ t('car') }}</button>
        <button @click="open('transit')">🚌 {{ t('transit') }}</button>
      </div>
      <button class="close" @click="$emit('close')">{{ t('close') }}</button>
    </div>
  </div>
</template>
