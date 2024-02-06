<script lang="ts" setup>
import consola from 'consola'

import { useMagicKeys } from '@vueuse/core'
import { config } from '~/config'

const app = useAppStore()

/**
 * generate sfc 年夜饭
 */
async function generate() {
  if (app.loading)
    return

  app.loading = true
  const data = await $fetch('/api/generate', {
    query: {
      nyfsl: app.nyfsl,
      nyfcx: app.nyfcx,
      nyfjksw: app.nyfjksw 
    },
  })
  consola.info(data)
  if (data) {
    // TODO: add 生成失败提示
    app.setCoupletsData(data)
  }

  app.loading = false
}

// Ctrl + Enter / Cmd + Enter to generate
const { Ctrl_enter, Cmd_enter } = useMagicKeys()
watch(() => [Cmd_enter.value, Ctrl_enter.value], (v) => {
  if (v)
    generate()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- <textarea
      v-model="app.prompt"
      placeholder="请输入年夜饭的数据"
      class="w-full rounded-lg p-4 shadow dark:bg-dark-800 outline-none!"
      border="~ gray focus:(yellow-500)"
      :maxlength="config.inputMaxLength"
    /> -->
    <div class="flex-1">
    <input
      v-model="app.nyfsl"
      placeholder="请输入年夜饭数量"
      class="w-full rounded-lg p-4 shadow dark:bg-dark-800 outline-none!"
      border="~ gray focus:(yellow-500)"
      :maxlength="config.inputMaxLength"
    />
  </div>

  <div class="flex-1">
    <input
      v-model="app.nyfcx"
      placeholder="请输入菜系"
      class="w-full rounded-lg p-4 shadow dark:bg-dark-800 outline-none!"
      border="~ gray focus:(yellow-500)"
      :maxlength="config.inputMaxLength"
    />
  </div>

  <div class="flex-1">
    <input
      v-model="app.nyfjksw"
      placeholder="请输入忌口食物（例如：不吃辣、不吃猪肉）"
      class="w-full rounded-lg p-4 shadow dark:bg-dark-800 outline-none!"
      border="~ gray focus:(yellow-500)"
      :maxlength="config.inputMaxLength"
    />
  </div>

    <button
      class="font-zmx w-full btn" text="black 2xl"
      :class="{ 'btn-disabled': app.loading }"
      flex items-center justify-center
      :disabled="app.loading"
      @click="generate"
    >
      {{ app.loading ? '生成中...' : '生成年夜饭菜单~' }}
      <div v-if="app.loading" class="i-svg-spinners:pulse ml-2" />
    </button>
  </div>
</template>
