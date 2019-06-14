<template>
  <v-dialog
    v-model="$store.state.imageSettings.dialog"
    width="600"
    scrollable
    content-class="imageSettings"
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
                :value="$store.state.imageSettings.styles.position"
                @change="updateStyles('position', $event)"
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
                :value="$store.state.imageSettings.styles['mix-blend-mode']"
                label="Blend Mode"
                @change="updateStyles('mix-blend-mode', $event)"
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
                    :min="0"
                    :value="$store.getters.imageWidth"
                    hide-details
                    @input="
                      updateStyles(
                        'width',
                        `${$event}${$store.getters.imageWidthUnit}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imageWidthUnit"
                    @change="
                      updateStyles(
                        'width',
                        `${$store.getters.imageWidth}${$event}`
                      )
                    "
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
                    :min="0"
                    :value="$store.getters.imageHeight"
                    hide-details
                    @input="
                      updateStyles(
                        'height',
                        `${$event}${$store.getters.imageHeightUnit}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imageHeightUnit"
                    @change="
                      updateStyles(
                        'height',
                        `${$store.getters.imageHeight}${$event}`
                      )
                    "
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
                    :value="$store.getters.imagePositionTop"
                    hide-details
                    @input="
                      updateStyles(
                        'top',
                        `${$event}${$store.getters.imagePositionTopUnit}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imagePositionTopUnit"
                    @change="
                      updateStyles(
                        'top',
                        `${$store.getters.imagePositionTop}${$event}`
                      )
                    "
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
                    :value="$store.getters.imagePositionBottom"
                    hide-details
                    @input="
                      updateStyles(
                        'bottom',
                        `${$event}${$store.getters.imagePositionBottomUnit}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imagePositionBottomUnit"
                    @change="
                      updateStyles(
                        'bottom',
                        `${$store.getters.imagePositionBottom}${$event}`
                      )
                    "
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
                    :value="$store.getters.imagePositionLeft"
                    hide-details
                    @input="
                      updateStyles(
                        'left',
                        `${$event}${$store.getters.imagePositionLeftUnit}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imagePositionLeftUnit"
                    @change="
                      updateStyles(
                        'left',
                        `${$store.getters.imagePositionLeft}${$event}`
                      )
                    "
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
                    :value="$store.getters.imagePositionRight"
                    hide-details
                    @input="
                      updateStyles(
                        'right',
                        `${$event}${$store.getters.imagePositionRight}`
                      )
                    "
                  />
                </v-flex>
                <v-flex xs6>
                  <v-radio-group
                    row
                    mandatory
                    hide-details
                    :value="$store.getters.imagePositionRightUnit"
                    @change="
                      updateStyles(
                        'right',
                        `${$store.getters.imagePositionRight}${$event}`
                      )
                    "
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
            @input="updateURL"
          />
          <!-- <v-textarea
            :value="$store.state.imageSettings.styles.other"
            label="Other Styles"
            no-resize
          /> -->
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
    updateURL(value) {
      this.$store.dispatch("updateURL", value).then(this.updateImage);
    },
    updateStyles(key, value) {
      //console.log(RegExp(/\d+/, "g").test(value));
      if (key !== "position" && key !== "mix-blend-mode") {
        value = RegExp(/\d+/, "g").test(value) ? value : "";
      }

      this.$store
        .dispatch("updateStyles", { key, value })
        .then(this.updateImage);
    },
    updateImage() {
      window.codemirror.getDoc().replaceRange(
        this.$store.getters.image,
        {
          line: window.codemirror.getCursor().line,
          ch: 0
        },
        {
          line: window.codemirror.getCursor().line,
          ch: window.codemirror.getCursor().ch
        }
      );
    }
  }
};
</script>


<style lang="scss" >
.imageSettings {
  position: absolute;
  left: 2%;
}
</style>
