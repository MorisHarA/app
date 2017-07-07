<template>
  	<div class="template-filters-container">
  		<div class="template-header">
  			<div class="title">评论详情</div>
  			<div class="right">
  				<div class="date-select-simple">
					<Button-group>
				        <Button type="ghost">今天</Button>
				        <Button type="ghost">昨天</Button>
				        <Button type="ghost">近7天</Button>
				        <Button type="ghost">近一月</Button>
				    </Button-group>
				</div>
				<div class="export-filter-data">
			        <Button>导出筛选数据</Button>
				</div>
				<div class="high-level-filter" @click="filterdetails = !filterdetails">高级筛选</div>
  			</div>
  		</div>
  		<div class="overview">
            <div class="simple" v-show="!filterdetails">
                筛选条件：
                <span class="text">
                    2017-01-01 ~ 2017-2017-02-01 / 全部管理区域 / 全部科室 / 全部病区范围 / 全部专属范围
                </span>
            </div>
            <div class="complex" v-show="filterdetails">
                <div class="composite">
                    <daters></daters>
                    <checkbox></checkbox>
                    <selector></selector>
                </div>
                <div class="footer">
                    <Button class="set" type="primary">生成</Button>
                    <Button class="reset" type="ghost">重置</Button>
                </div>
            </div>
  		</div>
  	</div>
</template>

<script type="text/ecmascript-6">
    import daters from './date'
    import checkbox from './checkbox'
    import selector from './select'

  	export default {
        data() {
            return {
                filterdetails: true
            }
        },
        components: {
            daters,
            checkbox,
            selector
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  	.template-filters-container{
  		font-size: 14px;
    	.template-header {
    		position: relative;
    		padding: 15px 25px;
    		border-bottom: 1px solid #e9eaec;
    		.title {
    			font-weight: bold;
    			display: inline-block;
    			font-size: 16px;
    		}
    		.right {
    			position: absolute;
    			right: 25px;
    			top: 11px;
    			.date-select-simple,.export-filter-data,.high-level-filter {
					display: inline-block;
    			}
    		}
    	}
    	.overview {
    		font-size: 13px;
    		background: #fafafa;
    		box-shadow: 0px 1px 3px 0px #ddd;
            position: relative;
    		.simple {
                padding: 10px 25px;
    		}
            .complex {
                .composite {
                    background: #fff;
                    padding: 20px 25px;
                }
                .footer {
                    padding: 10px 25px 10px;
                    border-top: 1px solid #e9eaec;
                    .set,.reset {
                        margin-right: 15px;
                        font-weight: bold;
                    }
                }
            }
    	}
  	}
</style>
