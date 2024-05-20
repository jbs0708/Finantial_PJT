<template>
  <div>
    <h3>상품 리스트</h3>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="상품명"
      @update:options="loadItems"
      :expanded.sync="expanded"
      show-expand
    >
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <v-btn @click="showDetail(item.fin_prdt_cd)"> {{ item.금융회사명 }} {{ item.상품명 }} 상세 정보</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter,RouterLink } from 'vue-router'
import { useDataStore } from '@/stores/finantialdata'

const store = useDataStore()
const router = useRouter()

const showDetail = function (fin_prdt_cd) {
  router.push({ name: 'ProductDepositDetailView', params: { fin_prdt_cd: fin_prdt_cd} })
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = store.depositDatas.slice()
        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

const itemsPerPage = ref(5)
const headers = ref([
  {
    title: '금융회사명',
    align: 'start',
    sortable: false,
    key: '금융회사명',
  },
  { title: '상품명', key: '상품명', align: 'start', sortable: false },
  { title: '6개월', key: '6개월', align: 'end' },
  { title: '12개월', key: '12개월', align: 'end' },
  { title: '24개월', key: '24개월', align: 'end' },
  { title: '36개월', key: '36개월', align: 'end' },
  { title: '상세정보', key: 'data-table-expand', align: 'end'  },
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const expanded = ref([])

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}
</script>

<style scoped>

</style>
