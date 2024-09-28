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
              {{ clinic }}
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
              {{ nutri }}
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
import { pacienteDataServices } from "src/services/Perfil/PacienteDataService";
import { citaControlDataServices } from "../services/CitasControl/CitaControlDataService";
import { ICitaControl } from "../services/CitasControl/CitaControl";

const store = useAuthStore();
import TheTitle from "../components/atoms/TheTitle.vue";
import PerfilDataItem from "../components/Perfil/PerfilDataItem.vue";

defineOptions({
  name: "PerfilPage",
});

const items = ref<ICitaControl[]>([]);
const paciente = ref<any>({});
const nameProfile = computed(() => {
  return store.getFullName;
});

const lastCitaDate = computed(() => {
  const data = items.value[0] || {};

  return data.date;
});

const clinic = computed(() => {
  return paciente.value.consultorio?.nombre || "";
});

const nutri = computed(() => {
  return paciente.value.nutricionista?.nombre || "";
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
  try {
    const data = await citaControlDataServices.getAll(store.getUser.id);

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

async function getPaciente() {
  if (!store.getUser.id) {
    return;
  }

  const res = await pacienteDataServices.getById(store.getUser.id);

  console.log("res", res.data);

  if (res.code == 200) {
    paciente.value = res.data.user;
  }
}

onMounted(() => {
  getItems();
  getPaciente();
});
</script>
