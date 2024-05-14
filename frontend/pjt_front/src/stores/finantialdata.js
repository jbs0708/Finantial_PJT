import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', () => {

  const datas = ref(null)
  const API_URL = 'http://127.0.0.1:8000'

  const getDatas = function () {
  axios({
    method:'GET',
    url: `${API_URL}/compare_deposit/deposit_product/call/`,
    
  })
  .then(res => {
  console.log(res.data)
  datas.value = res.data
  })
  .catch(err =>
    console.log(err)
  )
  }

  return { datas,getDatas }
})
