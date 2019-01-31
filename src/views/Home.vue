<template>
  <div class="home">
    <!-- <textarea /> -->
    <v-textarea
      label="Source"
      @input="$store.commit('updateMarkdown',$event)"
      hint="Mark it down here"
    />
    <v-spacer />
    <div
      class="preview"
      v-html="$store.state.preview"
    />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    //HelloWorld
  }
};
</script>

<style lang="scss" scoped>
.preview {
  min-height: 100vh;
  min-width: 50vw;
  outline: 1px solid red;
}
</style>
