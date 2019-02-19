<template>
  <v-container
    fluid
    fill-height
  >

    <v-layout column>
      <v-layout
        row
        wrap
      >

        <v-flex md12>
          <file-operations />
        </v-flex>
        <v-container
          fill-height
          fluid
        >

          <v-layout class="red">

            <v-flex
              md4
              class="yellow"
            >
              <!--               <v-container fill-height>
                <v-layout>
 -->
              <h2>Source</h2>
              <textarea
                autofocus
                class="textarea"
                :disabled="$store.state.markdown.saving"
                :value="$store.state.markdown.content"
                @input="$store.commit('updateMarkdown',$event.target.value)"
              />
              <!--  </v-layout>
      </v-container> -->
                  </v-flex>

      <v-flex md8>
        <v-container fill-height>
          <v-layout>
            <v-flex>

            <h2>Preview</h2>

            <preview :css="$store.state.style"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      </v-layout>

      </v-container>

    </v-layout>
      </v-layout>
</v-container>
</template>

<script>
// @ is an alias to /src
import FileOperations from "@/components/FileOperations.vue";
import Preview from "@/components/Preview.vue";

export default {
  name: "home",
  components: {
    FileOperations,
    Preview
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin box-shadow() {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.textarea {
  height: 100ch;
  resize: none;
  background: white;
  @include box-shadow();
}
</style>
