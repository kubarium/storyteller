<template>
  <v-dialog v-model="$store.state.thesaurus.dialog" width="80%" scrollable>
    <v-card>
      <!-- <v-card-title>Thesaurus for {{$store.state.thesaurus.word}}</v-card-title> -->
      <!-- <v-divider/> -->
      <v-tabs color="cyan" dark slider-color="yellow">
        <v-tab
          v-for="(entry,index) in $store.state.thesaurus.entries"
          :key="index"
          ripple
        >{{ entry.fl }}</v-tab>
        <v-tab-item v-for="(entry,index) in $store.state.thesaurus.entries" :key="index">
          <v-container class="pa-2" v-show="entry.synonyms.length">
            <v-card>
              <v-card-title class="title">Synonyms</v-card-title>
              <v-divider/>
              <v-item-group>
                <v-item v-for="(synonym,index) in entry.synonyms" :key="`synonym-${index}`">
                  <v-chip slot-scope="{ active, toggle }" text-color="teal" @click="toggle">
                    {{synonym}}
                    <v-icon right v-if="active">radio_button_checked</v-icon>
                    <v-icon right v-else>radio_button_unchecked</v-icon>
                  </v-chip>
                </v-item>
              </v-item-group>
            </v-card>
          </v-container>
          <v-container class="pa-2" v-show="entry.antonyms.length">
            <v-card>
              <v-card-title class="title">Antonyms</v-card-title>
              <v-divider/>
              <v-item-group>
                <v-item v-for="(antonym,index) in entry.antonyms" :key="`antonym-${index}`">
                  <v-chip slot-scope="{ active, toggle }" text-color="teal" @click="toggle">
                    {{antonym}}
                    <v-icon right v-if="active">radio_button_checked</v-icon>
                    <v-icon right v-else>radio_button_unchecked</v-icon>
                  </v-chip>
                </v-item>
              </v-item-group>
            </v-card>
          </v-container>
          <v-container class="pa-2" v-show="entry.related.length">
            <v-card>
              <v-card-title class="title">Related Words</v-card-title>
              <v-divider/>
              <v-item-group>
                <v-item v-for="(related,index) in entry.related" :key="`related-${index}`">
                  <v-chip slot-scope="{ active, toggle }" text-color="teal" @click="toggle">
                    {{related}}
                    <v-icon right v-if="active">radio_button_checked</v-icon>
                    <v-icon right v-else>radio_button_unchecked</v-icon>
                  </v-chip>
                </v-item>
              </v-item-group>
            </v-card>
          </v-container>
          <!-- <v-card flat>
            <v-card-title class="blue">Related Words</v-card-title>
            <v-card-text v-for="(word,index) in entry.related" :key="`related-${index}`"></v-card-text>
            <v-card-text>qqq</v-card-text>
          </v-card>-->
        </v-tab-item>
      </v-tabs>

      <!-- <v-divider/> -->
      <!-- 
      <v-card-text style="height:300px">
        <v-list>
          <template v-for="(entry, index) in $store.state.dropbox.entries">
            <v-divider v-show="index > 0" :key="index"></v-divider>

            <v-list-tile
              :disabled="$store.state.dropbox.fetching"
              :key="entry.title"
              @click="clickEntry(entry)"
            >
              <v-list-tile-avatar>
                <v-icon v-if="entry['.tag'] === 'folder'">folder</v-icon>
                <v-icon v-else-if="entry['.tag'] === 'parent'">arrow_upward</v-icon>
                <v-icon v-else>edit</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="entry.name"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="entry['.tag'] === 'file'">
                <v-btn
                  :disabled="$store.state.dropbox.fetching"
                  icon
                  @click.stop="
                    $store.dispatch('deleteFromDropbox', entry.path_lower)
                  "
                >
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>
      -->
      <v-divider/>
      <v-card-actions>
        Thesaurus for
        {{$store.state.thesaurus.word}}
        <v-spacer/>
        <v-btn color="primary" flat @click="$store.commit('toggleThesaurus', false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "thesaurus"
};
</script>
