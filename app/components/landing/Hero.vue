<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
  page: IndexCollectionItem
}>()

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap' }
  ]
})
</script>

<template>
  <section class="hero-custom text-gray-900 dark:text-white">
    <div class="text text--fill">
      <h1 class="m-0 p-0 text-inherit font-inherit leading-inherit tracking-inherit">
        <span class="name">Rizki A. Wibowo</span>
        <span class="role">Backend Developer</span>
      </h1>
      <div class="absolute top-full left-0 w-full pointer-events-auto flex gap-4 mt-4 max-[36rem]:justify-center">
        <UButton icon="i-simple-icons-linkedin" to="https://linkedin.com/in/rzwibowo" target="_blank" color="neutral" variant="ghost" size="xl" aria-label="LinkedIn" />
        <UButton icon="i-simple-icons-github" to="https://github.com/rzwibowo" target="_blank" color="neutral" variant="ghost" size="xl" aria-label="GitHub" />
      </div>
    </div>

    <!-- Layer 2: gambar -->
    <div class="photo" role="img" aria-label="Foto Rizki A. Wibowo"></div>

    <!-- Layer 3: nama fill + "Backend Developer" outline (di atas gambar) -->
    <div class="text text--outline" aria-hidden="true">
      <h1 class="m-0 p-0 text-inherit font-inherit leading-inherit tracking-inherit">
        <span class="name">Rizki A. Wibowo</span>
        <span class="role">Backend Developer</span>
      </h1>
    </div>
  </section>
</template>

<style scoped>
.hero-custom {
  --foto: url("/foto.png");
  --d: clamp(11rem, 40vw, 21rem);
  --fs: clamp(2.1rem, 8.2vw, 5.2rem);

  display: grid;
  align-items: center;
  min-height: 100svh;
  padding: clamp(1rem, 4vw, 3rem);
  overflow: hidden;
  font-family: "Oswald", "Arial Narrow", Impact, sans-serif;
}

.hero-custom > * {
  grid-area: 1 / 1;
}

.photo {
  position: relative;
  z-index: 2;
  justify-self: start;
  width: var(--d);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--foto) center / cover no-repeat;
  overflow: hidden;
}

.text {
  margin: 0 0 0 calc(var(--d) * 0.7);
  font-size: var(--fs);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.005em;
  pointer-events: none;
}

.text .name,
.text .role {
  display: block;
}

.text .role {
  font-size: 0.72em;
  margin-top: 0.06em;
}

.text--fill {
  position: relative;
  z-index: 1;
  color: currentColor;
}

.text--outline {
  position: relative;
  z-index: 3;
  color: currentColor;
}

.text--outline .name,
.text--outline .role {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: max(1px, 0.02em) currentColor;
}

@media (max-width: 36rem) {
  .hero-custom {
    --fs: clamp(1.8rem, 9.4vw, 3rem);
    justify-items: center;
    align-items: center;
  }
  .photo {
    justify-self: center;
  }
  .text {
    align-self: center;
    margin: calc(var(--d) * 0.62) 0 0 0;
    text-align: center;
  }
}
</style>
