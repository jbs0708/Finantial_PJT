import { createRouter, createWebHistory } from 'vue-router'

import MainPageView from '@/views/MainPageView.vue'
import SignUpView from '@/views/user/SignUpView.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserDetailView from '@/views/user/UserDetailView.vue'
import ChangePasswordView from '@/views/user/ChangePasswordView.vue'
import MyProfileView from '@/views/user/MyProfileView.vue'
import ArticleView from '@/views/board/ArticleView.vue'
import CreateView from '@/views/board/CreateView.vue'
import DetailView from '@/views/board/DetailView.vue'
import UpdateView from '@/views/board/CreateView.vue'

import SearchProductView from '@/views/finantial-data/SearchProductView.vue'

import ProductRecommendDeposit from '@/views/finantial-data/ProductRecommendDepositView.vue'

import ProductDepositRecommendView from '@/views/finantial-data/ProductDepositRecommendView.vue'
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
      path: '/ProductRecommendDeposit/',
      name: 'ProductRecommendDeposit',
      component: ProductRecommendDeposit
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
    {
      path: '/myprofile/',
      name: 'myprofile',
      component: MyProfileView
    },
    {
      path: '/board/',
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
      path: '/ProductDepositRecommendView/:selectedCompany/',
      name: 'ProductDepositRecommendView',
      component: ProductDepositRecommendView
    },
    {
      path: '/articles/:id',
      name: 'UpdateView',
      component: CreateView
    }
  ]
})

export default router
