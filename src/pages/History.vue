<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <the-title title="Tu Historial" />
      </div>

      <div
        class="col-12 q-pa-sm"
        v-for="(item, index) in log_records_reverse"
        :key="index"
      >
        <history-log-item :item="item" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import TheTitle from "../components/atoms/TheTitle.vue";
import HistoryLogItem from "../components/History/HistoryLogItem.vue";

defineOptions({
  name: "HistoryPage",
});

const log_records = reactive([
  {
    id: 1,
    date: "2024-10-06",
    weight: "80 kg",
    muscle_mass: "80 kg",
    fat: "80 kg",
    fat_percentage: "80 %",
    cc: "80 ",
    visceral_fat: "80 ",
  },
  {
    id: 2,
    date: "2024-11-06",
    weight: "78 kg",
    muscle_mass: "78 kg",
    fat: "78 kg",
    fat_percentage: "78 %",
    cc: "78 ",
    visceral_fat: "78 ",
  },
  {
    id: 3,
    date: "2024-12-06",
    weight: "75 kg",
    muscle_mass: "75 kg",
    fat: "75 kg",
    fat_percentage: "75 %",
    cc: "75 ",
    visceral_fat: "75 ",
  },
  {
    id: 4,
    date: "2025-01-06",
    weight: "71 kg",
    muscle_mass: "71 kg",
    fat: "71 kg",
    fat_percentage: "71 %",
    cc: "71 ",
    visceral_fat: "71 ",
  },
  {
    id: 5,
    date: "2025-02-06",
    weight: "69 kg",
    muscle_mass: "69 kg",
    fat: "69 kg",
    fat_percentage: "69 %",
    cc: "69",
    visceral_fat: "69",
  },
]);

const log_records_reverse = log_records.reverse();
</script>
