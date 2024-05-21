<template>
  <div class="spacer">
    <form @submit.prevent="createComment">
      <v-row>
        <v-col cols="auto" class="commentBoxContainer">
          <input
            type="text"
            id="comment"
            class="commentBox"
            v-model="comment"
            placeholder="댓글은 200자 이내로 남겨주세요."
          >
        </v-col>
        <v-col cols="auto">
          <v-btn type="submit" class="spacer">댓글 남기기</v-btn>
        </v-col>
      </v-row>
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
.commentBox {
  width: 100%;
  height: 5rem;
  border: 1px solid lightblue;
  padding: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

.commentBoxContainer {
  flex: 1;
}

.commentBox:focus {
  outline: none;
  border-color: lightblue;
  box-shadow: 0 0 5px lightblue;
}

.spacer {
  margin: 10px;
}
</style>