<script setup>
import { ref } from 'vue';

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  }
])
</script>
<template>
  <Toolbar class="m-2">
    <template #start>
      <h1 class="uppercase text-xl font-bold">
        Storyteller
      </h1>
    </template>

    <template #center>
      <!-- <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" />
        </IconField> -->
    </template>

    <template #end>
      <!-- <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-upload" severity="secondary" text />
        <SplitButton label="Save" :model="items"></SplitButton> -->
    </template>
  </Toolbar>
</template>
