<template>
  <div class="hospital-container">
    <div class="title">
      <img class="logo" src="./imgs/logo.png" alt="上海市第六人民医院金山分院金山区中心医院">
      <div class="name" @click="asyncAddCount">上海市第六人民医院金山分院金山区中心医院</div>
      <div class="user">当前用户：<span @click="routerToModifyPassword" style="color: #0993ed">匿名用户</span></div>
    </div>
    <side-bar ref="sidebar"></side-bar>
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import SideBar from './sidebar'
  import {mapActions} from 'vuex'
  export default {
  	components:{
      SideBar
    },
    methods:{
      routerToModifyPassword(){
      	this.$refs.sidebar.uniqueId = ''
      	this.$router.push({
          name:'modifypassword',
        })
      },
      ...mapActions([
        'asyncAddCount'
      ])
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .hospital-container{
    .title{
      width: 100%;
      min-width: 1150px;
      height: 60px;
      box-shadow: 0px 3px 3px #e5e5e5;
      .logo{
        margin-left: 23px;
        margin-top: 10px;
        width:40px;
        height:40px;
      }
      .name{
        font-size: 18px;
        margin-left: 77px;
        margin-top: -40px;
        color: #000;
      }
      .user{
        font-size: 14px;
        color: #37474f;
        text-align: right;
        margin-top: -22px;
        margin-right: 37px;
        span{
          cursor: pointer;
        }
      }
    }
    .view{
      margin-left: 175px;
      min-width: 975px;
    }
  }
</style>
