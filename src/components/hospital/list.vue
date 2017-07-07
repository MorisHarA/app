<template>
  <li class="list" :style="{paddingBottom:isShow?'0px':'14px'}">
    <img v-if="item.url" class="icon" :src="item.url" >
    <div v-if="!item.url" class="dot"></div>
    <div class="name">{{item.name}}</div>
    <ul v-show="isShow" v-if="item.children && item.children.length">
      <list @click.native.stop="activeRoute(value,index)"
            :class="['list-children',uniqueId == value.routeName?'active':'']"
            v-for="(value,index) in item.children"
            :key="`${value.name}${index}`"
            :item="value">
      </list>
    </ul>
  </li>
</template>


<script type="text/ecmascript-6">
  export default {
  	name:'list',
    props:{
      item: {
        type:Object,
        default(){
          return {}
        }
      },
      isShow:{
        type:Boolean
      },
      uniqueId:{
        type:String
      }
    },
    methods:{
      activeRoute({routeName}){
        this.$emit('changeUniqueId',routeName)
      	this.$router.push({name:routeName})
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .list {
    width: 175px;
    padding-top: 17px;
    cursor: pointer;
    color: #fff;
    .icon{
      width:22px;
      height:21px;
      margin-left: 18px;
      vertical-align: middle;
    }
    .dot{
      width:4px;
      height: 4px;
      border-radius: 50%;
      background-color: #fff;
      display: inline-block;
      vertical-align: middle;
      margin-left: 40px;
    }
    .name{
      font-size: 14px;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }
    &.list-children{
      width: 175px;
      height: 50px;
      padding-top: 0;
      line-height: 50px;
      &:first-child{
        margin-top: 14px;
      }
      &.active{
        background-color: #192547;
        color: #64b4ff;
        .dot{
          background-color: #64b4ff;
        }
      }
    }
  }
</style>
