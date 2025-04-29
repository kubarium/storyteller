import { defineStore, acceptHMRUpdate } from 'pinia'
import content from '@/data/default.txt'

export const useEditorStore = defineStore('editor', () => {
  const code = ref('')

  fetch(content)
    .then((response) => response.text())
    .then((text) => (code.value = text))

  console.log(code.value)

  return { code }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
}
