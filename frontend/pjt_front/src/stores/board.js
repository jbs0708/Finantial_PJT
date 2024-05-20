import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'


export const useBoardStore = defineStore('board', () => {
  const userCheck = userCheckStore()
  const articles = ref([])
  const articleDetail = ref(null)
  const articleId = ref(null)
  const API_URL = 'http://127.0.0.1:8000'

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/boards/articles/`,
      headers: {
        Authorization: `Token ${userCheck.token}`
      }
    })
      .then(response => {
        articles.value = response.data
        articleId.value = response.data[0].id
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getMyArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/boards/my_articles/`,
      headers: {
        Authorization: `Token ${userCheck.token}`
      }
    })
      .then(response => {
        articles.value = response.data
        articleId.value = response.data[0].id
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const isLogin = computed(() => {
    if (userCheck.token.value === null) {
      return false
    } else {
      return true
    }
  })

  return { articles, API_URL, getArticles, isLogin, articleDetail, articleId, getMyArticles }
}, { persist: true })
