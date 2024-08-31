<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="text-subtitle1 text-center text-weight-light">
        {{ item.value }}
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold text-center">
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
