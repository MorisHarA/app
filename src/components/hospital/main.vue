<template>
  <div class="hospital-container">
    <div class="title">
      <img class="logo" :src="hospital.logo">
      <div class="name">{{ hospital.name }}</div>
      <div class="user">当前用户：
        <drop-down class="dropdown" trigger="click">
          <a href="javascript:void(0)">
            {{ userinfo.compellation == ''? '匿名用户': userinfo.compellation }}
            <icon type="arrow-down-b"></icon>
          </a>
          <drop-down-menu slot="list">
            <drop-down-item @click.native="routerToModifyPassword">修改密码</drop-down-item>
            <drop-down-item @click.native="loginOut">注销</drop-down-item>
          </drop-down-menu>
        </drop-down>
      </div>
    </div>
    <side-bar ref="sidebar"></side-bar>
    <keep-alive :exclude="excludeComponents">
      <router-view class="view">
        <div class="cover-layer" v-if="loading">
          <Spin v-show="!isIe9" size="large"></Spin>
        </div>
      </router-view>
    </keep-alive>
    <back-top
      :duration="600"
      :bottom="100"
      :right="20"
      :height="300"
    ></back-top>
  </div>
</template>

<script type="text/ecmascript-6">
import { loadingMixin } from 'components/common/mixin';
import DropDown from 'iview/src/components/dropdown/dropdown';
import DropDownItem from 'iview/src/components/dropdown/dropdown-item';
import DropDownMenu from 'iview/src/components/dropdown/dropdown-menu';
import BackTop from 'iview/src/components/back-top/back-top';
import Icon from 'iview/src/components/icon/icon';
import { mapActions, mapGetters } from 'vuex';
import Auth from 'authorize';
import SideBar from './sidebar';


export default {
  mixins: [loadingMixin],
  data() {
    return {
      excludeComponents: ['answersheetdetail', 'addmember'],
    };
  },
  created() {
    this.getUserInfo();
    this.fetchhospitalDetail();
  },
  components: {
    SideBar,
    DropDown,
    DropDownItem,
    DropDownMenu,
    BackTop,
    Icon,
  },
  computed: {
    isIe9() {
      return window.version.startsWith('IE9');
    },
    ...mapGetters('login', ['userinfo']),
    ...mapGetters('hospitaldetail', ['hospital']),
  },
  methods: {
    routerToModifyPassword() {
      this.$router.push({
        name: 'modifypassword',
      });
    },
    loginOut() {
      Auth.clearAuthorized();
    },
    ...mapActions('login', ['getUserInfo']),
    ...mapActions('hospitaldetail', ['fetchhospitalDetail']),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.hospital-container {
  .title {
    width: 100%;
    min-width: 1150px;
    height: 60px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    position: fixed;
    z-index: 999;
    background-color: #fff;
    top: 0;
    .logo {
      margin-left: 23px;
      margin-top: 10px;
      width: 40px;
      height: 40px;
    }
    .name {
      font-size: 18px;
      margin-left: 77px;
      margin-top: -40px;
      color: #000;
    }
    .user {
      font-size: 14px;
      color: #37474f;
      text-align: right;
      margin-top: -22px;
      margin-right: 37px;
      span {
        cursor: pointer;
      }
      .dropdown {
        text-align: center;
      }
    }
  }
  .view {
    margin-left: 175px;
    min-width: 975px;
    min-height: 100vh;
    margin-top: 60px;
    position: relative;
    .cover-layer {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      .ivu-spin.ivu-spin-large {
        position: absolute;
        display: inline-block;
        left: 50%;
        margin-left: -16px;
        top: 20%;
      }
    }
  }
}
</style>
