<template>
  <li class="tablelist">
    <div class="info" >
      <div class="switch" >{{isShow? '-': '+'}}</div>
      <div class="detail">
        {{item.position}}
      </div>
    </div>
    <ul class="lists" @click.stop.prevent v-if="isShow">
      <div class="cue">
        <div class="option">{{ isInput? '作答': '选项' }}</div>
        <div v-if="!isInput" class="respondence">作答</div>
      </div>
      <list
        :value="filterData"
        :qidInfo="item.qidInfo">
      </list>
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import List from './list';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isInput() {
      return this.filterData.type === 'text_input';
    },
    ...mapGetters('questionnairedetail', ['filterData']),
  },
  components: {
    List,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.tablelist {
  .info {
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #dcdcdc;
    cursor: pointer;
    .switch {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid #e9e9e9;
      position: relative;
      left: 15px;
      top: -2px;
      line-height: 13px;
      text-align: center;
    }
    .detail {
      color: #252834;
      display: inline-block;
      font-size: 15px;
      margin-left: 28px;
    }
  }
  .lists {
    border-bottom: 1px solid #dcdcdc;
    .cue {
      height: 35px;
      font-size: 14px;
      line-height: 35px;
      background-color: #fafafa;
      .option {
        display: inline-block;
        margin-left: 40px;
      }
      .respondence {
        float: right;
        margin-right: 25.8%;
      }
    }
  }
}
</style>
