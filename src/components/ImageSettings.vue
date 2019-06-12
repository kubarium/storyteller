<template>
  <v-dialog
    v-model="$store.state.imageSettings.dialog"
    width="600"
    scrollable
    content-class="imageSettings"
    @input="$store.dispatch('refreshImages')"
  >
    <v-card>
      <v-card-title>Image Settings </v-card-title>
      <v-divider />
      <v-card-text style="height:600px">
        <v-container grid-list-lg class="px-0 py-2">
          <v-layout>
            <v-flex xs8>
              <v-radio-group
                label="Position"
                row
                hide-details
                v-model="$store.state.imageSettings.styles.position"
              >
                <v-radio
                  v-for="position in positions"
                  :key="position"
                  :label="`${position}`"
                  :value="position"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="modes"
                hide-details
                v-model="$store.state.imageSettings.styles['mix-blend-mode']"
                label="Blend Mode"
              />
            </v-flex>
          </v-layout>
        </v-container>

        <v-container grid-list-lg class="px-0 py-2">
          <v-layout>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Width"
                    v-model="$store.getters.imageWidth"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imageWidthUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Height"
                    v-model="$store.getters.imageHeight"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imageHeightUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container grid-list-lg class="px-0 py-2">
          <v-layout>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Top"
                    v-model="$store.getters.imagePositionTop"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imagePositionTopUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Bottom"
                    v-model="$store.getters.imagePositionBottom"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imagePositionBottomUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container grid-list-lg class="px-0 py-2">
          <v-layout>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Left"
                    v-model="$store.getters.imagePositionLeft"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imagePositionLeftUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    type="number"
                    label="Right"
                    v-model="$store.getters.imagePositionRight"
                    hide-details
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    v-model="$store.getters.imagePositionRightUnit"
                  >
                    <v-radio
                      v-for="unit in units"
                      :key="unit"
                      :label="`${unit}`"
                      :value="unit"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container class="px-0 py-2">
          <v-divider />
          <v-textarea
            :value="$store.state.imageSettings.url"
            label="Image URL"
            no-resize
          />
          <v-textarea
            :value="$store.state.imageSettings.styles.other"
            label="Other Styles"
            no-resize
          />
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="$store.commit('toggleImageSettings', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "image-settings",
  data() {
    return {
      units: "%|px".split("|"),
      positions: "initial|absolute|relative".split("|"),
      modes: "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|difference|exclusion|hue|saturation|color|luminosity".split(
        "|"
      )
    };
  },
  methods: {
    clickEntry(entry) {
      console.log(entry);
      if (this.$store.getters.isParent(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isFolder(entry)) {
        return this.$store.dispatch("getEntries", entry.path_lower);
      }

      if (this.$store.getters.isImage(entry)) {
        return this.$store.dispatch("addImage", entry.path_lower);
      }
    }
  },
  mounted() {
    //this.$store.dispatch("connectDropbox").then();
    //this.$store.dispatch("getImages", "");
  }
};
</script>


<style lang="scss" >
.imageSettings {
  position: absolute;
  left: 2%;
}
</style>
