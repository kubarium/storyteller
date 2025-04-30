<script setup lang="ts">
import { useEditorStore } from '@/stores/editor';
import { markdown } from '@codemirror/lang-markdown';
import { Codemirror } from 'vue-codemirror';
import { EditorView } from '@codemirror/view';

const editorStore = useEditorStore()

const extensions = [markdown(), EditorView.lineWrapping]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: object) => {
  view.value = payload.view
  console.log(view.value);
}

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}
//@change="console.log('change', $event)" @focus="console.log('focus', $event)" @blur="console.log('blur', $event)"
onMounted(() => {
  // console.log(EditorView);

})
</script>
<template>
  <ScrollPanel class="h-full w-full p-0 overflow-auto">
    <Codemirror v-model="editorStore.code" placeholder="Code goes here..." :extensions="extensions" :autofocus="true"
      :indent-with-tab="true" :tab-size="2" @ready="handleReady" style="height: 100%;" />
  </ScrollPanel>
</template>

<style>
.p-scrollpanel {
  border-radius: 6px;
  border-width: 1px;
  border-color: #e2e8f0;
}
</style>
