<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <section id="about" class="scroll-mt-20 pt-12 pb-16">
    <div class="w-full flex justify-start">
      <div class="split-title-container text-left text-5xl sm:text-6xl lg:text-7xl font-bold">
        <div class="solid-part">{{ page.about.title }}</div>
        <div class="outline-part" aria-hidden="true">{{ page.about.title }}</div>
      </div>
    </div>

    <div class="flex flex-col gap-10 mt-10 max-w-4xl">
      <p class="text-left text-sm sm:text-base lg:text-lg text-muted">
        {{ page.about.description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.split-title-container {
  font-family: 'Oswald', sans-serif;
  text-transform: lowercase;
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.solid-part {
  line-height: 0.72;
  height: 0.75em;
  overflow: hidden;
  border-bottom: 2px solid currentColor;
  padding-right: 0.5em;
  position: relative;
  z-index: 2;
  color: currentColor;
}

.outline-part {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 0.72;
  z-index: 1;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: max(1px, 0.02em) currentColor;
  clip-path: inset(0.75em 0 -1em 0); /* Cut off the top 0.75em to show only the bottom part */
}
</style>
