<template>
  <v-menu
    open-on-hover
    offset-y
  >
    <v-btn
      slot="activator"
      color="primary"
      dark
    >
      {{type}}
    </v-btn>

    <v-list dense>
      <v-list dense>
        <v-list-tile
          v-for="item in $store.state.contentOperations[type]"
          :key="item.title"
          @click="$store.dispatch(actionCondenser(item.title))"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-list>
  </v-menu>
</template>

<script>
//
export default {
  name: "content-operations",
  props: ["type"],
  methods: {
    actionCondenser(title) {
      return `add${title.split(" ").join("")}`;
    }
  }
};
</script>

<style>
</style>
