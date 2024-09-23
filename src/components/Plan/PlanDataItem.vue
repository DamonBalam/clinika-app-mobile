<template>
  <q-card bordered flat>
    <div class="row">
      <div class="col-4 bg-primary flex justify-center items-center">
        <p class="inline-block text-white text-weight-bold">
          {{ $t(`Plan.${title}`) }}
        </p>
      </div>

      <div class="col-8">
        <ul v-for="food in item">
          <li>
            {{ food.count }}
            {{ food.type_food }}
          </li>
        </ul>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  title: string;
  item: {
    id: number;
    count: number;
    type_food: string;
  }[];
}>();
</script>

<style scoped></style>
