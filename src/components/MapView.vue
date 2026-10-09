<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLang } from '../composables/useLang'
import { useApp } from '../stores/app'
import { hasKey, showMap } from '../utils/maps'

const emit = defineEmits<{ pick: [id: string] }>()
const { t } = useLang()
const app = useApp()
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (hasKey && el.value) showMap(el.value, app.pos, (id) => emit('pick', id))
})
</script>

<template>
  <div v-if="hasKey" ref="el" class="map"></div>
  <section v-else class="card q">
    <h3>🗺️ Google Maps</h3>
    <p>{{ t('nokey') }}</p>
  </section>
</template>
