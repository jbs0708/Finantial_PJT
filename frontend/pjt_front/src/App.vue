<!-- src/App.vue -->
<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon>
        <v-icon icon="mdi-menu" />
      </v-app-bar-nav-icon>
      <v-app-bar-title>대표이름</v-app-bar-title>
      <v-btn variant="text" prepend-icon="mdi-home" @click="goHome">HOME</v-btn>
      <v-btn variant="text" prepend-icon="mdi-power" @click="goLogin">LOGIN</v-btn>
      <v-btn variant="text" prepend-icon="" @click="userStore.logOut">LOGOUT</v-btn>
      <v-btn variant="text" prepend-icon="" @click="goSignUp">SIGNUP</v-btn>
    </v-app-bar>

    
    <v-navigation-drawer permanent>
      <v-sheet class="pa-4 text-center" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>
        <div v-if="userStore.token">
          <p v-if="nickname == ''"><strong>{{ userStore.userId }}님</strong>, 안녕하세요</p>
          <p v-else><strong>{{ nickname }}님</strong>, 안녕하세요</p>
          <div>
            <v-btn @click="goMyProfile">나의 프로필</v-btn>
            <v-btn @click="userStore.logOut">로그아웃</v-btn>
          </div>
        </div>
        <div v-else>
          <div class="text-center">
            <p>비로그인 상태입니다</p>
            <v-btn @click="goLogin">로그인</v-btn>
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

    <v-main class="d-flex flex-column align-center justify-center">
      <div class="main-content">
        <RouterView />
      </div>
      <!-- <div>
        <ExchangeRateCalculator />
      </div> -->
    </v-main>

    <v-footer class="bg-primary text-center d-flex flex-column" height="auto">
      <div class="d-flex align-center justify-center py-1"> <!-- 수정된 부분 -->
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-2" variant="text"></v-btn>
      </div>
      <div class="pt-1">
        금융 프로젝트
      </div>
      <v-divider></v-divider>
      <div class="pb-1">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'
import { useRouter, useRoute } from 'vue-router'
import ExchangeRateCalculator from '@/components/ExchangeRateCalculator.vue'

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

const goDetail = function () {
  router.push({ name: 'userdetail' })
}

const goMyProfile = function () {
  router.push({ name: 'myprofile' })
}
</script>

<style scoped>
.nav-link {
  color: black;
}

.v-footer {
  padding: 10px;
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

<style scoped>
.v-btn {
  padding: 5px;
  margin: 5px;
}

.main-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 300px;
}

.v-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
