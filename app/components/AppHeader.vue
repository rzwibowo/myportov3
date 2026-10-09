<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
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
        class="flex size-9 items-center justify-center rounded-full shrink-0"
      >
        <img src="/logo.png" alt="Brand Logo" class="size-8 object-contain dark:invert drop-shadow-[0_0_1px_rgba(0,0,0,1)] dark:drop-shadow-[0_0_1px_rgba(255,255,255,1)]" />
      </NuxtLink>

      <!-- Navigation -->
      <UNavigationMenu
        :items="links"
        variant="link"
        color="neutral"
        :ui="{
          link: 'px-2 py-1',
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
