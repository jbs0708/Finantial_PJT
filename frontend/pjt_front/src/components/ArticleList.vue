<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="boardStore.articles"
      :items-per-page="itemsPerPage"
      :page.sync="currentPage"
      class="elevation-1"
      @click="goToDetail"
      :items-per-page-options="[10, 25, 50]"
    >
      <template v-slot:item="{ item }">
        <tr @click="goToDetail(item)" class="hoverable-row">
          <td class="text-center">{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td v-if="item.nickname == null || item.nickname == ''" class="text-center">Unknown</td>
          <td v-else class="text-center">{{ item.nickname }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useBoardStore } from '@/stores/board';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const boardStore = useBoardStore();
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const router = useRouter();

    const headers = [
      { title: '글번호', value: 'id', align: 'center' },
      { title: '제목', value: 'title', align: 'center' },
      { title: '작성자', value: 'nickname', align: 'center'},
    ];

    const goToDetail = (item) => {
      const articleId = item.id
      console.log(item)
      router.push({ name: 'DetailView', params: { id: item.id } });
    };

    return {
      goToDetail,
      boardStore,
      headers,
      currentPage,
      itemsPerPage
    };
  },

  created() {
    const boardStore = useBoardStore();
    boardStore.getArticles();
  },
};
</script>

<style scoped>
.v-data-table tr {
  cursor: pointer;
}

.v-data-table tr:hover {
  background-color: #f5f5f5;
}
</style>
