<template>
  <div>
    <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Name -->
              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model.trim="old_password"
                  placeholder="현재 비밀번호"
                  label="현재 비밀번호"
                  type="password"
                />
              </VCol>

              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                v-model.trim="new_password1"
                  placeholder="새 비밀번호"
                  label="새 비밀번호"
                  type="password"
                />
              </VCol>

              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model.trim="new_password2"  
                  placeholder="새 비밀번호 확인"
                  label="새 비밀번호 확인"
                  type="password"
                />
              </VCol>

              <VCol v-if="new_password1 !== new_password2 && new_password2 !== null" cols="4" offset="4" class="text-danger text-center">
                {{ warning }}
              </VCol>
              <VCol v-else cols="4" offset="4" class="text-center">
                <v-btn size="x-large" @click="changePassword">변경</v-btn>
              </VCol>
            </VRow>
      </VForm>
    </VCardText>
  
</div>
</template>

<script setup>
import { ref } from 'vue'
import { userCheckStore } from '@/stores/usercheck'
const store = userCheckStore()

const new_password1 = ref(null)
const new_password2 = ref(null)
const old_password = ref(null)
const warning = ref('비밀번호가 일치하지 않습니다.')

const changePassword = function () {
  const payload = {
    new_password1: new_password1.value,
    new_password2: new_password2.value,
    old_password: old_password.value,
  }
  store.changePassword(payload)
}

</script>

<style>
.text-danger {
  color: red;
  font-size: 25px;
}
</style>