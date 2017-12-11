<template>
  <div class="template-checkbox-container">
    <label class="title">{{args.title}}：</label>
    <div class="checkbtn filter-content">
      <Button-group>
        <Button
          :key="-1"
          :type="params == -1 ? 'primary' : 'ghost'"
          @click="checkdategenre(-1)">
            全部
        </Button>
        <Button
          v-for="(btn,index) in args.list"
          :key="index"
          :type="btn.id == params ? 'primary' : 'ghost'"
          @click="checkdategenre(btn.id)">
          {{btn.name}}
        </Button>
      </Button-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['args', 'params', 'changeSelectInfo'],
  methods: {
    checkdategenre(index) {
      const code = this.args.code;
      this.changeSelectInfo(index, code);
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.template-checkbox-container {
  margin-top: 20px;
  .title {
    font-size: 14px;
    width: 75px;
    display: inline-block;
  }
  .checkbtn {
    display: inline-block;
  }
}
</style>
