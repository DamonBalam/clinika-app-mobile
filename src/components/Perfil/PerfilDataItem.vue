<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="text-h5 text-center text-weight-bold">
        {{ item.value }}
      </div>
      <q-separator inset />
      <div class="text-subtitle2 text-weight-light text-center">
        {{ item.label }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  item: {
    id?: number;
    label: string;
    value: string;
  };
}>();
</script>

<style scoped></style>
