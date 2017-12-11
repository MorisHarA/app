<template>
  <div class="side-bar-container">
    <ul class="lists">
      <list
        v-for="(item,index) in routeConfWithAuthority"
        :key="`${item.name}${index}`"
        :item="item"
      >
      </list>
    </ul>
    <div class="copyright" @click="switchTo">
      崇杏健康 版权所有 ©2017
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import List from './list';

export default {
  components: {
    List,
  },
  computed: {
    ...mapGetters('hospital', ['routeConfWithAuthority']),
  },
  methods: {
    switchTo() {
      window.location.href = 'https://www.highwho.com';
    },
  },
  beforeDestroy() {
    this.$store.commit('login/CLEAR_AUTH_LIST');
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.side-bar-container {
  position: fixed;
  top: 60px;
  left: 0px;
  width: 175px;
  height: 100%;
  background-color: #1f2f55;
  z-index: 99;
  font-weight: bold;
  .lists {
    overflow: hidden;
  }
  .copyright {
    position: fixed;
    bottom: 15px;
    left: 8px;
    color: #999;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
</style>
