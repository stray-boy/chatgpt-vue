<script lang="ts">
import { Vue } from 'vue-property-decorator'
import random from 'lodash/random'


export default class VerificationCode extends Vue {
  code = '' // 验证码
  codeLength = 4 // 验证码长度

  // 初始化验证码
  mounted() {
    this.generateCode()
  }

  // 生成验证码
  generateCode() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < this.codeLength; i++) {
      const index = random(chars.length - 1)
      code += chars[index]
    }
    this.code = code
  }

  // 更新验证码
  updateCode() {
    this.generateCode()
  }
}
</script>

<template>
  <div>
    <span>{{ code }}</span>
    <button @click="updateCode()">
      更新
    </button>
  </div>
</template>
