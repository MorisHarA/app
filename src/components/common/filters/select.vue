<template>
  	<div class="template-select-container">
		<label class="title" for="select">{{state.title}}：</label>
		<Select
			class="filter-content"
			v-model="selected"
			style="width:200px"
			@on-change="checkdategenre">
  			<Option value="-1" key="-1">全部</Option>
	        <Option v-for="(item,index) in state.datalist" :value="item.id" :key="index">{{ item.text }}</Option>
	    </Select>
  	</div>
</template>

<script type="text/ecmascript-6">
  	export default {
  		data() {
  			return {
  				state: {
  					title: '科室',
  					datalist: [
						{
							text: '科室一',
							id: 1
						},
						{
							text: '科室二',
							id: 2
						},
						{
							text: '科室三',
							id: 3
						},
						{
							text: '科室四',
							id: 4
						}
  					]
  				},
  				selected: '-1'
  			}
  		},
        methods: {
            checkdategenre(val) {
                console.log(val)
            }
        }
  	}
</script>

<style scoped lang="less" rel="stylesheet/less">
  	.template-select-container{
  		margin-top: 20px;
  		.title {
  			font-size: 14px;
  			width: 75px;
  			display: inline-block;
  		}
  	}
</style>
