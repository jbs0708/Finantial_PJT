<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1 class="mb-4">Login</h1>
        <form @submit.prevent="logIn">
          <div class="mb-3">
            <label for="username" class="form-label">아이디:</label>
            <input type="text" class="form-control" v-model.trim="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호:</label>
            <input type="password" class="form-control" v-model.trim="password">
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
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

<style></style>