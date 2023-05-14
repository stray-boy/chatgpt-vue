<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, useMessage } from 'naive-ui'
import { fetchVerify } from '@/api'
import { useAuthStore } from '@/store'
import Icon403 from '@/icons/403.vue'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')
const username = ref('')

const disabled = computed(() => !token.value.trim() || loading.value)

async function handleVerify() {
  const secretKeyUserInfo = {
    username: '',
    token: '',
  }
  secretKeyUserInfo.username = username.value.trim()
  secretKeyUserInfo.token = token.value.trim()

  if (!secretKeyUserInfo.username && !secretKeyUserInfo.token)
    return

  try {
    loading.value = true
    const respdate = await fetchVerify(secretKeyUserInfo.username, secretKeyUserInfo.token)
    // console.log('secretKeyUserInfo', respdate)
    authStore.setToken(respdate)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            403
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <NInput v-model:value="username" type="text" placeholder="请输入账号" style="border: none; background-color: #f7f7f7; padding: 10px; border-radius: 4px; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,.1); margin-bottom: 10px;" @keypress="handlePress" />
          <NInput v-model:value="token" type="password" placeholder="请输入密码" style="border: none; background-color: #f7f7f7; padding: 10px; border-radius: 4px; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,.1);" @keypress="handlePress" />
        </div>
        <!-- 账号：<NInput v-model:value="token" type="password" placeholder="" @keypress="handlePress" />
        密码：<NInput v-model:value="token" type="password" placeholder="" @keypress="handlePress" /> -->
        <NButton
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('common.verify') }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>
