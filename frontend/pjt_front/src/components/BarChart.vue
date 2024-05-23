<template>
  <div>
    <h3 class="text-center">예금 상품</h3>
    <canvas id="myDepositChart"></canvas>

    <h3 class="text-center">적금 상품</h3>
    <canvas id="mySavingChart"></canvas>
  </div>
</template>


<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeMount } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const products = ref('')
const userStore = userCheckStore()

const deposit_list = ref('')
const my_deposit_list = ref('')
const best_deposit_list = ref('')

const saving_list = ref('')
const my_saving_list = ref('')
const best_saving_list = ref('')

const getJoinList = function () {
  axios({
    method: 'get',
    url: `${userStore.API_URL}/api/v1/accounts/join_list/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
    .then((res) => {
      console.log(res.data)
      products.value = res.data

      deposit_list.value = res.data.deposit_list.map(item => item.deposit_product.fin_prdt_nm
)
      my_deposit_list.value = res.data.deposit_list.map(item => item.intr_rate)
      best_deposit_list.value = res.data.deposit_list.map(item => item.intr_rate2)
      
      saving_list.value = res.data.saving_list.map(item => item.saving_product.fin_prdt_nm)
      my_saving_list.value = res.data.saving_list.map(item => item.intr_rate)
      best_saving_list.value = res.data.saving_list.map(item => item.intr_rate2)

      console.log(deposit_list.value)
      console.log(my_deposit_list.value)
      console.log(best_deposit_list.value)
      console.log(saving_list.value)
      console.log(my_saving_list.value)
      console.log(best_saving_list.value)

      createDepositChart()
      createSavingChart()
    })
    .catch((err) => {
      console.log(err)
    })
}

const createDepositChart = () => {
  const ctx = document.getElementById('myDepositChart').getContext('2d');

  const myDepositChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: deposit_list.value,
      datasets: [{
        label: '나의 예금 금리',
        data: my_deposit_list.value,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '최고 우대 금리',
        data: best_deposit_list.value,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 4
        }
      }
    }
  });
};

const createSavingChart = () => {
  const ctx = document.getElementById('mySavingChart').getContext('2d');
  const mySavingChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: saving_list.value,
      datasets: [{
        label: '나의 적금 금리',
        data: my_saving_list.value,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '최고 우대 금리',
        data: best_saving_list.value,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 6
        }
      }
    }
  });
};


onMounted(() => {
  getJoinList()
})


</script>

<style>
h3 {
  margin: 20px;
}
</style>
