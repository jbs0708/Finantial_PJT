<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = userCheckStore()

const toBeContinue = function () {
  window.alert('작성중...')
}

const goHome = function () {
  router.push({ name: 'home' })
}

const goLogin = function () {
  router.push({ name: 'login' })
}

const goSignUp = function () {
  router.push({ name:'signup' })
}

const goDetail = function () {
    router.push({name: 'userdetail'})
}

const goMyProfile = function () {
    router.push({name:'myprofile'})
}

</script>

<template>
    <v-layout class="rounded rounded-md">
      <v-app-bar color="primary">
      <v-app-bar-nav-icon color="primary">
        <v-icon icon="mdi-menu" />
      </v-app-bar-nav-icon>
      <v-app-bar-title> 대표이름 </v-app-bar-title>
      <v-btn variant="text" prepend-icon="mdi-home" @click="goHome">HOME</v-btn>
      <v-btn variant="text" prepend-icon="mdi-power" @click="goLogin">LOGIN</v-btn>
      <v-btn variant="text" prepend-icon="" @click="userStore.logOut">LOOUT</v-btn>
      <v-btn variant="text" prepend-icon="" @click="goSignUp">SIGNUP</v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent="">
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>
          <div v-if="userStore.token">
            <p><strong>{{ userStore.userId }}님</strong>, 안녕하세요</p>
            <div>
                <div>
                  <v-btn @click="goDetail">개인정보 수정</v-btn>
                  <v-btn @click="goMyProfile">나의 프로필</v-btn>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="text-center">
                <p>비로그인 상태입니다</p>
                <v-btn @click="goLogin">로그인</v-btn> |  
                <v-btn @click="goSignUp">회원가입</v-btn>
            </div>
        </div>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <ul>
            <li>
              <RouterLink :to="{name: 'SearchProductView'}" class="nav-link" style="color: black;">예적금 상품 조회</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'board' }" class="nav-link" style="color: black;">게시판</RouterLink>
            </li>
          </ul>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>

</template>

<style scoped>

</style>