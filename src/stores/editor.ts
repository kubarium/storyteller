import { defineStore } from 'pinia'
import content from './default.txt'
import markdownit from 'markdown-it'

const md = markdownit()
export const useEditorStore = defineStore('editor', () => {
  const code = ref('')
  const render = computed(() => {
    // renderMarkdown(code.value)
    return md.render(code.value)
  })

  fetch(content)
    .then((response) => response.text())
    .then((text) => (code.value = text))

  console.log(code.value)

  return { code, render }
})
