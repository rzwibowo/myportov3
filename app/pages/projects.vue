<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

const sortedProjects = computed(() => {
  if (!projects.value) return []
  return projects.value.slice().sort((a, b) => parseInt(b.year) - parseInt(a.year))
})

const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <div class="pt-12 pb-8">
      <UButton
        to="/"
        color="primary"
        variant="ghost"
        icon="i-lucide-arrow-left"
        class="-ml-2 mb-6 font-semibold transition-transform hover:-translate-x-1"
      >
        Rizki A. Wibowo
      </UButton>
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        All Projects
      </h1>
    </div>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              <th class="py-4 pr-4 sm:pr-8 font-semibold w-24">Year</th>
              <th class="py-4 pr-4 sm:pr-8 font-semibold">Project</th>
              <th class="py-4 pr-4 sm:pr-8 font-semibold hidden md:table-cell">Made at</th>
              <th class="py-4 font-semibold hidden lg:table-cell">Built with</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="project in sortedProjects" 
              :key="project.title" 
              class="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <td class="py-4 pr-4 sm:pr-8 text-sm text-muted align-top">{{ project.year }}</td>
              <td class="py-4 pr-4 sm:pr-8 align-top">
                <div class="font-bold text-gray-900 dark:text-gray-100">{{ project.title }}</div>
                
                <div class="md:hidden mt-1 text-xs font-medium text-primary">
                  {{ project.workplace }}
                </div>
                
                <div class="text-sm text-muted mt-2 leading-relaxed">
                  {{ project.description }}
                </div>

                <div class="lg:hidden flex flex-wrap gap-1.5 mt-3">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech" 
                    class="lowercase inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 ring-1 ring-inset ring-blue-500/30"
                  >
                    {{ tech }}
                  </span>
                </div>
              </td>
              <td class="py-4 pr-4 sm:pr-8 align-top text-sm text-muted hidden md:table-cell">{{ project.workplace }}</td>
              <td class="py-4 align-top hidden lg:table-cell">
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech" 
                    class="lowercase inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 ring-1 ring-inset ring-blue-500/30"
                  >
                    {{ tech }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UPageSection>
  </UPage>
</template>
