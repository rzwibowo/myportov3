<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const activeSection = ref('')

onMounted(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]')
    let current = ''

    if (window.scrollY < 100) {
      activeSection.value = ''
      return
    }

    sections.forEach((section) => {
      // Use getBoundingClientRect for more accurate viewport checking
      const rect = section.getBoundingClientRect()
      // If the top of the section is near the top of the viewport
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section.getAttribute('id') || ''
      }
    })

    if (current) {
      activeSection.value = current
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  setTimeout(handleScroll, 100)

  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const dynamicLinks = computed(() => {
  return props.links.map((link) => {
    const isHashActive = Boolean(activeSection.value && link.to?.toString().includes(`#${activeSection.value}`))
    return {
      ...link,
      active: isHashActive,
      class: isHashActive ? 'font-bold' : ''
    }
  })
})
</script>

<template>
  <div class="fixed top-0 left-1/2 z-10 w-full -translate-x-1/2">
    <div
      class="mx-auto mt-4 flex w-fit items-center rounded-full
             border border-muted/50 bg-muted/80 px-2
             shadow-lg shadow-neutral-950/5 backdrop-blur-sm"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex size-9 items-center justify-center shrink-0 transition-all duration-300"
        :style="$route.path === '/' && activeSection === '' ? 'animation: blueGlowShape 2s infinite ease-in-out;' : ''"
      >
        <img src="/logo.png" alt="Brand Logo" class="size-8 object-contain dark:invert drop-shadow-[0_0_1px_rgba(0,0,0,1)] dark:drop-shadow-[0_0_1px_rgba(255,255,255,1)]">
      </NuxtLink>

      <!-- Navigation -->
      <UNavigationMenu
        :items="dynamicLinks"
        variant="link"
        color="neutral"
        :ui="{
          link: 'px-2 py-1 transition-all',
          linkLeadingIcon: 'hidden'
        }"
      >
        <template #list-trailing>
          <ColorModeButton />
        </template>
      </UNavigationMenu>
    </div>
  </div>
</template>

<style>
@keyframes blueGlowShape {
  0%, 100% {
    filter: drop-shadow(0 0 4px #38bdf8) drop-shadow(0 0 8px #38bdf8);
  }
  50% {
    filter: drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 16px #38bdf8) drop-shadow(0 0 25px #38bdf8);
  }
}
</style>
