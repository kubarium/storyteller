import { defineStore, acceptHMRUpdate } from 'pinia'
import markdownit from 'markdown-it'
import { useEditorStore } from './editor'
import CSS_THEMES from '@/data/css_themes.json'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

export const usePreviewStore = defineStore('preview', () => {
  const editor = useEditorStore()
  const theme = ref(CSS_THEMES[0])
  const theme_links = computed(() =>
    theme.value.value.map((t: string) => `<link rel="stylesheet" href="${t}" />`).join(''),
  )
  const render = computed(() => md.render(editor.code))
  // class="pages ${getters.activeSize} ${inkFriendly ? 'inkFriendly' : 'showNoMercy'}"
  const srcdoc = computed(() => {
    return `
      <html>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          ${theme_links.value}
        </head>
        <body>
          ${md.render(editor.code)}
        </body>
      </html>`
  })

  return { CSS_THEMES, theme, srcdoc, theme_links, render }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePreviewStore, import.meta.hot))
}
