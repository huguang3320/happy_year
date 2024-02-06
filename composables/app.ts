import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
// import type { SprintFestivalCouplets } from '~/packages/ai/src'

const ns = 'ai-sfc'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const prompt = useStorage(`${ns}:prompt`, '')

  // const coupletsData = useStorage<SprintFestivalCouplets>(`${ns}:couplets-data`, {
  //   菜名: '这里是菜名',
  //   上手难度: 'string'
  // })
   
  const coupletsData = ref("")

  const options = useStorage(`${ns}:options`, {
    /**
     * 是否翻转对联
     */
    inverseCouplets: true,
    /**
     * 是否反转福字
     */
    inverseFu: true,
  })

  const route = useRoute()
  onMounted(() => {
    // if (route.query.couplets)
    //   coupletsData.value = JSON.parse(decodeURIComponent(route.query.couplets as string))
    // if (route.query.prompt)
    //   prompt.value = decodeURIComponent(route.query.prompt as string)
  })

  return {
    loading,
    prompt,
    options,
    coupletsData,

    setCoupletsData(data: string) {
      coupletsData.value = data
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
