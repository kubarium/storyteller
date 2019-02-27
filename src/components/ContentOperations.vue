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
      Content
    </v-btn>

    <v-list dense>
      <v-list-tile @click="$store.dispatch('pageBreak')">
        <v-list-tile-title>Spell</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('columnBreak')">
        <v-list-tile-title>Spell List</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('wideContent')">
        <v-list-tile-title>Class Features</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Note</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Description</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Monster Stats</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Image</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Wide Class Table</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Class Table</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Table</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Wide Table</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="$store.dispatch('verticalSpace')">
        <v-list-tile-title>Compact Tables</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "content-operations"
};
</script>

<style>
</style>
