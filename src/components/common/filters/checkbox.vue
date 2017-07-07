<template>
  	<div class="template-checkbox-container">
  		<label class="title" for="check">{{state.title}}：</label>
  		<div class="checkbtn filter-content">
  			<Button-group>
                <Button
                	v-for="(btn,index) in state.areas"
                	:key="index"
                    :type="btn.status ? 'primary' : 'ghost'"
                    @click="checkdategenre(index)">
                    {{btn.text}}
                </Button>
            </Button-group>
  		</div>
  	</div>
</template>

<script type="text/ecmascript-6">
  	export default {
  		data() {
  			return {
  				state: {
  					title: '管理区域',
	  				areas: [
						{
							text: '全部',
							status: true,
							id: 1
						},
						{
							text: '病床',
							status: false,
							id: 2
						},
						{
							text: '诊室',
							status: false,
							id: 3
						},
						{
							text: '服务窗口',
							status: false,
							id: 4
						},
						{
							text: '公共设施',
							status: false,
							id: 5
						}
	  				]
  				}
  			}
  		},
  		methods: {
            checkdategenre(index) {
                const list = this.state.areas

                list.map((l,n) => {
					if(n === index){
						l.status = true
					}else{
						l.status = false
					}
                })

                this.state.areas = list
            }
        }
  	}
</script>

<style scoped lang="less" rel="stylesheet/less">
  	.template-checkbox-container{
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
