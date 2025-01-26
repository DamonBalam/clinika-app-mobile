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
            <div class="text-subtitle1 text-bold text-center">
              Tu consultorio
            </div>
            <div class="text-subtitle1 text-center">
              {{ clinic }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 q-pa-sm">
        <q-card bordered flat>
          <q-card-section>
            <div class="text-subtitle1 text-bold text-center">
              Tu nutricionista
            </div>
            <div class="text-subtitle1 text-center">
              {{ nutri }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 q-pa-sm">
        <the-title title="Información personal" />
      </div>

      <div class="col-12 q-pa-sm">
        <div class="text-start text-subtitle1">
          <span class="text-bold q-mr-sm text-gray">Última actualización:</span>
          <span class="text-gray">{{ formatDate(lastCitaDate) }}</span>
        </div>
        <div class="text-start text-subtitle2">
          <span class="text-gray">Estos son los datos de tu última cita</span>
        </div>
      </div>

      <div
        v-if="!isLoading"
        class="col-6 q-pa-sm"
        v-for="(item, index) in lastCita"
        :key="index"
      >
        <perfil-data-item :item="item" />
      </div>

      <div v-else class="col-6 q-pa-sm" v-for="n in 6">
        <q-skeleton width="180px" height="100px" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "stores/auth";
import { pacienteDataServices } from "src/services/Perfil/PacienteDataService";
import { citaControlDataServices } from "../services/CitasControl/CitaControlDataService";
import { ICitaControl } from "../services/CitasControl/CitaControl";
import TheTitle from "../components/atoms/TheTitle.vue";
import PerfilDataItem from "../components/Perfil/PerfilDataItem.vue";
const store = useAuthStore();

defineOptions({
  name: "PerfilPage",
});
const isLoading = ref<boolean>(false);
const items = ref<ICitaControl[]>([]);
const paciente = ref<any>({});
const nameProfile = computed(() => {
  return store.getFullName;
});

const lastCitaDate = computed(() => {
  const data = items.value[0] || {};

  return data.date || "";
});

const clinic = computed(() => {
  return paciente.value.consultorio?.nombre || "";
});

const nutri = computed(() => {
  return paciente.value.nutricionista?.nombre || "";
});

const lastCita = computed(() => {
  const data = items.value[0] || {};

  const peso = data.weight === undefined ? 0 : `${data.weight} kg`;
  const musculo = data.muscle === undefined ? 0 : `${data.muscle} kg`;
  const grasa = data.fat === undefined ? 0 : `${data.fat} kg`;
  const porcentaje_grasa =
    data.average_fat === undefined ? 0 : `${data.average_fat} %`;
  const cc = data.cc === undefined ? 0 : `${data.cc} `;
  const grasa_visceral = data.viseral_fat === undefined ? 0 : `${data.viseral_fat} kg`;

  return [
    {
      label: "Peso",
      value: peso,
    },
    {
      label: "Masa muscular",
      value: musculo,
    },
    {
      label: "Grasa",
      value: grasa,
    },
    {
      label: "% Grasa",
      value: porcentaje_grasa,
    },
    {
      label: "CC",
      value: cc,
    },
    {
      label: "Grasa visceral",
      value:grasa_visceral,
    },
  ];
});

const formatDate = (dateToFormate: string) => {
  if (dateToFormate === "") {
    return "No existen datos registrados";
  }

  let fecha = new Date(dateToFormate);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
  return new Date(fecha).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getItems = async () => {
  try {
    isLoading.value = true;

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
  } finally {
    isLoading.value = false;
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

<style lang="scss" scoped>
.text-gray {
  color: #525252 !important;
}
</style>
