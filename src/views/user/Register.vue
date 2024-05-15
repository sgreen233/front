<template>
  <el-container>
    <el-header height="68px">
      <img src="@/assets/img/logo.png" style="height:60px;width:60px" />
      <span class="title-span">{{ title }}</span>
    </el-header>
    <el-main>
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="off" label-position="right">
        <h1 style="margin-top: 0">{{ title3 }}</h1>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" type="text" auto-complete="on" placeholder="用户名" @focus="usernameFocus = true" @blur="usernameFocus = false">
            <svg-icon slot="prefix" icon-class="axt-s-user" :class="usernameFocus ? 'active': ''" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" auto-complete="on" placeholder="密码" show-password @keyup.enter.native="handleRegister" @focus="passwordFocus = true" @blur="passwordFocus = false">
            <svg-icon slot="prefix" icon-class="axt-s-password" :class="passwordFocus ? 'active': ''" />
          </el-input>
        </el-form-item>
        <div>
          <el-button :loading="loading" type="primary" class="button-register" @click.native.prevent="handleRegister">
            {{ loading?'注册中...':'注册' }}
          </el-button>
        </div>
        <div align="center">
          <el-link @click="goToLogin">
            <span>已有账号？</span>
            <span class="text-color">点我登录</span>
          </el-link>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import authAPI from '@/utils/auth'
import defaultSettings from '@/settings'
export default {
  name: 'Register',
  data() {
    return {
      registerForm: { username: '', password: '' },
      registerRules: {
        // 注册规则
        username: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
        password: [{ required: true, trigger: ['blur', 'change'], message: '密码不能为空' }]
      },
      loading: false,
      usernameFocus: false,
      passwordFocus: false
    }
  },
  computed: {
    title() {
      return defaultSettings.title
    },
    title3() {
      return defaultSettings.title3
    }
  },
  methods: {
    async handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            // 调用注册接口
            // ...
            this.$message.success('注册成功')
            // 注册成功后跳转到登录页面
            this.$router.replace('/Login')
            this.loading = false
          } catch (error) {
            this.loading = false
            return
          }
        } else {
          return false
        }
      })
    },
    goToLogin() {
      this.$router.replace('/Login')
    }
  }
}
</script>

<style lang="scss" scoped>
// 样式部分...
</style>
