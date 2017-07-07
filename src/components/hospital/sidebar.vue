<template>
  <div class="side-bar-container">
    <ul class="lists">
      <list v-for="(item,index) in list"
            @click.native="show(index,item)"
            :key="`${item.name}${index}`"
            :item="item"
            :uniqueId="uniqueId"
            @changeUniqueId="changeUniqueId"
            :is-show="isShowList[index]">
      </list>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './list'
  import comment from './imgs/comment.png'
  import questionnaire from './imgs/questionnaire.png'
  import hospital from './imgs/hospital.png'
  export default {
    data(){
    	return{
    		list:[
          {
            name:'评论',
            url:comment,
            children:[
              {
              	name:'评论统计',
                routeName:'commentstat'
              },
              {
                name:'评论详情',
                routeName:'commentdetail'
              }
            ]
          },
          {
            name:'问卷',
            url:questionnaire,
            children:[
              {
                name:'问卷统计',
                routeName:'questionnairestat'
              },
              {
                name:'问卷详情',
                routeName:'questionnairedetail'
              }
            ]
          },
          {
            name:'医院信息',
            routeName:'detail',
            url:hospital,
            children:[]
          }
        ],
        isShowList:[],
        uniqueId:'',
        indexObj:{},
      }
    },
    created(){
      this.uniqueId = this.$route.name
      this.initIndexObj(this.list)
      console.log(this.indexObj)
      const index = this.indexObj[this.uniqueId]
      const list = new Array(this.list.length).fill(false)
      list[index] = true
      this.isShowList = list
    },
    components:{
      List
    },
    methods:{
      show(index,{routeName}){
      	if(routeName){
      		this.$router.push(routeName)
          this.uniqueId=''
          return
        }
      	const arr = [...this.isShowList]
      	arr[index] =!arr[index]
        this.isShowList = arr
      },
      changeUniqueId(id){
        this.uniqueId = id
      },
      initIndexObj(list,index){
      	list.forEach((v,$index)=>{
      		Object.keys(v).forEach(key=>{
      			if(v[key] instanceof Array){
              this.initIndexObj(v[key],index == undefined?$index:index)
            }else{
              if(key == 'routeName'){
                this.indexObj[v[key]] = index == undefined?$index:index
              }
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .side-bar-container{
    float: left;
    width:175px;
    height:1000px;
    background-color: #1f2f55;
    font-weight: bold;
    .lists{
      overflow: hidden;
    }
  }
</style>
