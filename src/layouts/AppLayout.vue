<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="row justify-between bg-white text-primary">
        <div class="q-pt-md q-pl-md">
          <q-img src="../assets/img/logo.png" width="150px" fit="cover" />
        </div>

        <q-btn
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      :width="250"
      :breakpoint="700"
    >
      <q-scroll-area
        style="
          height: calc(100% - 180px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            to="/nosotros"
            :class="$q.platform.is.ios ? '' : 'q-mt-md'"
          >
            <q-item-section avatar>
              <q-icon name="o_person" />
            </q-item-section>

            <q-item-section> ¿Quiénes somos? </q-item-section>
          </q-item>
          <q-item clickable disable v-ripple to="/update-password">
            <q-item-section avatar>
              <q-icon name="o_settings" />
            </q-item-section>

            <q-item-section> Actualizar Contraseña </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="o_power_settings_new" />
            </q-item-section>

            <q-item-section> Cerrar Sesión </q-item-section>
          </q-item>

          <div class="absolute-bottom text-center" style="height: 200px">
            <q-img src="../assets/img/logo.png" style="width: 180px" />
            <div class="text-weight-bold q-mt-md">{{ ageNow }} - v0.1</div>
          </div>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top bg-primary" style="height: 160px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm q-mt-md">
            <img :src="`https://ui-avatars.com/api/?name=${avatarProfile}`" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ nameProfile }}
          </div>
          <div>{{ emailProfile }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer style="border-top: 1px solid #fefefe">
      <q-tabs v-model="tab" :mobile-arrows="true" class="bg-white text-primary">
        <q-route-tab
          to="/perfil"
          exact
          name="perfil"
          icon="o_person"
          label="Perfil"
        />

        <q-route-tab
          to="/history"
          exact
          name="history"
          icon="o_receipt_long"
          label="Histórico"
        />

        <q-route-tab
          to="/plan"
          exact
          name="plan"
          icon="o_format_list_bulleted"
          label="Plan"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useAuthStore } from "stores/auth";

const store = useAuthStore();
const { logout, getUser } = store;

const handleLogout = () => {
  logout();
};

const nameProfile = computed(() => {
  return store.getFullName;
});

const avatarProfile = computed(() => {
  return store.getAvatarWithInitials;
});

const emailProfile = computed(() => {
  return store.getEmail;
});

const leftDrawerOpen = ref(false);
const tab = ref("perfil");

const ageNow = computed(() => {
  return new Date().getFullYear();
});
</script>

<style lang="scss" scope>
.recordatorio {
  position: absolute;
  bottom: 22vh;
}
</style>
