<template>
  <div class="form-container sign-in-container mt-12">
    <v-form @submit.prevent="logIn()">
      <h1 class="pb-8 font-weight-bold">Login</h1>
      <v-text-field
        prepend-inner-icon="mdi-account"
        placeholder="Username"
        v-model.trim="username"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="mdi-lock"
        placeholder="Password"
        type="password"
        v-model.trim="password"
      ></v-text-field>
      <v-btn
        color="info"
        block
        dark
        tile
        class="pa-6 font-weight-bold"
        elevation="0"
        type="submit"
        >Log In</v-btn
      >
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
const store = userCheckStore()

const username = ref(null)
const password = ref(null)


const logIn = function () {
  const payload = {
    username: username.value,
    password: password.value,
  }
  store.logIn(payload)
}

</script>

<style scoped>
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.team-img {
  width: 50%;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.forgot-password-sm {
  font-size: 12px;
}
.forgot-password-md {
  font-size: 15px;
}
</style>