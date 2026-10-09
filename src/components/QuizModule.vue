<script setup lang="ts">
import type { Place } from '../data/places'
import { quizOf } from '../data/quiz'
import { useLang } from '../composables/useLang'
import { useApp } from '../stores/app'
import { localized } from '../utils/format'

const props = defineProps<{ place: Place }>()
const { lang } = useLang()
const app = useApp()
const questions = quizOf(props.place)
const key = (qi: number) => `${props.place.id}:${qi}`
</script>

<template>
  <section class="card q">
    <h3>
      {{ place.name }} <small>{{ app.moduleScore(place.id) }}/{{ questions.length }}</small>
    </h3>
    <div v-for="(qq, qi) in questions" :key="qi">
      <p>{{ qi + 1 }}. {{ qq.q[lang] }}</p>
      <button
        v-for="(o, i) in localized(qq.o, lang)"
        :key="i"
        class="opt"
        :class="{
          right: app.answers[key(qi)] !== undefined && i === qq.a,
          bad: app.answers[key(qi)] === i && i !== qq.a,
        }"
        @click="app.answer(key(qi), i)"
      >
        {{ o }}
      </button>
    </div>
  </section>
</template>
