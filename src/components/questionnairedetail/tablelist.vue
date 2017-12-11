<template>
  <li class="table-container">
    <div class="info" :style="{borderBottom: isLast && 0}">
      <div class="switch" >{{isShow? '-': '+'}}</div>
      <div class="name">{{item.name}}</div>
      <div class="empty1"></div>
      <div class="empty2"></div>
      <div class="count">{{item.sheetcount}}人</div>
    </div>
    <ul
      class="lists"
      @click.stop.prevent v-if="isShow"
      :style="{
        borderTop: isLast && '1px solid #dcdcdc',
        borderBottom: isLast && 0
      }"
    >
      <list
        v-for="(value,index) in item.questions"
        :value="value"
        :qid="value.qid"
        :type="value.type"
        $qid=""
        :total="item.sheetcount"
        :qnid="item.id"
        :name="item.name"
        :key="`${value.qid}${index}`">
      </list>
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
import List from './list';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
    },
  },
  components: {
    List,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.table-container {
  .info {
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #dcdcdc;
    cursor: pointer;
    .switch {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid #e9e9e9;
      position: relative;
      left: 15px;
      top: -2px;
      line-height: 13px;
      text-align: center;
    }
    .name {
      display: inline-block;
      font-size: 15px;
      font-weight: bold;
      margin-left: 28px;
    }
    .count {
      width: 40px;
      font-size: 14px;
      float: right;
      font-weight: bold;
      margin-right: 7.5%;
    }
    .empty2 {
      float: right;
      width: 70px;
      height: 49px;
      margin-right: 7.5%;
    }
    .empty1 {
      float: right;
      width: 58px;
      height: 32px;
      margin-right: 30px;
    }
  }
  .lists {
    border-bottom: 1px solid #dcdcdc;
  }
}
</style>
