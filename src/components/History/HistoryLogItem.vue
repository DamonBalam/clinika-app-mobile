<template>
  <q-card bordered flat>
    <q-card-section>
      <div
        class="text-subtitle1 bg-primary text-white q-pa-sm q-mb-sm"
        style="border-radius: 5px"
      >
        <label class="q-mr-sm">Fecha:</label>
        <p class="inline-block text-bold q-mb-none">{{ item.date }}</p>
      </div>
      <div class="q-mx-sm" v-for="(value, key) in item">
        <template v-if="!['id', 'date'].includes(key)">
          <label class="q-mr-sm text-weight-bold" for="weight">
            {{ $t(`History.${key}`) }}:
          </label>
          <span class="inline-block q-mb-none text-weight-light">{{ value }}</span>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  item: {
    id: number;
    date: string;
    weight: string;
    muscle_mass: string;
    fat: string;
    fat_percentage: string;
    cc: string;
    visceral_fat: string;
  };
}>();
</script>

<style scoped></style>
