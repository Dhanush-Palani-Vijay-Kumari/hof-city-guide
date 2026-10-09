<script setup lang="ts">
import { places } from '../data/places'
import { totalQ } from '../data/quiz'
import { useLang } from '../composables/useLang'
import { useApp } from '../stores/app'

const { t } = useLang()
const app = useApp()
</script>

<template>
  <section class="card q">
    <h3>{{ t('count', { n: app.visited.length, m: places.length }) }}</h3>
    <div class="bar">
      <i :style="{ width: (app.visited.length / places.length) * 100 + '%' }"></i>
    </div>
    <p>{{ t('score', { n: app.score, m: totalQ }) }}</p>
    <small>{{ t('hint') }}</small>
  </section>
  <section
    v-for="p in places.filter((x) => app.visited.includes(x.id))"
    :key="p.id"
    class="card row"
  >
    ✓ {{ p.name }}
  </section>
</template>
