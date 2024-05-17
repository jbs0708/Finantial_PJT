<template>
  <div>
    <form @submit.prevent="createComment">
      <input type="text" id="comment" v-model="comment" placeholder="댓글은 200자 이내로 남겨주세요.(욕설/비방 댓글은 삭제될 수 있습니다.)" style="width: 30rem;">
      <v-btn type="submit">댓글 남기기</v-btn>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue'

import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userStore = userCheckStore()
const boardStore = useBoardStore()

const comment = ref(null)
const articleId = boardStore.articleId

const emit = defineEmits(['createComment'])

const createComment = function() {
  axios({
    method: 'post',
    url: `${userStore.API_URL}/api/v1/boards/comment_create/${articleId}/`,
    data: {
      content: comment.value
    },
    headers: {
        Authorization: `Token ${userStore.token}`
    }
  })
    .then(response => {
      console.log('댓글생성')
      console.log(response)
      emit('createComment')
      comment.value = ''
  })
    .catch(error => {
      console.log(error)
  })
}

watch(comment, () => {
    if (comment.value.length > 200) {
      window.alert('댓글은 200자 이내로 작성해야 합니다')
      comment.value = comment.value.slice(0, 200)
    }
})

</script>

<style scoped>

</style>