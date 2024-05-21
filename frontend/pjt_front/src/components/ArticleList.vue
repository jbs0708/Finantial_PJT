<template>
  <div>
    <h3>게시글 목록</h3>
    <v-container>
      <v-data-table
        v-model:items-per-page="articlesPerPage"
        :items="serverArticles"
        :server-items-length="totalArticles"
        :loading="loading"
        :options.sync="options"
        item-value="게시글"
        @update:options="loadArticles"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>게시글 목록</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="article in items"
              :key="article.id"
              @click="goDetailPage(article.id)"
            >
              <td>{{ article.id }}</td>
              <td>{{ article.title }}</td>
              <td v-if="article.nickname">{{ article.nickname }}</td>
              <td v-else>{{ 'Unknown' }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useBoardStore } from '@/stores/board'
import { useRouter } from 'vue-router'

const boardStore = useBoardStore()
const router = useRouter()

const goDetailPage = (articlePK) => {
  router.push({ name: 'DetailView', params: { id: articlePK } })
}

const articleList = {
  async fetch({ page, itemsPerPage }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const articles = boardStore.articles.slice()
        const paginated = articles.slice(start, end)
        resolve({ articles: paginated, total: articles.length })
      }, 500)
    })
  },
}

const loading = ref(true)
const serverArticles = ref([])
const totalArticles = ref(0)
const articlesPerPage = ref(10)

const options = reactive({
  page: 1,
  itemsPerPage: articlesPerPage.value,
})

const loadArticles = () => {
  loading.value = true
  articleList.fetch(options).then(({ articles, total }) => {
    serverArticles.value = articles
    totalArticles.value = total
    loading.value = false
  })
}

watch(options, loadArticles, { deep: true })
loadArticles()
</script>

<!-- <template>
  <div>
    <h3>게시글 목록</h3>
    <v-container>
      <v-data-table
      v-model:articles-per-page="articlesPerPage"
      :items="serverArticles"
      :server-items-length="totalArticles"
      :loading="loading"
      :options.sync="options"
      item-value="게시글"
      @update:options="loadArticles"
      class="elevation-1"
      >
        <thead>
          <tr>
            <th class="text-left">
              번호
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              작성자
            </th>
          </tr>
        </thead>
        <template v-slot:body="{ items }">
        <tbody>
            <tr @click="goDetailPage(article.id)">
              <td>{{ article.id }}</td>
              <td>{{ article.title }}</td>
              <td v-if="article.nickname">{{ article.nickname }}</td>
              <td v-else>{{ "Unknown" }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBoardStore } from '@/stores/board'
import ArticleListItem from '@/components/ArticleListItem.vue'
import { RouterLink, useRouter } from 'vue-router'

const boardStore = useBoardStore()

const router = useRouter()

console.log(boardStore.articles)
console.log(boardStore.articles.length)

const goDetailPage = function(articlePK) {
  router.push({ name: 'DetailView', params: { id: articlePK } })
}

const articleList = {
  async fetch({ page, articlesPerPage }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * articlesPerPage
        const end = start + articlesPerPage
        const articles = boardStore.articles.slice()
        console.log(articles)
        console.log(articles.length)
        const paginated = articles.slice(start, end)

        resolve({ articles: paginated, total: articles.length })
      }, 500)
    })
  },
}
const loading = ref(true)
const serverArticles = ref([])
const totalArticles = ref(0)
const articlesPerPage = ref(10)

const loadArticles = ({ page, articlesPerPage }) => {
  loading.value = true
  articleList.fetch({ page, articlesPerPage }).then(({ articles, total }) => {
    serverArticles.value = articles
    totalArticles.value = total
    loading.value = false
  })
}

</script> -->

<style scoped>
.v-data-table tr {
  cursor: pointer;
}

.v-data-table tr:hover {
  background-color: #f5f5f5;
}
</style>
