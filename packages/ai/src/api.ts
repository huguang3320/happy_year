import consola from 'consola'
import type OpenAI from 'openai'
import { baseChatCompletionCreateParams, baseModel, openai } from './config'

// TODO: pass params
import { config } from '~/config'

export async function getCompletion(msg: string) {
  const chatCompletion = await openai.chat.completions.create({
    ...baseChatCompletionCreateParams,
    messages: [{ role: 'system', content: 'ok' },{ role: 'user', content: msg }],
    model: baseModel,
  })

  return chatCompletion.choices
}

// export interface SprintFestivalCouplets {
//   菜名: string,
//   上手难度: string
// }

export async function getCouplets(nyfsl: string,nyfcx: string,nyfjksw: string) {
  /**
   * 限制输入长度
   */
  // nyfsl = nyfsl.trim().slice(0, config.inputMaxLength)
  // nyfcx = nyfcx.trim().slice(0, config.inputMaxLength)
  // nyfjksw = nyfjksw.trim().slice(0, config.inputMaxLength)

  const tooltip = [ 
    '根据我的提示，生成一份年夜饭菜单',
    '不需要标点符号，不要使用生僻字',
    "格式类型如：菜名:,上手难度:",
    '上手难度用⭐表示',
    '最后最好写一段对这份菜的总结',
    ]

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: tooltip.join('\n'),
      //content: tooltip,
    },
  ]

  if (true)
    messages.push(
      { role: 'user', content: `我的提示是：列出${nyfsl}道${nyfcx}菜，忌口是${nyfjksw}` })

  const chatCompletion = await openai.chat.completions.create({
    ...baseChatCompletionCreateParams,
    messages,
    model: baseModel,
    // stream: true
  })
consola.log("==========chatCompletion.choices[0].message==========="+chatCompletion.choices[0].message.content)
  return chatCompletion.choices[0].message
}
