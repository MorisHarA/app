<template>
  <div class="questionnairedetail-container">
    <slot></slot>
    <v-filter
      :filters="filters"
      :options="filtersOptions"
      :triggerHandler="triggerHandler">
    </v-filter>
    <div class="questionnaire-conatiner">
      <div class="container">
        <div class="title">问卷</div>
        <div class="questionnaire-wrap" v-if="list && list.length">
          <div class="total-count">问卷总数：{{ totalCount }}条</div>
          <div class="desc">
            <div class="name">问卷名称</div>
            <div class="empty1"></div>
            <div class="empty2"></div>
            <div class="count-name">数量</div>
          </div>
          <ul class="table-lists">
            <table-list
              @click.native="toggle(index)"
              v-for="(item,index) in list"
              :key="`${item.name}${index}`"
              :item="item"
              :index="index"
              :isLast="index == list.length - 1"
              :isShow="toggleList[index]"
            ></table-list>
          </ul>
        </div>
        <no-data
          v-if="!list.length && !loading"
          txt="暂无问卷"
        >
        </no-data>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import Filter from 'components/common/filters/main';
import NoData from 'components/common/nodata/main';
import { mapActions, mapGetters } from 'vuex';
import { filterMixin } from 'components/common/mixin';
import TableList from './tablelist';

export default {
  mixins: [filterMixin],
  data() {
    return {
      toggleList: [],
      filters: {
        datetype: 1,
        starttime: '',
        endtime: '',
        area: -1,
        divisions: -1,
        regions: -1,
        exclusive: -1,
      },
      filtersOptions: {
        checkbox: ['area'],
        select: ['divisions', 'regions', 'exclusive'],
      },
    };
  },
  components: {
    TableList,
    VFilter: Filter,
    NoData,
  },
  computed: {
    ...mapGetters('questionnairedetail', ['totalCount', 'list', 'loading']),
  },
  methods: {
    toggle(index) {
      const arr = [...this.toggleList];
      arr[index] = !arr[index];
      this.toggleList = arr;
    },
    triggerHandler(args) {
      this.toggleList = [];
      const payload = this.formatFilterForRest(args);
      this.fetchQuesList(payload);
    },
    ...mapActions('questionnairedetail', ['fetchQuesList']),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.questionnairedetail-container {
  background-color: #f2f2f2;
  .questionnaire-conatiner {
    color: #252834;
    padding: 19px 22px 100px 22px;
    .container {
      border-top: 1px solid #e5e5e5;
      border-radius: 3px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      .title {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 16px;
        padding-left: 16px;
        box-sizing: border-box;
      }
      .questionnaire-wrap {
        padding: 0px 13px 0px 13px;
        background-color: #fff;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        .total-count {
          height: 55px;
          padding-left: 4px;
          box-sizing: border-box;
          line-height: 55px;
          font-size: 16px;
        }
        .desc {
          height: 35px;
          line-height: 35px;
          font-size: 15px;
          background-color: #f6f6f6;
          .name {
            display: inline-block;
            margin-left: 14px;
          }
          .count-name {
            width: 40px;
            float: right;
            margin-right: 7.5%;
          }
          .empty2 {
            float: right;
            width: 70px;
            height: 35px;
            margin-right: 7.5%;
          }
          .empty1 {
            float: right;
            width: 58px;
            height: 32px;
            margin-right: 30px;
          }
        }
      }
    }
  }
}
</style>
