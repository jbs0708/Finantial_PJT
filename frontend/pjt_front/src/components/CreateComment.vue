<template>
  <div>
    <form @submit.prevent="createComment" class="row mx-1">
      <input type="text" id="comment" v-model="comment" placeholder="댓글은 200자 이내로 남겨주세요.(욕설/비방 댓글은 삭제될 수 있습니다.)" style="width: 30rem;">
      <button type="submit">댓글 남기기</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue'

import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'

const userStore = userCheckStore()
const boardStore = useBoardStore()

const comment = ref(null)

const props = defineProps({
    articleId: Number
})

const emit = defineEmits(['createComment'])

const createComment = function() {
  
}

</script>

<style scoped>

</style>