import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', () => {

  const depositDatas = ref([])
  const savingDatas = ref([])

  // const vuetify_datas = []
  const API_URL = 'http://127.0.0.1:8000'
  const saveDatas = function () {
    if (depositDatas.value.length == 0 && savingDatas.value.length == 0) {
        axios({
            method:'GET',
            url: `${API_URL}/compare_deposit/deposit_product/`,
            
          })
          .then(res => {
            console.log(res.data)
          }).
          catch(err => 
            console.error(err)
        )
        axios({
            method:'GET',
            url: `${API_URL}/compare_deposit/saving_product/`,
            
        })
            .then(res => {
            console.log(res.data)
        })
            .catch(err => 
            console.error(err)
            )
    }
    }

 const getDatas = function () {
  axios({
    method:'GET',
    url: `${API_URL}/compare_deposit/deposit_product/call/`,
    
  })
  .then(res => {
    const transformedData = res.data.reduce((acc, item) => {
      const existingItem = acc.find(i => i.fin_prdt_cd === item.deposit_product.fin_prdt_cd);
      if (existingItem) {
          if (item.save_trm === 6) {
              existingItem["6개월"] = item.intr_rate;
          } else if (item.save_trm === 12) {
              existingItem["12개월"] = item.intr_rate;
          } else if (item.save_trm === 24) {
              existingItem["24개월"] = item.intr_rate;
          } else if (item.save_trm === 36) {
              existingItem["36개월"] = item.intr_rate;
          }
      } else {
          const newItem = {
              금융회사명: item.deposit_product.kor_co_nm,
              상품명: item.deposit_product.fin_prdt_nm,
              fin_prdt_cd: item.fin_prdt_cd,
              id : item.deposit_product_id,
          };
          if (item.save_trm === 6) {
              newItem["6개월"] = item.intr_rate;
          } else if (item.save_trm === 12) {
              newItem["12개월"] = item.intr_rate;
          } else if (item.save_trm === 24) {
              newItem["24개월"] = item.intr_rate;
          } else if (item.save_trm === 36) {
              newItem["36개월"] = item.intr_rate;
          }
          acc.push(newItem);
      }
      return acc;
  }, []);
  depositDatas.value = transformedData;
  })
  .catch(err =>
    console.log(err)
  )
  }
  
  const getSavingDatas = function () {
    axios({
      method:'GET',
      url: `${API_URL}/compare_deposit/saving_product/call/`,
      
    })
    .then(res => {
   
      const transformedData = res.data.reduce((acc, item) => {
        const existingItem = acc.find(i => i.상품명 === item.saving_product.fin_prdt_nm);
        if (existingItem) {
            if (item.save_trm === 6) {
                existingItem["6개월"] = item.intr_rate;
            } else if (item.save_trm === 12) {
                existingItem["12개월"] = item.intr_rate;
            } else if (item.save_trm === 24) {
                existingItem["24개월"] = item.intr_rate;
            } else if (item.save_trm === 36) {
                existingItem["36개월"] = item.intr_rate;
            }
        } else {
            const newItem = {
                금융회사명: item.saving_product.kor_co_nm,
                상품명: item.saving_product.fin_prdt_nm,
                fin_prdt_cd: item.fin_prdt_cd,
                id : item.saving_product_id,
            };
            if (item.save_trm === 6) {
                newItem["6개월"] = item.intr_rate;
            } else if (item.save_trm === 12) {
                newItem["12개월"] = item.intr_rate;
            } else if (item.save_trm === 24) {
                newItem["24개월"] = item.intr_rate;
            } else if (item.save_trm === 36) {
                newItem["36개월"] = item.intr_rate;
            }
            acc.push(newItem);
        }
        return acc;
    }, []);
    savingDatas.value = transformedData;
    })
    .catch(err =>
      console.log(err)
    )
    }

  return { depositDatas,savingDatas,API_URL,getDatas,getSavingDatas,saveDatas }
}, { persist: true })
