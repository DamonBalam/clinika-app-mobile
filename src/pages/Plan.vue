<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <the-title title="Plan de Alimentación" />
      </div>

      <div class="col-12 q-pa-sm">
        <div class="text-center text-subtitle2">
          <span class="text-bold q-mr-sm">Fecha de actualización:</span>
          <span>{{ "31 de Agosto 2024" }}</span>
        </div>
      </div>

      <div
        class="col-12 q-pa-sm"
        v-for="(value, key, index) in meal_plan"
        :key="index"
      >
        <template v-if="!['id', 'date'].includes(key)">
          <plan-data-item :item="value" :title="key" />
        </template>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import TheTitle from "../components/atoms/TheTitle.vue";
import PlanDataItem from "../components/Plan/PlanDataItem.vue";

defineOptions({
  name: "PlanPage",
});

const meal_plan = reactive({
  id: 1,
  desayuno: [
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
  media_manana: [
    {
      id: 1,
      count: 1,
      type_food: "carbohidratos",
    },
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
  comida: [
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
  merienda: [
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
  cena: [
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
  merienda_noche: [
    {
      id: 1,
      count: 1,
      type_food: "Carbohidratos",
    },
    {
      id: 2,
      count: 1,
      type_food: "Frutas",
    },
    {
      id: 3,
      count: 1,
      type_food: "Proteínas",
    },
    {
      id: 4,
      count: 1,
      type_food: "Verduras",
    },
  ],
});
</script>
