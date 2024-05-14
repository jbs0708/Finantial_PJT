<template>
  <div>
    <h3>상품 리스트</h3>
    <ProductListItem v-for="data in store.datas" :key="data.id" :data="data" />
    <!-- <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server> -->
    <!-- <test/> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useDataStore } from '@/stores/finantialdata'

import ProductListItem from '@/components/ProductListItem.vue'
import test from '@/components/test.vue'

const store = useDataStore()
console.log(store.datas)
    
// const FakeAPI = {
//   async fetch ({ page, itemsPerPage, sortBy }) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const start = (page - 1) * itemsPerPage
//         const end = start + itemsPerPage
//         const items = store.datas.slice()
//         console.log(items)
//         if (sortBy.length) {
//           const sortKey = sortBy[0].key
//           const sortOrder = sortBy[0].order
//           items.sort((a, b) => {
//             const aValue = a[sortKey]
//             const bValue = b[sortKey]
//             return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
//           })
//         }

//         const paginated = items.slice(start, end)

//         resolve({ items: paginated, total: items.length })
//       }, 500)
//     })
//   },
// }

// export default {
//   data: () => ({
//     itemsPerPage: 5,
//     headers: [
//       {
//         title: 'Dessert (100g serving)',
//         align: 'start',
//         sortable: false,
//         key: '금융회사명',
//       },
//       { title: 'aaa', key: 'calorieaas', align: 'end' },
//       { title: 'Fat (g)', key: 'fat', align: 'end' },
//       { title: 'Carbs (g)', key: 'carbs', align: 'end' },
//       { title: 'Protein (g)', key: 'protein', align: 'end' },
//       { title: 'Iron (%)', key: 'iron', align: 'end' },
//     ],
//     search: '',
//     serverItems: [],
//     loading: true,
//     totalItems: 0,
//   }),
//   methods: {
//     loadItems ({ page, itemsPerPage, sortBy }) {
//       this.loading = true
//       FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
//         this.serverItems = items
//         this.totalItems = total
//         this.loading = false
//       })
//     },
//   },
// }




</script>

<style scoped>

</style>