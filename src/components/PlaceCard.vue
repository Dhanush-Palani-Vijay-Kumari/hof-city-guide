<script setup lang="ts">
import type { Place } from '../data/places'
import { useLang } from '../composables/useLang'
import { fmt } from '../utils/format'
import { markBad, src } from '../utils/images'

defineProps<{ place: Place; visited: boolean; distance: number | null }>()
defineEmits<{ select: [] }>()
const { t, lang } = useLang()
</script>

<template>
  <article class="card" @click="$emit('select')">
    <img :src="src(place.id)" :alt="place.name" @error="markBad(place.id)" />
    <div class="body">
      <span class="tag">{{ t(place.cat) }}</span>
      <span v-if="visited" class="ok">✓ {{ t('visited') }}</span>
      <h2>{{ place.name }}</h2>
      <p>{{ place.desc[lang] }}</p>
      <small v-if="distance !== null">📍 {{ fmt(distance) }} {{ t('away') }}</small>
    </div>
  </article>
</template>
