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
          <span>{{ "06 de Octubre 2024" }}</span>
        </div>
      </div>

      <div class="col-6 q-pa-sm" v-for="(item, index) in data" :key="index">
        <perfil-data-item :item="item" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useAuthStore } from "stores/auth";

const store = useAuthStore();
import TheTitle from "../components/atoms/TheTitle.vue";
import PerfilDataItem from "../components/Perfil/PerfilDataItem.vue";

defineOptions({
  name: "PerfilPage",
});

const nameProfile = computed(() => {
  return store.getFullName;
});

const data = reactive([
  {
    label: "Peso",
    value: "80 kg",
  },
  {
    label: "Masa Muscular",
    value: "80 kg",
  },
  {
    label: "Grasa",
    value: "80 kg",
  },
  {
    label: "% Grasa",
    value: "80 kg",
  },
  {
    label: "CC",
    value: "80 kg",
  },
  {
    label: "Grasa Visceral",
    value: "80 kg",
  },
]);
</script>
