<template>
	<div class="template-select-container">
		<label class="title">{{args.title}}：</label>
		<Select
			v-model="param"
			style="width:200px;"
			@on-change="changeselectinfo">
			<Option :value="-1" key="-1">全部</Option>
			<Option
				v-for="(item,index) in args.list"
				:value="item.id"
				:key="index">
				{{ item.name }}
			</Option>
		</Select>
	</div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ['args', 'value', 'changeSelectInfo'],
  computed: {
    param: {
      // console.log(this.args)
      get() {
        return Number(this.value);
      },
      // setter
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    changeselectinfo(value) {
      const { args } = this;

      const code = args.code;

      this.changeSelectInfo(value, code);
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.template-select-container {
  margin-top: 20px;
  .title {
    font-size: 14px;
    width: 75px;
    display: inline-block;
  }
}
</style>
