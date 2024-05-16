import { createRouter, createWebHistory } from 'vue-router'

import MainPageView from '@/views/MainPageView.vue'
import SignUpView from '@/views/user/SignUpView.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserDetailView from '@/views/user/UserDetailView.vue'
import ChangePasswordView from '@/views/user/ChangePasswordView.vue'

import SearchProductView from '@/views/finantial-data/SearchProductView.vue'

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
      path: '/signup/',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/userdetail/',
      name: 'userdetail',
      component: UserDetailView
    },
    {
      path: '/changepassword/',
      name: 'changepassword',
      component: ChangePasswordView
    },
    {
      path: '/SearchProductView/',
      name: 'SearchProductView',
      component: SearchProductView
    },
    {
      path: '/ProductListDeposit/',
      name: 'ProductListDeposit',
      component: ProductListDeposit
    },
    {
      path: '/ProductListSaving/',
      name: 'ProductListSaving',
      component: ProductListSaving
    },
    {
      path: '/ProductDepositDetailView/:fin_prdt_cd/',
      name: 'ProductDepositDetailView',
      component: ProductDepositDetailView
    },
    {
      path: '/ProductSavingDetailView/:fin_prdt_cd/',
      name: 'ProductSavingDetailView',
      component: ProductSavingDetailView
    },
  ]
})

export default router
