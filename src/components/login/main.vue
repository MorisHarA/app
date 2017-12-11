<template>
  <div class="login-container">
    <div class="bg-container"></div>
    <div class="wrapper">
      <div class="login-wrap">
        <img class="font-img" src="./imgs/login.png" >
        <div class="txt">医院智能标签系统</div>
        <div class="account-wrap">
          <input
            class="account"
            type="text"
            v-model.trim="username"
            placeholder="请输入账号">
          <img class="account-img" src="./imgs/account.png" alt="账号">
        </div>
        <div class="password-wrap">
          <input
            class="password"
            type="password"
            @keydown.enter="submit"
            v-model="password"
            placeholder="请输入密码">
          <img class="password-img" src="./imgs/password.png" alt="密码">
        </div>
        <div @click="submit" :class="canSubmit? 'submit active': 'submit'">登录</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex';
import Message from 'iview/src/components/message';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    canSubmit() {
      return this.username.length > 0 && this.password.length > 0;
    },
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };
      if (!data.username) {
        Message.warning('请输入账号');
        return;
      }
      if (!data.password) {
        Message.warning('请输入密码');
        return;
      }
      this.login(data);
    },
    ...mapActions('login', ['login']),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.login-container {
  width: 100%;
  min-width: 1150px;
  min-height: 100vh;
  background-color: #f6f8fc;
  .bg-container {
    width: 100%;
    min-width: 1150px;
    height: 294px;
    overflow: hidden;
    background-image: url(imgs/bg.png);
    background-size: 1024px 294px;
  }
  ::-webkit-input-placeholder {
    color: #cccccc;
  }
  .wrapper {
    width: 100%;
    min-width: 1150px;
    .login-wrap {
      width: 422px;
      height: 395px;
      box-shadow: 0px 0px 3px #eceff5;
      margin: -132px auto 0px auto;
      background-color: #fff;
      border-radius: 6px;
      padding-top: 40px;
      .font-img {
        width: 234px;
        margin-left: 100px;
      }
      .txt {
        font-size: 16px;
        color: #999999;
        margin-left: 210px;
        margin-bottom: 40px;
      }
      .account-wrap {
        width: 328px;
        position: relative;
        margin: 0 auto;
        height: 41px;
        font-size: 14px;
        border-radius: 6px;
        .account {
          width: 328px;
          display: block;
          padding-left: 30px;
          box-sizing: border-box;
          height: 41px;
          border-radius: 4px;
          outline: none;
          border: 1px solid #e5e5e5;
          &:focus {
            border: 1px solid #157df2;
          }
        }
        .account-img {
          width: 12px;
          height: 14px;
          position: absolute;
          top: 13px;
          left: 12px;
        }
      }
      .password-wrap {
        width: 328px;
        position: relative;
        margin: 18px auto 0px auto;
        height: 41px;
        font-size: 14px;
        border-radius: 6px;
        .password {
          width: 328px;
          display: block;
          padding-left: 30px;
          box-sizing: border-box;
          height: 41px;
          border-radius: 4px;
          outline: none;
          border: 1px solid #e5e5e5;
          &:focus {
            border: 1px solid #157df2;
          }
        }
        .password-img {
          width: 12px;
          height: 14px;
          position: absolute;
          top: 13px;
          left: 12px;
        }
      }
      .submit {
        width: 328px;
        height: 41px;
        margin: 38px auto 0px auto;
        font-size: 14px;
        line-height: 41px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        background-color: #469dff;
        color: #daebff;
        &.active {
          background-color: #157df2;
          color: #fff;
        }
      }
    }
  }
}
</style>
