<template>
  <ul class="table">
    <li class="list" v-for="(item,index) in stat" :key="index">
      <div
        class="name"
        :style="{fontSize: index == 0? '15px': '14px'}"
      >
        {{item.name}}
      </div>
      <div
        class="count"
        :style="{
          fontSize: index == 0? '15px': '14px'
        }">
        {{ item.count }}
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    stat: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.table {
  padding: 0px 13px 13px 13px;
  .list {
    width: 100%;
    height: 43px;
    line-height: 43px;
    color: #252834;
    &:nth-of-type(odd) {
      background-color: #fafafa;
    }
    .name {
      display: inline-block;
      margin-left: 14px;
      font-size: 14px;
    }
    .count {
      width: 80px;
      font-size: 14px;
      float: right;
      margin-right: 48%;
      text-align: center;
    }
  }
}
</style>
