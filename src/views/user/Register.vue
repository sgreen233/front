<template>
  <el-container>
    <el-header height="68px">
      <img src="@/assets/img/logo.png" style="height:60px;width:60px" />
      <span class="title-span">{{ title }}</span>
    </el-header>
    <el-main>
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="off" label-position="right">
        <h1 style="margin-top: 0">{{ title3 }}</h1>
        <el-form-item prop="account">
          <el-input v-model="registerForm.account" type="text" auto-complete="on" placeholder="用户名" @focus="accountFocus = true" @blur="accountFocus = false">
            <svg-icon slot="prefix" icon-class="axt-s-user" :class="accountFocus ? 'active': ''" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" auto-complete="on" placeholder="密码" show-password @keyup.enter.native="handleRegister" @focus="passwordFocus = true" @blur="passwordFocus = false">
            <svg-icon slot="prefix" icon-class="axt-s-password" :class="passwordFocus ? 'active': ''" />
          </el-input>
        </el-form-item>
        <!-- New fields -->
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" type="number" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="registerForm.name" type="text" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="jobId">
          <el-input v-model="registerForm.jobId" type="number" placeholder="工作号"></el-input>
        </el-form-item>
        <!-- End of new fields -->
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
      registerForm: { account: '', password: '', phone: '', name: '', jobId: '' },
      registerRules: {
        // 注册规则
        account: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
        password: [{ required: true, trigger: ['blur', 'change'], message: '密码不能为空' }],
        phone: [{ required: true, trigger: ['blur', 'change'], message: '请输入手机号' }],
        name: [{ required: true, trigger: ['blur', 'change'], message: '请输入姓名' }],
        jobId: [{ required: true, trigger: ['blur', 'change'], message: '请输入工作号' }]
      },
      loading: false,
      accountFocus: false,
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
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    async handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            // 调用注册接口
//            await this.$store.dispatch('user/register', this.registerForm)
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

</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";



.el-header {
  display: flex;
  align-items: center;
  background-color: #e9eef3;
  img {
    width: 55px;
    height: 70px;
  }
  .title-span {
    line-height: 60px;
    font-size: 24px;
    color: $--color-primary;
    font-weight: bold;
    margin-left: 10px;
  }
}

.register-form{
    background: #f5f7fa;
    opacity:80%;
    position: absolute;
    left: 30%;
    z-index: 999;
    width: 600px;
    top: 50%;
    transform: translateY(-50%);
    padding: 35px;
    border-radius: 6px;
    overflow: hidden;
}

.el-main {
  background: url("~@/assets/img/login_background.jpg") no-repeat;
  background-size: 100% auto;
  color: #333;
  .login-form {
    background: #f5f7fa;
    position: absolute;
    right: 60px;
    z-index: 999;
    width: 320px;
    top: 50%;
    transform: translateY(-50%);
    padding: 35px;
    border-radius: 6px;
    overflow: hidden;
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
}
.el-container {
  width: 100%;
  height: 100%;
}
.text-color {
  color: $--color-primary;
}
.svg-icon {
  color: #8a8a8a;
}
.display-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.svg-icon.active {
  color: $--color-primary;
}
.button-register {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
