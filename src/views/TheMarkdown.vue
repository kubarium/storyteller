<script setup lang="ts">
onMounted(() => {
  console.log('Markdown mounted');
})
</script>
<template>
  <div class="flex flex-col flex-grow">
    <Menubar>
      <template #start>
        <span class="text-yellow-950 text-lg font-bold">Markdown</span>
      </template>
    </Menubar>
    <ScrollPanel class="flex-grow h-12">
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo mi, posuere eget magna nec,
        consequat
        placerat nunc. Curabitur et enim vel nulla pharetra tincidunt id non diam. Pellentesque vel nisl placerat odio
        imperdiet scelerisque vel non felis. Nullam dictum imperdiet felis, vel varius mauris sodales id. Vestibulum
        consequat fermentum orci et ultricies. Nullam aliquam erat non felis faucibus, et pharetra leo placerat. Duis
        auctor augue eget varius vehicula. Fusce vulputate tincidunt porta. Duis vitae accumsan ipsum. Integer ornare
        porta laoreet. Nullam mattis vehicula odio. Sed ante sapien, iaculis eget sollicitudin ac, feugiat et orci.
        Integer a sapien laoreet, feugiat est in, placerat libero. Mauris id nibh quis lorem feugiat sagittis.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo mi, posuere eget magna nec,
        consequat
        placerat nunc. Curabitur et enim vel nulla pharetra tincidunt id non diam. Pellentesque vel nisl placerat odio
        imperdiet scelerisque vel non felis. Nullam dictum imperdiet felis, vel varius mauris sodales id. Vestibulum
        consequat fermentum orci et ultricies. Nullam aliquam erat non felis faucibus, et pharetra leo placerat. Duis
        auctor augue eget varius vehicula. Fusce vulputate tincidunt porta. Duis vitae accumsan ipsum. Integer ornare
        porta laoreet. Nullam mattis vehicula odio. Sed ante sapien, iaculis eget sollicitudin ac, feugiat et orci.
        Integer a sapien laoreet, feugiat est in, placerat libero. Mauris id nibh quis lorem feugiat sagittis.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo mi, posuere eget magna nec,
        consequat
        placerat nunc. Curabitur et enim vel nulla pharetra tincidunt id non diam. Pellentesque vel nisl placerat odio
        imperdiet scelerisque vel non felis. Nullam dictum imperdiet felis, vel varius mauris sodales id. Vestibulum
        consequat fermentum orci et ultricies. Nullam aliquam erat non felis faucibus, et pharetra leo placerat. Duis
        auctor augue eget varius vehicula. Fusce vulputate tincidunt porta. Duis vitae accumsan ipsum. Integer ornare
        porta laoreet. Nullam mattis vehicula odio. Sed ante sapien, iaculis eget sollicitudin ac, feugiat et orci.
        Integer a sapien laoreet, feugiat est in, placerat libero. Mauris id nibh quis lorem feugiat sagittis.</p>
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo mi, posuere eget magna nec,
        consequat
        placerat nunc. Curabitur et enim vel nulla pharetra tincidunt id non diam. Pellentesque vel nisl placerat odio
        imperdiet scelerisque vel non felis. Nullam dictum imperdiet felis, vel varius mauris sodales id. Vestibulum
        consequat fermentum orci et ultricies. Nullam aliquam erat non felis faucibus, et pharetra leo placerat. Duis
        auctor augue eget varius vehicula. Fusce vulputate tincidunt porta. Duis vitae accumsan ipsum. Integer ornare
        porta laoreet. Nullam mattis vehicula odio. Sed ante sapien, iaculis eget sollicitudin ac, feugiat et orci.
        Integer a sapien laoreet, feugiat est in, placerat libero. Mauris id nibh quis lorem feugiat sagittis.</p>
    </ScrollPanel>
  </div>
</template>
