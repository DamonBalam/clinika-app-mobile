<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <p class="text-h5 text-bold">
          {{ $t("Perfil.welcome") }} {{ nameProfile }}
        </p>
      </div>

      <div class="col-6 q-pa-sm">
        <q-card bordered flat>
          <q-card-section>
            <div class="text-subtitle1 text-bold text-center">CONSULTORIO</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="text-subtitle1 text-center">
              {{ "Consultorio 1" }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 q-pa-sm">
        <q-card bordered flat>
          <q-card-section>
            <div class="text-subtitle1 text-bold text-center">NUTRIOLOGO</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="text-subtitle1 text-center">
              {{ "Nutriologo 1" }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 q-pa-sm">
        <the-title title="Datos de tu ultima cita" />
      </div>

      <div class="col-12 q-pa-sm">
        <div class="text-center text-subtitle2">
          <span class="text-bold q-mr-sm">Fecha de registro:</span>
          <span>{{ lastCitaDate }}</span>
        </div>
      </div>

      <div class="col-6 q-pa-sm" v-for="(item, index) in lastCita" :key="index">
        <perfil-data-item :item="item" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "stores/auth";

import { citaControlDataServices } from "../services/CitasControl/CitaControlDataService";
import { ICitaControl } from "../services/CitasControl/CitaControl";

const store = useAuthStore();
import TheTitle from "../components/atoms/TheTitle.vue";
import PerfilDataItem from "../components/Perfil/PerfilDataItem.vue";

defineOptions({
  name: "PerfilPage",
});

const { getUser } = store;

const items = ref<ICitaControl[]>([]);
const nameProfile = computed(() => {
  return store.getFullName;
});

const lastCitaDate = computed(() => {
  const data = items.value[0] || {};

  return data.fecha;
});

const lastCita = computed(() => {
  const data = items.value[0] || {};

  return [
    {
      label: "Peso",
      value: `${data.weight} kg`,
    },
    {
      label: "Masa Muscular",
      value: `${data.muscle} kg`,
    },
    {
      label: "Grasa",
      value: `${data.fat} kg`,
    },
    {
      label: "% Grasa",
      value: `${data.average_fat} %`,
    },
    {
      label: "CC",
      value: `${data.cc}`,
    },
    {
      label: "Grasa Visceral",
      value: `${data.viseral_fat} kg`,
    },
  ];
});

const getItems = async () => {
  // loading.value = true;

  try {
    const data = await citaControlDataServices.getAll(getUser.id);

    console.log("data", data);

    if (data.code === 200) {
      items.value = data.data.sort((a: ICitaControl, b: ICitaControl) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
  } catch (error) {
    console.log(error);
  }

  // loading.value = false;
};

onMounted(() => {
  getItems();
});
</script>
