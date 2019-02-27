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
      Layout
    </v-btn>

    <v-list dense>
      <v-list-tile @click="$store.dispatch('pageBreak')">
        <v-list-tile-title>Page Break</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('columnBreak')">
        <v-list-tile-title>Column Break</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('wideContent')">
        <v-list-tile-title>Wide Content</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Vertical Space</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('coverPage')">
        <v-list-tile-title>Cover Page</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "layout-operations"
};
</script>

<style>
</style>
