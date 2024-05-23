import { createRouter, createWebHistory } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'

import MainPageView from '@/views/MainPageView.vue'
import SignUpView from '@/views/user/SignUpView.vue'
import LoginView from '@/views/user/LoginView.vue'
import ChangePasswordView from '@/views/user/ChangePasswordView.vue'
import MyProfileView from '@/views/user/MyProfileView.vue'
import ArticleView from '@/views/board/ArticleView.vue'
import CreateView from '@/views/board/CreateView.vue'
import DetailView from '@/views/board/DetailView.vue'


import MapView from '@/views/map/MapView.vue'
import SearchProductView from '@/views/finantial-data/SearchProductView.vue'

import ProductRecommendDeposit from '@/views/finantial-data/ProductRecommendDepositView.vue'
import ProductRecommendSaving from '@/views/finantial-data/ProductRecommendSavingView.vue'

import ProductDepositRecommendView from '@/views/finantial-data/ProductDepositRecommendView.vue'
import ProductSavingRecommendView from '@/views/finantial-data/ProductSavingRecommendView.vue'
import ProductListDeposit from '@/views/finantial-data/ProductListDepositView.vue'
import ProductListSaving from '@/views/finantial-data/ProductListSavingView.vue'
import ProductDepositDetailView from '@/views/finantial-data/ProductDepositDetailView.vue'
import ProductSavingDetailView from '@/views/finantial-data/ProductSavingDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
      name: 'home',
      component: MainPageView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (!userStore.isLogin) {
          next()
        } else {
          window.alert('이미 로그인되어 있습니다.')
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (!userStore.isLogin) {
          next()
        } else {
          window.alert('이미 로그인되어 있습니다.')
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePasswordView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/SearchProductView',
      name: 'SearchProductView',
      component: SearchProductView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductListDeposit',
      name: 'ProductListDeposit',
      component: ProductListDeposit,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductRecommendDeposit',
      name: 'ProductRecommendDeposit',
      component: ProductRecommendDeposit,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductRecommendSaving',
      name: 'ProductRecommendSaving',
      component: ProductRecommendSaving,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductListSaving',
      name: 'ProductListSaving',
      component: ProductListSaving,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductDepositDetailView/:fin_prdt_cd',
      name: 'ProductDepositDetailView',
      component: ProductDepositDetailView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductSavingDetailView/:fin_prdt_cd',
      name: 'ProductSavingDetailView',
      component: ProductSavingDetailView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: MyProfileView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/board',
      name: 'board',
      component: ArticleView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductDepositRecommendView/:selectedCompany',
      name: 'ProductDepositRecommendView',
      component: ProductDepositRecommendView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/ProductSavingRecommendView/:selectedCompany',
      name: 'ProductSavingRecommendView',
      component: ProductSavingRecommendView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/articles/:id',
      name: 'UpdateView',
      component: CreateView,
      beforeEnter: (to, from, next) => {
        const userStore = userCheckStore()
        if (userStore.isLogin) {
          next()
        } else {
          window.alert('로그인이 필요합니다.')
          next({ name: 'login' })
        }
      }
    }
  ]
})

export default router
