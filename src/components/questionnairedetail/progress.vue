<template>
  <div class="progress-container">
    <div class="bg"></div>
    <div
      class="v-progress"
      :style="{
        backgroundColor: bgColor,
        width: `${width > 10 ? width : 10}px`,
        left: `${width > 10 ? 0 : width - 10}px`
      }"
    >
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    percent: {
      type: Number | String,
      default: 0,
    },
    limit: {
      type: Number | String,
    },
  },
  computed: {
    width() {
      return ((+this.percent).toFixed(2) * 165).toFixed(0);
    },
    bgColor() {
      if ((+this.percent).toFixed(2) * 100 > +this.limit) {
        return '#7bc354';
      }
      return '#0a93ed';
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.progress-container {
  display: inline-block;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  .bg {
    width: 165px;
    height: 10px;
    border-radius: 5px;
    background-color: #e5e5e5;
  }
  .v-progress {
    height: 10px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 5px;
  }
}
</style>
