<template>
  <div>
    <div>
      <div>{{ commentInfo.nickname ? commentInfo.nickname : "Unknown" }} - </div>
      <div>{{ commentInfo.content }}</div>
    </div>
    <p>{{ formatDate(commentInfo.created_at) }}</p>
    <v-btn v-if="commentInfo.userId === userStore.userId" @click="deleteComment">삭제</v-btn>
    <hr>
  </div>
</template>

<script setup>
import axios from 'axios';

import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'


const props = defineProps({
    commentInfo: Object,
})

const userStore = userCheckStore()
const boardStore = useBoardStore()

const emit = defineEmits(['deleteComment'])

const deleteComment = function () {
    axios({
        method: 'delete',
        url: `${userStore.API_URL}/api/v1/boards/comment_detail/${props['commentInfo'].article}/${props['commentInfo'].id}/`,
        headers: {
          Authorization: `Token ${userStore.token}`
        }
    })
    .then((res) => {
        console.log('댓글 삭제')
        emit("deleteComment")
    })
    .catch((err) => {
        console.log(err)
    })
}

const formatDate = function (dateInfo) {
    const date = new Date(dateInfo)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Form the desired date string
    const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    return formattedDate
}

</script>

<style scoped>

</style>

