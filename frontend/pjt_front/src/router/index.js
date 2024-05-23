import { createRouter, createWebHistory } from 'vue-router'

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
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePasswordView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/SearchProductView',
      name: 'SearchProductView',
      component: SearchProductView
    },
    {
      path: '/ProductListDeposit',
      name: 'ProductListDeposit',
      component: ProductListDeposit
    },
    {
      path: '/ProductRecommendDeposit',
      name: 'ProductRecommendDeposit',
      component: ProductRecommendDeposit
    },
    {
      path: '/ProductRecommendSaving',
      name: 'ProductRecommendSaving',
      component: ProductRecommendSaving
    },
    {
      path: '/ProductListSaving',
      name: 'ProductListSaving',
      component: ProductListSaving
    },
    {
      path: '/ProductDepositDetailView/:fin_prdt_cd',
      name: 'ProductDepositDetailView',
      component: ProductDepositDetailView
    },
    {
      path: '/ProductSavingDetailView/:fin_prdt_cd',
      name: 'ProductSavingDetailView',
      component: ProductSavingDetailView
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: MyProfileView
    },
    {
      path: '/board',
      name: 'board',
      component: ArticleView
    },
    {
      path: '/create',
      name: 'CreateView',
      component: CreateView
    },
    {
      path: '/articles/:id',
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/ProductDepositRecommendView/:selectedCompany',
      name: 'ProductDepositRecommendView',
      component: ProductDepositRecommendView
    },
    {
      path: '/ProductSavingRecommendView/:selectedCompany',
      name: 'ProductSavingRecommendView',
      component: ProductSavingRecommendView
    },
    {
      path: '/articles/:id',
      name: 'UpdateView',
      component: CreateView
    }
  ]
})

export default router
