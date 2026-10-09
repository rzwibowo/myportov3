<script setup lang="ts">
import { computed } from 'vue'

const { data: allProjects } = await useAsyncData('landing-projects', () => {
  return queryCollection('projects').all()
})

const projects = computed(() => {
  return (allProjects.value || []).filter(p => p.highlight).slice(0, 4)
})

const getInitials = (title: string) => {
  if (!title) return 'PR'
  const words = title.split(' ').filter(w => w.length > 0)
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
</script>

<template>
  <section id="projects" class="scroll-mt-20 pt-12 pb-16">
    <div class="w-full flex justify-start">
      <div class="split-title-container text-left text-5xl sm:text-6xl lg:text-7xl font-bold">
        <div class="solid-part">projects</div>
        <div class="outline-part" aria-hidden="true">projects</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <Motion
        v-for="(project, index) in projects"
        :key="project.id"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
        class="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
      >
        <div v-if="project.image" class="aspect-video overflow-hidden">
          <img 
            :src="project.image" 
            :alt="project.title" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div v-else class="aspect-video overflow-hidden relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
          <div class="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <svg class="w-32 h-32 text-gray-200 dark:text-gray-700/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v10H4z" opacity="0.1" />
              <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
            </svg>
            <div class="absolute mb-4 text-3xl font-black text-gray-400 dark:text-gray-500 tracking-wider">
              {{ getInitials(project.title) }}
            </div>
          </div>
        </div>
        
        <div class="flex flex-col flex-1 p-6 gap-3">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h3>
            <span class="text-sm font-medium text-muted shrink-0">{{ project.year }}</span>
          </div>
          
          <div class="text-sm font-medium text-primary">
            {{ project.workplace }}
          </div>
          
          <p class="text-muted text-sm leading-relaxed flex-1">
            {{ project.description }}
          </p>
          
          <div v-if="project.technologies" class="flex flex-wrap gap-2 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="lowercase inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 ring-1 ring-inset ring-blue-500/30"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </Motion>
    </div>

    <div class="mt-12 flex justify-center">
      <UButton
        to="/projects"
        color="primary"
        variant="outline"
        size="lg"
        class="group rounded-full px-8 hover:bg-primary hover:text-white"
        trailing-icon="i-lucide-arrow-right"
      >
        View More Projects
      </UButton>
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
