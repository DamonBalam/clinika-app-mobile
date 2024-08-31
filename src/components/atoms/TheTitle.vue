<template>
  <q-card bordered flat style="height: 40px" class="bg-primary text-white">
    <div
      class="text-subtitle1 text-bold row justify-start items-center q-pl-md"
      style="height: 40px"
    >
      {{ title }}
    </div>
  </q-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<style scoped></style>
