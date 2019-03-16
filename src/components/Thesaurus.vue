<template>
  <v-dialog
    v-model="$store.state.thesaurus.dialog"
    class="thesaurus"
    scrollable
    :max-width="width"
    @input="reset"
  >
    <v-card v-if="$store.state.thesaurus.entries.length">
      <v-card-text class="pa-0" style="height:500px">
        <v-tabs color="cyan" dark slider-color="primary darken-2">
          <v-tab
            v-for="(entry, index) in $store.state.thesaurus.entries"
            :key="index"
            ripple
            >{{ entry.fl }}</v-tab
          >

          <v-tab-item
            class="pa-2"
            v-for="(entry, index) in $store.state.thesaurus.entries"
            :key="index"
          >
            <v-expansion-panel>
              <v-expansion-panel-content v-if="entry.synonyms.length">
                <template slot="header">
                  <div>
                    Synonyms of
                    <strong>{{ $store.state.thesaurus.word }}</strong>
                  </div>
                </template>
                <v-card>
                  <v-divider />
                  <v-item-group
                    v-for="(synonym, index) in entry.synonyms"
                    :key="`synonym-${index}`"
                  >
                    <v-divider v-show="index !== 0" />
                    <v-chip
                      disabled
                      color="light-green darken-2"
                      text-color="white"
                      label
                      >#{{ index }}</v-chip
                    >
                    <v-chip
                      label
                      v-for="(word, index) in synonym"
                      :key="`synonym-word-${index}`"
                      color="light-green lighten-1"
                      @click="selectThesaurus(word)"
                      >{{ word }}</v-chip
                    >
                  </v-item-group>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content v-if="entry.related.length">
                <template slot="header">
                  <div>
                    Words Related to
                    <strong>{{ $store.state.thesaurus.word }}</strong>
                  </div>
                </template>
                <v-card>
                  <v-divider />
                  <v-item-group
                    v-for="(related, index) in entry.related"
                    :key="`related-${index}`"
                  >
                    <v-divider v-show="index !== 0" />
                    <v-chip
                      disabled
                      color="light-green darken-2"
                      text-color="white"
                      label
                      >#{{ index }}</v-chip
                    >
                    <div
                      v-for="(group, index) in related"
                      :key="`related-group-${index}`"
                      class="ma-1 pl-1 pr-1 chip-group light-green"
                    >
                      <v-chip
                        label
                        v-for="(item, index) in group"
                        :key="`related-group-item-${index}`"
                        color="light-green lighten-1"
                        @click="selectThesaurus(item)"
                        >{{ item }}</v-chip
                      >
                    </div>
                  </v-item-group>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content v-if="entry.antonyms.length">
                <template slot="header">
                  <div>
                    Antonyms of
                    <strong>{{ $store.state.thesaurus.word }}</strong>
                  </div>
                </template>
                <v-card>
                  <v-divider />
                  <v-item-group
                    v-for="(antonym, index) in entry.antonyms"
                    :key="`antonym-${index}`"
                  >
                    <v-divider v-show="index !== 0" />
                    <v-chip
                      disabled
                      color="red darken-2"
                      text-color="white"
                      label
                      >#{{ index }}</v-chip
                    >
                    <v-chip
                      label
                      v-for="(word, index) in antonym"
                      :key="`antonym-word-${index}`"
                      color="red lighten-1"
                      text-color="white"
                      @click="selectThesaurus(word)"
                      >{{ word }}</v-chip
                    >
                  </v-item-group>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content v-if="entry.near.length">
                <template slot="header">
                  <div>
                    Near Antonyms of
                    <strong>{{ $store.state.thesaurus.word }}</strong>
                  </div>
                </template>
                <v-card>
                  <v-divider />
                  <v-item-group
                    v-for="(near, index) in entry.near"
                    :key="`near-${index}`"
                  >
                    <v-divider v-show="index !== 0" />
                    <v-chip
                      disabled
                      color="red darken-2"
                      text-color="white"
                      label
                      >#{{ index }}</v-chip
                    >
                    <div
                      v-for="(group, index) in near"
                      :key="`near-word-${index}`"
                      class="ma-1 pl-1 pr-1 chip-group red darken-1"
                    >
                      <v-chip
                        label
                        v-for="(item, index) in group"
                        :key="`near-group-item-${index}`"
                        color="red lighten-1"
                        text-color="white"
                        @click="selectThesaurus(item)"
                        >{{ item }}</v-chip
                      >
                    </div>
                  </v-item-group>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>
        </v-tabs>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn
          v-show="selectedThesaurus"
          color="primary"
          @click="useThesaurus(selectedThesaurus)"
          >Replace {{ $store.state.thesaurus.word }} With
          {{ selectedThesaurus }}</v-btn
        >
        <v-spacer />
        <v-btn
          color="primary"
          flat
          @click="$store.commit('toggleThesaurus', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title
        >No meaningful result for
        {{ $store.state.thesaurus.word }}</v-card-title
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "thesaurus",
  data() {
    return {
      selectedThesaurus: "",
      width:
        document.body.offsetWidth < 1600
          ? "80vw"
          : document.body.offsetWidth < 2000
          ? "60vw"
          : "40vw"
    };
  },
  methods: {
    selectThesaurus(thesaurus) {
      this.selectedThesaurus = thesaurus;
    },
    reset() {
      this.selectedThesaurus = "";
    },
    useThesaurus(word) {
      window.codemirror.replaceSelection(word);
      this.$store.commit("toggleThesaurus", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.chip-group {
  display: inline-block;
}
</style>
