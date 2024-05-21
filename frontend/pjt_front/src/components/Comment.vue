<template>
  <div class="comment-card">
    <v-card class="mx-auto" outlined>
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-row justify="space-between" align="center">
          <v-col>
        <v-list-item-content>
          <v-list-item-title>{{ commentInfo.nickname || "Unknown" }}</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(commentInfo.created_at) }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-col>
      <v-col class="text-right" cols="auto">
        <v-list-item-action v-if="commentInfo.userId === userStore.userId" >
          <v-btn icon @click="deleteComment">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-col>
      </v-row>
      </v-list-item>

      <v-card-text class="comment-content" v-text="commentInfo.content"></v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import axios from 'axios';
import { userCheckStore } from '@/stores/usercheck'
import { useBoardStore } from '@/stores/board'
const props = defineProps({ commentInfo: Object, })
const userStore = userCheckStore()
const boardStore = useBoardStore()
const emit = defineEmits(['deleteComment'])

const deleteComment = function () {
  axios({
    method: 'delete',
    url: `${userStore.API_URL}/api/v1/boards/comment_detail/${props['commentInfo'].article}/${props['commentInfo'].id}/`,
    headers: { Authorization: `Token ${userStore.token}` }
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
  const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  return formattedDate
}
</script>

<style scoped>
.comment-card {
  margin-bottom: 16px;
  animation: slide-up 0.3s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>