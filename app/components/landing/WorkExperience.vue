<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const experiences = [
  {
    date: '2020 – Present',
    position: 'Freelance Developer',
    company: 'Bos Ampuh',
    description: 'Engineered custom backend architectures, developed robust RESTful APIs, and integrated dynamic cross-platform applications across diverse client projects, including logistics order tracking and smart parking management systems. Built automated reporting workflows from mobile activity logs, implemented geofenced attendance tools, and collaborated closely with cross-functional development teams to maintain clean, highly maintainable codebases.',
    tags: ['php', 'codeigniter', 'flutter', 'dart', 'javascript']
  },
  {
    date: '2019 – Present',
    position: 'Full Stack Developer',
    company: 'Rumah Sakit Islam Wonosobo',
    description: 'Served as the pioneer developer modernizing the hospital\'s core web and mobile infrastructure, building critical platforms including electronic medical records, self-service patient queuing, and a Play Store-published registration app. Engineered seamless data bridging and API integrations with external health services—including BPJS Kesehatan, SATUSEHAT, and the Ministry of Health\'s E-Klaim i-DRG system. Additionally, recently led the full migration of the location-restricted attendance service onto an in-house developed mobile application and self-hosted server environment.',
    tags: ['php', 'laravel', 'java', 'flutter', 'dart', 'javascript', 'nodejs', 'vuejs']
  },
  {
    date: '2017 – 2019',
    position: 'Frontend Developer',
    company: 'Intersolusi Cipta Softindo',
    description: 'Designed and implemented responsive web user interfaces for Hospital Management Information Systems, focusing on Electronic Medical Record (EMR) workflows to optimize user experience. Partnered closely with backend engineers to streamline API data consumption and carried out continuous codebase optimizations to enhance overall front-end application speed and reliability.',
    tags: ['.net', 'c#', 'javascript', 'vuejs']
  }
]
</script>

<template>
  <section id="experience" class="scroll-mt-20 pt-12 pb-16">
    <div class="w-full flex justify-start">
      <div class="split-title-container text-left text-5xl sm:text-6xl lg:text-7xl font-bold">
        <div class="solid-part">experience</div>
        <div class="outline-part" aria-hidden="true">experience</div>
      </div>
    </div>

    <div class="flex flex-col gap-10 mt-10 max-w-4xl">
      <Motion
        v-for="(experience, index) in experiences"
        :key="index"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 + 0.1 * index }"
        :in-view-options="{ once: true }"
        class="flex flex-col md:flex-row gap-2 md:gap-8"
      >
        <div class="md:w-48 shrink-0 text-muted font-medium pt-1 text-sm md:text-base">
          {{ experience.date }}
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ experience.position }}</h3>
            <span class="text-primary font-medium">{{ experience.company }}</span>
          </div>
          <p class="text-muted leading-relaxed text-sm md:text-base">
            {{ experience.description }}
          </p>
          <div v-if="experience.tags" class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="tag in experience.tags"
              :key="tag"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 ring-1 ring-inset ring-blue-500/30"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </Motion>
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
  clip-path: inset(0.75em 0 -1em 0);
}
</style>
