<template>
  <div class="nodata">
    <img src="./imgs/nodata.png" >
    <div class="txt">{{ txt }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'nodata',
  props: {
    txt: {
      type: String,
      default: '暂无数据',
    },
  },
};
</script>

<style lang="less" scoped>
.nodata {
  text-align: center;
  font-size: 15px;
  color: #656a71;
  padding: 23px 0px 65px 0px;
  img {
    width: 116px;
  }
}
</style>




