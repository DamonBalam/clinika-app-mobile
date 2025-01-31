<template>
  <q-layout view="lHh Lpr lFf">
    <q-img
      src="../assets/img/fondo.jpeg"
      style="max-width: 100vw; height: 35vh; z-index: -1"
      fit="fill"
    />

    <q-page-container class="q-pa-md bordered">
      <div>
        <span class="titule-welcome">Bienvenido a</span>
        <div class="row justify-start q-my-sm">
          <q-img src="../assets/img/logo.png" width="240px" fit="cover" />
        </div>
      </div>

      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import { useQuasar } from "quasar";

const $q = useQuasar();
</script>
<style scoped lang="scss">
.bordered {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: white;
  height: 60vh;
  margin-top: -15px;
  z-index: 1;
}
.titule-welcome {
  font-size: 40px;
  font-weight: 700;
  color: #384250;
  display: inline-block;
}
</style>
