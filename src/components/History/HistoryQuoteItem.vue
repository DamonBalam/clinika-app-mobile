<template>
  <q-card bordered flat outline >
    <q-card-section>
      <div
        class="text-subtitle1 text-white q-pa-sm q-mb-sm"
        :class="bgColorByStatus(item.status)"
        style="border-radius: 5px"
      >
        <label class="q-mr-sm">Fecha:</label>
        <p class="inline-block text-bold q-mb-none">
          {{ formatDate(item.date) }}
        </p>
      </div>
      <div class="q-mx-sm">
        <div>
          <label class="q-mr-sm text-weight-light" for="weight">
            {{ "Nutricionista" }}:
          </label>
          <span class="inline-block q-mb-none text-weight-bold">{{
            item.nutritionist
          }}</span>
        </div>
        <div>
          <label class="q-mr-sm text-weight-light" for="weight">
            {{ "Clinica" }}:
          </label>
          <span class="inline-block q-mb-none text-weight-bold">{{
            item.clinic
          }}</span>
        </div>
        <div>
          <label class="q-mr-sm text-weight-light" for="weight">
            {{ "Hora" }}:
          </label>
          <span class="inline-block q-mb-none text-weight-bold">{{
            item.hour
          }}</span>
        </div>
        <div>
          <label class="q-mr-sm text-weight-light" for="weight">
            {{ "Estado" }}:
          </label>
          <span class="inline-block q-mb-none text-weight-bold">{{
            item.status
          }}</span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">

defineProps<{
  item: {
    id: number;
    date: string;
    hour: string;
    nutritionist: string;
    status: string;
    clinic: string;
  };
}>();

const formatDate = (dateToFormate: string) => {
  let fecha = new Date(dateToFormate);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
  return new Date(fecha).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const borderColorByStatus = (status: string) => {
  switch (status) {
    case "Proxima":
      return "border: 2px solid #FFC107";
    case "Realizada":
      return "border: 2px solid #28A745";
    case "Cancelada":
      return "border: 2px solid #DC3545";
    default:
      return "bg-primary";
  }
};

const bgColorByStatus = (status: string) => {
  switch (status) {
    case "Proxima":
      return "bg-warning";
    case "Realizada":
      return "bg-green";
    case "Cancelada":
      return "bg-red";
    default:
      return "bg-primary";
  }
};
</script>

<style scoped></style>
