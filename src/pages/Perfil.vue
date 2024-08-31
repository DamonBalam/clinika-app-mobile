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
        <q-card
          bordered
          flat
          style="height: 40px"
          class="bg-primary text-white"
        >
          <div
            class="text-subtitle1 text-bold row justify-start items-center q-pl-md"
            style="height: 40px"
          >
            Datos de tu ultima cita
          </div>
        </q-card>
      </div>

      <div class="col-12 q-pa-sm">
        <div class="text-center text-subtitle2">
          <span class="text-bold q-mr-sm">Fecha de registro:</span>
          <span>{{ "06 de Octubre 2024" }}</span>
        </div>
      </div>

      <div class="col-6 q-pa-sm" v-for="(item, index) in data" :key="index">
        <q-card bordered flat>
          <q-card-section>
            <div class="text-subtitle1 text-center">
              {{ item.value }}
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="text-subtitle2 text-bold text-center">
              {{ item.label }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

defineOptions({
  name: "PerfilPage",
});

const nameProfile = ref("Arturo Balam");

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
