<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "stores/auth";
import { authDataServices } from "../../services/Auth/AuthDataService";
import { useQuasar } from "quasar";
const $q = useQuasar();

const store = useAuthStore();

const { login } = store;

const myForm = ref(null);

const myFormRecovery = ref(null);

const isPwd = ref(true);

const usuario = ref("");

const password = ref("");

const usuarioRecovery = ref("");

const message = ref<string>("");

const messageRecovery = ref<string>("");

const accept = ref(false);

const disabled = ref(false);

const showRecovery = ref(false);

const messageError = computed(() => {
  return message.value || null;
});

const messageRecoveryComputed = computed(() => {
  return messageRecovery.value || null;
});

async function handleSubmit() {
  disabled.value = true;
  message.value = "";
  //@ts-ignore
  myForm.value.validate().then(async (success) => {
    if (success) {
      const { code, data, msg } = await authDataServices.login(
        usuario.value,
        password.value
      );

      console.log("data", data);

      if (code === 200) {
        login(data);
      } else {
        message.value = msg || "Error al iniciar sesión";

        setTimeout(() => {
          message.value = "";
        }, 3000);
      }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  });
  disabled.value = false;
}

async function handleRecoverySubmit() {
  disabled.value = true;
  message.value = "";
  messageRecovery.value = "";
  //@ts-ignore
  myFormRecovery.value.validate().then(async (success) => {
    if (success) {
      try {
        const data = await authDataServices.recover(usuarioRecovery.value);

        if (data.data.code === 200) {
          console.log("success");

          messageRecovery.value =
            data.data.msg || "Se ha enviado un correo electrónico";
        } else {
          console.log("error");

          message.value =
            data.data.msg || "Error al validar el correo electrónico";

          setTimeout(() => {
            message.value = "";
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        // message.value = error.response.data.message
      }
    }
  });
  disabled.value = false;
}

function handleClick() {
  showRecovery.value = !showRecovery.value;
}
</script>

<template>
  <q-form
    v-if="!showRecovery"
    class="q-gutter-md"
    ref="myForm"
    @submit="handleSubmit"
  >
    <div class="q-mb-none row justify-start">
      <label for="email" class="label">Correo electrónico</label>
    </div>
    <q-input
      id="email"
      type="email"
      rounded
      dense
      outlined
      v-model="usuario"
      class="q-my-none"
      label="Ingresa tu correo electrónico"
      :rules="[
        (val) =>
          (val && val.length > 0) || 'Ingrese un correo electrónico válido',
      ]"
    >
      <template v-slot:prepend>
        <q-icon name="o_email" />
      </template>
    </q-input>

    <div class="q-mt-none row justify-start">
      <label for="password" class="label">Contraseña</label>
    </div>
    <q-input
      id="password"
      :type="isPwd ? 'password' : 'text'"
      rounded
      dense
      outlined
      v-model="password"
      label="Ingresa tu contraseña"
      class="q-mt-none"
      :rules="[
        (val) => (val && val.length > 0) || 'Ingrese una contraseña válida',
      ]"
    >
      <template v-slot:prepend>
        <q-icon name="o_lock" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div v-if="messageError">
      <q-banner inline-actions class="text-white bg-red text-bold text-center">
        {{ messageError }}
      </q-banner>
    </div>

    <div class="q-mt-none row justify-center">
      <q-btn
        label="Iniciar sesión"
        type="submit"
        color="primary"
        class="full-width text-btn"
      />
    </div>

    <div class="row justify-center">
      <q-btn flat @click.native="handleClick" class="label-secondary text-btn"
        >¿Has olvidado tu contraseña?</q-btn
      >
    </div>
  </q-form>
  <q-form
    v-if="showRecovery"
    class="q-gutter-md"
    ref="myFormRecovery"
    @submit="handleRecoverySubmit"
  >
    <div class="q-mb-none row justify-center">
      <label for="email" class="label"
        >Se enviara una nueva contraseña al correo electrónico registrado</label
      >
    </div>
    <q-input
      id="email"
      type="email"
      rounded
      dense
      outlined
      v-model="usuarioRecovery"
      label="Ingresa tu correo electrónico"
      :rules="[
        (val) =>
          (val && val.length > 0) || 'Ingrese un correo electrónico válido',
      ]"
    >
      <template v-slot:prepend>
        <q-icon name="o_email" />
      </template>
    </q-input>

    <div v-if="messageRecoveryComputed">
      <q-banner
        inline-actions
        class="text-white bg-primary text-bold text-center"
      >
        {{ messageRecoveryComputed }}
      </q-banner>
    </div>

    <div v-if="messageError">
      <q-banner inline-actions class="text-white bg-red text-bold text-center">
        {{ messageError }}
      </q-banner>
    </div>

    <div class="row justify-center">
      <q-btn
        label="Enviar"
        type="submit"
        color="primary"
        class="q-mb-md full-width text-btn"
      />
      <q-btn
        label="Regresar"
        flat
        @click="handleClick"
        class="label-secondary text-btn"
        style="width: 200px"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.label {
  font-size: 14px;
  font-weight: 500;
  color: #4d5761;
}

.label-secondary {
  font-size: 16px;
  font-weight: 400;
  color: #6c737f;
}

.text-btn {
  text-transform: inherit !important;
  font-size: 16px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
}
</style>
