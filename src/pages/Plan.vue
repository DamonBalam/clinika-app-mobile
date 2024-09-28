<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <the-title title="Plan de alimentación" />
      </div>

      <div class="col-12 q-pa-sm">
        <div class="text-center text-subtitle2">
          <span class="text-bold q-mr-sm">Fecha de actualización:</span>
          <span>{{ fecha }}</span>
        </div>
      </div>

      <div
        v-if="!isLoading"
        class="col-12 q-pa-sm"
        v-for="(value, key, index) in mealPlan"
        :key="index"
      >
        <template v-if="!['id', 'date'].includes(key)">
          <plan-data-item :item="value" :title="key" />
        </template>
      </div>

      <div v-else class="col-12 q-pa-sm" v-for="n in 5">
        <q-skeleton width="100%" height="150px" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useAuthStore } from "stores/auth";
const store = useAuthStore();
import TheTitle from "../components/atoms/TheTitle.vue";
import PlanDataItem from "../components/Plan/PlanDataItem.vue";
import { eqNuDataService } from "src/services/EqNu/EqNuDataService";

defineOptions({
  name: "PlanPage",
});

const fecha = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const idCita = computed(() => {
  return store.getLastIdCita;
});

const plan = ref<any[]>([]);

const mealPlan = computed(() => {
  const comidas = [
    "breakfast",
    "mid_lunch",
    "lunch",
    "mid_dinner",
    "dinner",
    "snack",
  ];

  const [breakfast, mid_lunch, lunch, mid_dinner, dinner, snack] = comidas?.map(
    (comida) => JSON.parse(plan?.value[comida] || "{}")
  );

  const desayuno = mapperData(breakfast);
  const media_mañana = mapperData(mid_lunch);
  const almuerzo = mapperData(lunch);
  const media_tarde = mapperData(mid_dinner);
  const cena = mapperData(dinner);
  const merienda_noche = mapperData(snack);

  const data = {
    id: plan.value.id,
    desayuno,
    media_manana: media_mañana,
    comida: almuerzo,
    merienda: media_tarde,
    cena,
    merienda_noche,
  };
  return data || {};
});

const mapperData = (data: any) => {
  const arrayLocal = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value !== 0) {
      arrayLocal.push({
        id: `${key}-${value}`,
        count: value,
        type_food: key,
      });
    }
  });

  return arrayLocal || [];
};

const getItems = async () => {
  if (idCita.value !== null)
    try {
      isLoading.value = true;
      const data = await eqNuDataService.getByCita(
        idCita.value as unknown as number
      );

      if (data.code === 200) {
        const equivalencias = data.data.equivalencias_nutricionales[0];

        fecha.value = data.data.cita_control.date;
        plan.value = equivalencias;
      } else {
        fecha.value = null;

        plan.value = [];
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
};

onMounted(async () => {
  await getItems();
});
</script>
