<template>
  	<div class="review-detail-container">
    	<filters></filters>
  	</div>
</template>

<script type="text/ecmascript-6">
	import filters from '../common/filters/main'

  	export default {
		components: {
            filters
        },
        data() {
            return {
                pageName: "新的朋友"
            }
        }
  	}
</script>

<style scoped lang="less" rel="stylesheet/less">
  	.review-detail-container{
    	
  	}
</style>