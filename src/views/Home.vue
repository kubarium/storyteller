<template>
  <v-container
    fluid
    grid-list-md
  >

    <v-layout
      row
      fill-height
      justify-space-between
    >

      <v-flex md6>
        <v-container>
          <v-layout column>
            <h2>Source</h2>
            <v-textarea
              solo
              @input="$store.commit('updateMarkdown',$event)"
              hint="Mark it down here"
            />
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex md6>
        <v-container>
          <v-layout column>
            <h2>Preview</h2>
            <div
              class="preview"
              v-html="$store.state.preview"
            />
          </v-layout>
        </v-container>
      </v-flex>

    </v-layout>

  </v-container>
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
.preview1 {
  min-height: 100vh;
  min-width: 50vw;
  outline: 1px solid red;
}
</style>
