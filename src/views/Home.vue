<template>
  <v-container
    fluid
    grid-list-md
    fill-height
  >

    <v-layout
      row
      fill-height
      justify-space-between
    >

      <v-flex
        md6
        fill-height
      >
        <v-container>
          <v-layout
            column
            fill-height
            style="outline:1px solid blue"
          >
            <h2>Source</h2>
            <v-textarea
              solo
              autofocus
              no-resize
              height="20vh"
              class="textarea"
              @input="$store.commit('updateMarkdown',$event)"
            />
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex
        md6
        fill-height
      >
        <v-container>
          <v-layout
            column
            fill-height
            style="outline:1px solid blue"
          >
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
.textarea {
  /* height: 20vh !important;
  min-height: 20vh !important;
  max-height: 20vh !important;
  outline: 1px solid red !important; */
}
.preview {
  min-height: 20vh;
  background: white;
  margin-bottom: 8px;
  border-radius: 2px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  /* min-height: 100vh;
  min-width: 50vw;
  outline: 1px solid red; */
}
</style>
