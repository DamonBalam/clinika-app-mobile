<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <the-title title="Tu Historial" />
      </div>

      <div
        class="col-12 q-pa-sm"
        v-for="(item, index) in itemsFormatted"
        :key="index"
      >
        <history-log-item :item="item" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useAuthStore } from "stores/auth";

import { citaControlDataServices } from "../services/CitasControl/CitaControlDataService.ts";
import { ICitaControl } from "../services/CitasControl/CitaControl";

const store = useAuthStore();

import TheTitle from "../components/atoms/TheTitle.vue";
import HistoryLogItem from "../components/History/HistoryLogItem.vue";

defineOptions({
  name: "HistoryPage",
});

const { getUser } = store;
const items = ref<ICitaControl[]>([]);

const itemsFormatted = computed(() => {
  return items.value.map((item) => {
    return {
      id: item.id,
      date: item.date,
      weight: `${item.weight} kg`,
      muscle_mass: `${item.muscle} kg`,
      fat: `${item.fat} kg`,
      fat_percentage: `${item.average_fat} %`,
      cc: item.cc,
      visceral_fat: `${item.viseral_fat} kg`,
    };
  });
});

const getItems = async () => {
  try {
    const data = await citaControlDataServices.getAll(getUser.id);

    if (data.code === 200) {
      items.value = data.data.sort((a: ICitaControl, b: ICitaControl) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      store.setLastIDCita(items.value[0]?.id);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getItems();
});
</script>
