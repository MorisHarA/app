<template>
  <div class="login-container">
    <div class="bg-container"></div>
    <div class="display">
      <div @click="changeCount" class="title">医院智能标签系统</div>
      <img class="logo" src="./imgs/logo.png" alt="上海第六人民医院金山分院金山区中心医院">
      <div class="hospital-name">{{getCount}}上海第六人民医院金山分院金山区中心医院</div>
    </div>
    <div class="login-wrap">
      <div class="account-wrap">
        <input class="account" type="text" placeholder="请输入账号">
        <img class="account-img" src="./imgs/account.png" alt="账号">
      </div>
      <div class="password-wrap">
        <input class="password" type="password" placeholder="请输入密码">
        <img class="password-img" src="./imgs/password.png" alt="密码">
      </div>
      <div @click="login" class="submit">登录</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions,mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters([
        'getCount'
      ])
    },
    methods:{
      login(){
      	this.$router.push({
          name:'hospital'
      	})
      },
      ...mapActions([
        'changeCount'
      ])
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .login-container{
    width: 100%;
    min-height: 100vh;
    background-color:#f6f8fc;
    .bg-container{
      width: 100%;
      min-width: 1150px;
      height: 294px;
      overflow: hidden;
      background-image: url(imgs/bg.png);
      background-size: 1024px 294px;
    }
    .display{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 294px;
      min-width: 1150px;
      .title{
        font-size: 18px;
        color: #c5dbf1;
        margin-left: 34px;
        margin-top: 21px;
      }
      .logo{
        display: block;
        width: 70px;
        height: 70px;
        margin: 52px auto 0px auto;
      }
      .hospital-name{
        width: 260px;
        font-size: 18px;
        color: #fff;
        font-weight: bold;
        text-align: center;
        margin: 14px auto 0px auto;
      }
    }
    ::-webkit-input-placeholder {
      color:#cccccc
    }
    .login-wrap{
      width: 100%;
      min-width: 1150px;
      .account-wrap{
        width: 271px;
        position: relative;
        margin: 50px auto 0px auto;
        height: 29px;
        font-size: 14px;
        border-radius: 6px;
        .account{
          width: 271px;
          display: block;
          padding-left: 28px;
          box-sizing: border-box;
          height: 29px;
          border-radius: 6px;
          outline: none;
          border: 1px solid #e5e5e5;
          &:focus{
            border: 1px solid #157df2;
          }
        }
        .account-img{
          width: 12px;
          height: 14px;
          position: absolute;
          top: 7px;
          left: 9px;
        }
      }
      .password-wrap{
        width: 271px;
        position: relative;
        margin: 12px auto 0px auto;
        height: 29px;
        font-size: 14px;
        border-radius: 6px;
        .password{
          width: 271px;
          display: block;
          padding-left: 28px;
          box-sizing: border-box;
          height: 29px;
          border-radius: 6px;
          outline: none;
          border: 1px solid #e5e5e5;
          &:focus{
            border: 1px solid #157df2;
          }
        }
        .password-img{
          width: 12px;
          height: 14px;
          position: absolute;
          top: 7px;
          left: 9px;
        }
      }
      .submit{
        width: 275px;
        height: 31px;
        background-color: #157df2;
        margin: 19px auto 0px auto;
        font-size: 14px;
        line-height: 31px;
        text-align: center;
        color: #fff;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
</style>
