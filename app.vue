<script setup lang="ts">
import { appName } from '~/constants'
import 'wc-github-corners'

useHead({
  title: appName,
})
</script>

<template>
  <github-corners repo="huguang3320/happy_year" blank />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
