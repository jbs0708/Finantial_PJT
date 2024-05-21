<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          금융회사명
        </th>
        <th class="text-left">
          상품명
        </th>
        <th class="text-left">
          최고 연이율
        </th>
        <th class="text-left">
          상세 정보
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="product in filteredProducts" :key="product.id" @click="selectProduct(product)"
      >
        <td>{{ product.금융회사명 }}</td>
        <td>{{ product.상품명 }}</td>
        <td>{{ getMaxMonth(product)  }}</td>
        <td><v-btn @click="showDetail(product.fin_prdt_cd)">바로가기</v-btn></td>
      </tr>
    </tbody>
  </v-table>

</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  filteredProducts: Array
})

const emit = defineEmits(['productSelected'])

const selectProduct = (product) => {
  emit('productSelected', product)
}

const showDetail = function (fin_prdt_cd) {
  router.push({ name: 'ProductSavingDetailView', params: { fin_prdt_cd: fin_prdt_cd} })
}

// 개월 수에서 가장 높은 값을 가져오는 함수
const getMaxMonth = (product) => {
  const maxMonth = Math.max(product["6개월"] || 0, product["12개월"] || 0, product["24개월"] || 0, product["36개월"] || 0)
  return maxMonth !== 0 ? `${maxMonth}` : "N/A"
}
</script>

<style scoped>
/* Add your styles here */
</style>
