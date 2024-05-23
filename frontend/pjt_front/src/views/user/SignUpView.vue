<template>

  <div class="form-container sign-up-container">
    <v-form @submit.prevent="signUp()">
      <h1 class="pb-12 font-weight-bold">회원가입 페이지</h1>
      <v-row>
        <v-col cols="9">
          <v-text-field
            placeholder="Username"
            prepend-inner-icon="mdi-account"
            v-model="username"
          ></v-text-field>
        </v-col>
        <v-col cols="3" class="justify-center">
          <v-btn @click="checkUserID" block style="height: 55px;">중복체크</v-btn>
        </v-col>
      </v-row>
      <p :class="{ 'text-danger': !isPassCheckId, primary: isPassCheckId }">{{ checkMsg }}</p>
      <v-text-field
        placeholder="Password"
        prepend-inner-icon="mdi-lock"
        v-model="password1"
        type="password"
      ></v-text-field>
      <v-text-field
        placeholder="Password Confirm"
        prepend-inner-icon="mdi-lock"
        v-model="password2"
        type="password"
      ></v-text-field>
      <div v-if="password1 !== password2 && password2 !== null" class="text-danger">
        {{ warning }}
      </div>
      <v-text-field
        placeholder="Email"
        prepend-inner-icon="mdi-email"
        v-model="email"
      ></v-text-field>
      <v-btn
        color="info"
        block
        dark
        tile
        class="pa-6 font-weight-bold"
        elevation="0"
        type="submit"
        >Sign Up</v-btn>
    </v-form>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import axios from 'axios'

const store = userCheckStore()

const username = ref(null)
const confirmedUsername = ref(null)
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
        confirmedUsername.value = username.value
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

watch(username, () => {
    if (username.value !== confirmedUsername.value) {
      isPassCheckId.value = false
      checkMsg.value = ''
    }
})

</script>

<style scoped>
.primary {
  color: #00B992;
}

.text-danger {
  color: red;
}

.sign-up-container {
  left: 0;
  width: 50%;

}

.team-img {
  width: 50%;
}

</style>