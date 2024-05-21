<template>
  <div class="form-container sign-in-container mt-12">
    <v-form>
      <h1 class="pb-8 font-weight-bold">게시글 작성</h1>
      <v-text-field
        prepend-inner-icon="mdi-border-color"
        placeholder="제목"
        v-model.trim="title"
        label="제목"
        id="title"
      ></v-text-field>
      <v-textarea
        prepend-inner-icon="mdi-sort-variant"
        placeholder="내용"
        label="내용"
        v-model.trim="content"
        id="content"
      ></v-textarea>
      <v-btn
        color="info"
        block
        dark
        tile
        class="pa-6 font-weight-bold"
        elevation="0"
        @click="createArticle()"
        >
        <span v-if="isCreate">게시글 작성</span>
        <span v-else>게시글 수정</span>
        </v-btn
      >
    </v-form>
  </div>

  <!-- <div>
    <h1>게시글 작성</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">제목 : </label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용 : </label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <v-btn>
        <input v-if="isCreate" type="submit" value="생성">
        <input v-else type="submit" value="수정">
      </v-btn> 
    </form>
  </div> -->
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'
import { useRouter, useRoute } from 'vue-router'


const store = userCheckStore()
const boardStore = useBoardStore()

const title = ref(null)
const content = ref(null)

const router = useRouter()
const route = useRoute()

const isCreate = ref(true)

const createArticle = function () {
  axios({
    method: 'post',
    url: `${store.API_URL}/api/v1/boards/articles/`,
    data: {
      title: title.value,
      content: content.value,
    },
    headers: {
        Authorization: `Token ${store.token}`
    }
  })
    .then((response) => {
      router.push({ name: 'board' })
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateArticle = function () {
    axios({
        method: 'put',
        url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
        data: {
            title: title.value,
            content: content.value,
        },
        headers: {
            Authorization: `Token ${store.token}`
        }
    })
    .then((response) => {
        router.push({name: 'DetailView'})
    })
    .catch((error) => {
        console.log(error)
    })
}

const handleSubmit = function () {
    if (isCreate.value) {
      createArticle()
    } else {
      updateArticle()
    }
}


if (route.name === 'UpdateView') {
  onMounted(() => {
  axios({
    method: 'get',
    url: `${store.API_URL}/api/v1/boards/article_detail/${route.params.id}/`,
    headers: {
      Authorization: `Token ${store.token}`
    }
  })
    .then((response) => {
      title.value = response.data.title
      content.value = response.data.content
    })
    .catch((error) => {
      console.log(error)
    })
  })
  isCreate.value = false
}

</script>

<style scoped>
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.team-img {
  width: 50%;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.forgot-password-sm {
  font-size: 12px;
}
.forgot-password-md {
  font-size: 15px;
}
</style>
