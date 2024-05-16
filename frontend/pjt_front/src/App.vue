<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck.js'

const store = userCheckStore()
const toBeContinue = function () {
  window.alert('작성중...')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg" style="background-color: white;">
    <div class="container-fluid">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">Home</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown mx-2">
              <RouterLink :to="{name: 'SearchProductView'}" class="nav-link" style="color: black;">예적금 상품 조회</RouterLink>
            </li>
            <li class="nav-item mx-2">
              <a href="#" class="nav-link" @click="toBeContinue">대출 상품 조회</a>
            </li>
            <li class="nav-item mx-2">
              <a href="#" class="nav-link" @click="toBeContinue">투자 상품 조회</a>
            </li>
          </ul>
          <ul v-if="!store.token" class="ms-auto navbar-nav">
            <li class="nav-item mx-2">
              <RouterLink :to="{name: 'signup'}" class="nav-link" style="color: black;">회원가입</RouterLink>
            </li>
            <li class="nav-item mx-2">
              <RouterLink :to="{name: 'login'}" class="nav-link" style="color: black;">로그인</RouterLink>
            </li>
          </ul>
          <ul v-else class="ms-auto navbar-nav">
            <li class="nav-item mx-2 my-auto">
              {{ store.userId }}님
            </li>
            <li class="nav-item mx-2">
              <button class="btn btn-sm btn-outline-secondary fw-bold" type="button" @click="store.logOut">로그아웃</button>
            </li>
          </ul>
      </div>
    </div>
  </nav>

  <!-- <h3 class="warning-msg">저희 페이지는 620px 이상을 지원하며, 모바일은 현재 준비중에 있습니다.</h3> -->
  <RouterView class="final-outer"/>
</template>

<style scoped>
nav {
  font-size: 18px;
  font-weight: bold;
}
.warning-msg {
    display: none;
}

.final-outer {
  margin-bottom: 2rem;
  min-height: 64vh;
}

@media (max-width: 620px) {
    .warning-msg {
        display: contents;
        color: red;
    }
    .final-outer {
        display: none;
    }
}
.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>

<style>
.btn-primary {
  color: white !important;
}

.btn-danger {
  color: white !important;
}

.btn-outline-primary:hover {
  color: white !important;
}

.btn-outline-danger:hover {
  color: white !important;
}
</style>