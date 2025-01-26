<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <the-title title="Citas" />
      </div>

      <div class="col-12 q-pa-sm">
        <!-- <q-chip outline color="primary" text-color="white"> Todas (4)</q-chip> -->
        <q-chip outline color="orange" text-color="white"> Proxima (1)</q-chip>
        <q-chip outline color="green" text-color="white">
          Realizadas (3)</q-chip
        >
        <q-chip outline color="red" text-color="white"> Canceladas (1)</q-chip>
      </div>

      <div
        v-if="!isLoading"
        class="col-12 q-pa-sm"
        v-for="(item, index) in getItems"
        :key="index"
      >
        <history-quote-item :item="item" />
      </div>

      <!-- <div
        v-if="!isLoading"
        class="col-12 q-pa-sm"
        v-for="(item, index) in items"
        :key="index"
      >
        <history-log-item :item="item" />
      </div>
      <div v-else class="col-12 q-pa-sm" v-for="n in 5">
        <q-skeleton width="100%" height="150px" />
      </div> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useAuthStore } from "stores/auth";

import { citaControlDataServices } from "../services/CitasControl/CitaControlDataService";
import { ICitaControl } from "../services/CitasControl/CitaControl";

const store = useAuthStore();

import TheTitle from "../components/atoms/TheTitle.vue";
import HistoryQuoteItem from "src/components/History/HistoryQuoteItem.vue";

defineOptions({
  name: "HistoryQuotesPage",
});

const { getUser } = store;
const items = ref<any[]>([]);
const isLoading = ref<boolean>(false);

const getItems = computed(() => {
  return [
    {
      date: "2021-10-10",
      hour: "10:00 am",
      nutritionist: "Dr. Juan Pérez",
      clinic: "Clinica 1",
      status: "Proxima",
    },
    {
      date: "2021-09-10",
      hour: "10:00 am",
      nutritionist: "Dr. Juan Pérez",
      clinic: "Clinica 1",
      status: "Realizada",
    },
    {
      date: "2021-08-10",
      hour: "10:00 am",
      nutritionist: "Dr. Juan Pérez",
      clinic: "Clinica 1",
      status: "Realizada",
    },
    {
      date: "2021-07-10",
      hour: "10:00 am",
      nutritionist: "Dr. Juan Pérez",
      clinic: "Clinica 1",
      status: "Cancelada",
    },
    {
      date: "2021-06-10",
      hour: "10:00 am",
      nutritionist: "Dr. Juan Pérez",
      clinic: "Clinica 1",
      status: "Realizada",
    },
  ];
});
</script>
