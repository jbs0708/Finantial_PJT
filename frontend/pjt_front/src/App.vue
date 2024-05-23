
<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <div class="logo-container clickable-image">
          <v-img
            src="/assets/main.jpg"
            contain
            width="90px"
            height="90px"
            @click="goHome"
          ></v-img>
        </div>
      </v-app-bar-title>
      <v-btn variant="text" prepend-icon="mdi-home" @click="goHome">HOME</v-btn>
      <v-btn variant="text" prepend-icon="mdi-power" @click="goLogin">LOGIN</v-btn>
      <v-btn variant="text" prepend-icon="mdi-account-edit" @click="goSignUp">SIGNUP</v-btn>
    </v-app-bar>

    
    <v-navigation-drawer permanent>
      <v-sheet class="pa-4 text-center" color="grey-lighten-4">
        &nbsp;
        <div v-if="userStore.token">
          <p v-if="nickname == '' || nickname == null"><strong>{{ userStore.userId }}님</strong>, 안녕하세요</p>
          <p v-else><strong>{{ nickname }}님</strong>, 안녕하세요</p>
          &nbsp;
          <div>
            <v-btn @click="goMyProfile">프로필</v-btn> | 
            <v-btn @click="userStore.logOut">로그아웃</v-btn>
          </div>
        </div>
        <div v-else>
          <div class="text-center">
            <p>비로그인 상태입니다</p>
            <v-btn @click="goLogin">로그인</v-btn> | 
            <v-btn @click="goSignUp">회원가입</v-btn>
          </div>
        </div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item title="예적금 상품 조회" :to="{ name: 'SearchProductView' }"></v-list-item>
        <v-list-item title="게시판" :to="{ name: 'board' }"></v-list-item>
        <v-list-item title="지도" :to="{ name: 'map' }"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>

    <v-footer class="bg-primary text-center d-flex flex-column" style="max-height: 100px;">
      <div class="pt-1">
        금융 프로젝트
      </div>
      <div class="pb-1">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = userCheckStore()

const nickname = userStore.nickname

const toBeContinue = function () {
  window.alert('작성중...')
}

const goHome = function () {
  router.push({ name: 'home' })
  if (route.name === 'home') {
    window.location.reload()
    }
}

const goLogin = function () {
  router.push({ name: 'login' })
}

const goSignUp = function () {
  router.push({ name: 'signup' })
}

const goMyProfile = function () {
  router.push({ name: 'myprofile' })
}
</script>

<style>
.clickable-image {
  cursor: pointer;
}

.nav-link {
  color: black;
}

.v-footer {
  height: 50px;
  padding: 10px;
}

.logo-container {
  margin-left: 20px;
}
</style>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>