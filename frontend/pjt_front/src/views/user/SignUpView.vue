<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1 class="mb-4">Sign Up</h1>
        <form @submit.prevent="signUp">
          <div class="mb-3">
            <label for="username" class="form-label">아이디:</label>
            <div class="row">
              <input type="text" id="username" class="form-control col-9" v-model.trim="username">
              <v-btn type="v-btn" class="btn btn-secondary btn-sm col-3" @click="checkUserID">중복체크</v-btn>
            </div>
            <p :class="{ 'text-danger': !isPassCheckId, primary: isPassCheckId }">{{ checkMsg }}</p>
          </div>
          <div class="mb-3">
            <label for="password1" class="form-label">비밀번호:</label>
            <input type="password" id="password1" class="form-control" v-model.trim="password1">
          </div>
          <div class="mb-3">
            <label for="password2" class="form-label">비밀번호 확인:</label>
            <input type="password" id="password2" class="form-control" v-model.trim="password2">
            <div v-if="password1 !== password2 && password2 !== null" class="text-danger">
              {{ warning }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">이메일:</label>
            <input type="text" id="email" class="form-control" v-model.trim="email">
          </div>
          <div class="text-center">
            <v-btn type="submit" class="btn btn-primary">SignUp</v-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import axios from 'axios'

const store = userCheckStore()

const username = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const email = ref(null)
const warning = ref('비밀번호가 일치하지 않습니다.')

const signUp = function () {
  if (username.value && password1.value && password2.value && password1.value === password2.value && isPassCheckId.value) {
    const payload = {
      username: username.value,
      password1: password1.value,
      password2: password2.value,
      email: email.value
    }
    store.signUp(payload)
  } else if (!isPassCheckId.value) {
    window.alert('아이디 중복체크가 필요합니다')
  } else {
    window.alert('입력값을 다시 확인하세요')
  }
}

const checkMsg = ref('')
const isPassCheckId = ref(false)
const checkUserID = function () {
  if (!username.value) {
    checkMsg.value = "아이디를 입력하세요."
    isPassCheckId.value = false
  } else {
    axios({
      method: 'post',
      url: `${store.API_URL}/api/v1/accounts/checkUserID/`,
      data: {
        username: username.value
      }
    })
    .then((res) => {
      if (res.data.isExist) {
        isPassCheckId.value = false
        checkMsg.value = "이미 존재하는 아이디입니다"
      } else {
        isPassCheckId.value = true
        checkMsg.value = "사용할 수 있는 아이디입니다"
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

</script>

<style scoped>

.primary {
  color: #00B992;
}
</style>