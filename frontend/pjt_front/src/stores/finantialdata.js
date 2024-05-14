import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', () => {

  const datas = ref([])
  const API_URL = 'http://127.0.0.1:8000'

  // const getDatas = function () {
  // axios({
  //   method:'GET',
  //   url: `${API_URL}/compare_deposit/deposit_product/call/`,
    
  // })
  // .then(res => {
 
  //   const transformedData = res.data.reduce((acc, item) => {
  //     const existingItem = acc.find(i => i.금융회사명 === item.deposit_product.kor_co_nm);
  //     if (existingItem) {
  //         if (item.save_trm === 6) {
  //             existingItem["6개월"] = item.intr_rate;
  //         } else if (item.save_trm === 12) {
  //             existingItem["12개월"] = item.intr_rate;
  //         } else if (item.save_trm === 24) {
  //             existingItem["24개월"] = item.intr_rate;
  //         } else if (item.save_trm === 36) {
  //             existingItem["36개월"] = item.intr_rate;
  //         }
  //     } else {
  //         const newItem = {
  //             금융회사명: item.deposit_product.kor_co_nm,
  //             상품명: item.deposit_product.fin_prdt_nm,
  //             fin_prdt_cd: item.fin_prdt_cd
  //         };
  //         if (item.save_trm === 6) {
  //             newItem["6개월"] = item.intr_rate;
  //         } else if (item.save_trm === 12) {
  //             newItem["12개월"] = item.intr_rate;
  //         } else if (item.save_trm === 24) {
  //             newItem["24개월"] = item.intr_rate;
  //         } else if (item.save_trm === 36) {
  //             newItem["36개월"] = item.intr_rate;
  //         }
  //         acc.push(newItem);
  //     }
  //     return acc;
  // }, []);
  //   datas.value = transformedData;
  //   console.log(datas.value)
  // })
  // .catch(err =>
  //   console.log(err)
  // )
  // }
  const getDatas = function () {
    axios({
      method:'GET',
      url: `${API_URL}/compare_deposit/deposit_product/call/`,
    })
    .then(res => {
      const transformedData = res.data.map(item => ({
        data: [{
          금융회사명: item.deposit_product.kor_co_nm,
          상품명: item.deposit_product.fin_prdt_nm,
          fin_prdt_cd: item.fin_prdt_cd,
          총6개월: item.save_trm === 6 ? item.intr_rate : null,
          총12개월: item.save_trm === 12 ? item.intr_rate : null,
          총24개월: item.save_trm === 24 ? item.intr_rate : null,
          총36개월: item.save_trm === 36 ? item.intr_rate : null
        }]
      }));
      datas.value = transformedData;
      console.log(datas.value)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return { datas,getDatas,API_URL }
}, { persist: true })
