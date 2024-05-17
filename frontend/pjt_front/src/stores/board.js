import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { userCheckStore } from '@/stores/usercheck'


export const useBoardStore = defineStore('board', () => {
  const userCheck = userCheckStore()
  const articles = ref([])
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

  return { articles, API_URL, getArticles, isLogin }
}, { persist: true })
