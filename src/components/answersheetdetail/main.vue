<template>
  <div class="answersheetdetail-container">
    <slot></slot>
    <div class="title">答卷详情</div>
    <div class="detail-conatiner">
      <div class="category">
        <span @click="handleGoback">
          问卷详情&nbsp;&nbsp;>
        </span>&nbsp;答卷详情
      </div>
      <div class="answersheet">
        <div class="name">
          <span class="txt">{{ $route.query.qname }}</span>
          <span class="tips" @click="handleClick">导出</span>
          <img
            class="download"
            @click="handleClick"
            src="./imgs/download.png"
          >
        </div>
        <div class="content">
          <div class="subject">
            <div class="sub">{{ title.ques }}</div>
            <div class="answer">{{ title.ans }}</div>
          </div>
          <div class="detail">详情</div>
          <div v-if="ansList && ansList.length">
            <ul>
              <table-list
                v-for="(item,index) in ansList"
                :key="index"
                @click.native="toggle(index)"
                :item="item"
                :isShow="toggleList[index]"
              >
              </table-list>
            </ul>
            <v-page
              @on-change="handlePageChange"
              class="page"
              :page-size="pageSize"
              :total="allCount"
              show-elevator>
            </v-page>
          </div>
        </div>
        <no-data
          v-if="!ansList.length"
          txt="暂无数据"
        >
        </no-data>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Page from 'iview/src/components/page/page';
import { mapActions, mapGetters } from 'vuex';
import { filterMixin } from 'components/common/mixin';
import NoData from 'components/common/nodata/main';
import TableList from './tablelist';

export default {
  name: 'answersheetdetail',
  mixins: [filterMixin],
  data() {
    return {
      toggleList: [],
      title: {},
      qidInfo: {},
      page: 1,
      pageSize: 15,
    };
  },
  created() {
    const { qnid, ...rest } = this.$route.query;
    this.payload = this.formatFilterForRest(rest);
    this.qnid = qnid;
    this.fetchAll();
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
    cacheQidInfo({ answers, id }) {
      answers.forEach((ans) => {
        let index;
        if (ans.option) {
          index = [ans.option.index];
        } else if (ans.options) {
          index = ans.options.map(o => o.index);
        }
        this.qidInfo = {
          ...this.qidInfo,
          [id]: {
            ...this.qidInfo[id],
            [ans.question.qid]: { index, text: ans.text },
          },
        };
        if (ans.option && ans.option.subitems) {
          this.cacheQidInfo({ answers: ans.option.subitems, id });
        }
        if (ans.options) {
          ans.options.forEach((opt) => {
            if (opt.subitems) this.cacheQidInfo({ answers: opt.subitems, id });
          });
        }
      });
    },
    toggle(index) {
      const arr = [...this.toggleList];
      arr[index] = !arr[index];
      this.toggleList = arr;
    },
    handlePageChange(page) {
      this.page = page;
      this.toggleList = [];
    },
    async fetchAll() {
      const { index } = this.$route.query;
      await this.fetchAllData({
        questionnaireId: this.qnid,
        ...this.payload,
      });
      this.allList.forEach((list) => {
        this.cacheQidInfo(list);
      });
      await this.formatListByQid(this.payload);
      const title = {
        ques: this.filterData.text,
        ans: index == -1 ? '详见回复内容' : this.filterData.options[index].text,
      };
      this.title = title;
      const filterAllList = this.allList
        .filter((list) => {
          const qidInfo = this.qidInfo[list.id][this.filterData.qid];
          if (
            qidInfo &&
            ((qidInfo.index && qidInfo.index.indexOf(+index) > -1) ||
              qidInfo.text)
          ) {
            return true;
          }
          return false;
        })
        .map(list => ({
          ...list,
          qidInfo: this.qidInfo[list.id],
        }));
      this.setFilterAllList(filterAllList);
    },
    handleClick() {
      const { qnid, _qid, type, index } = this.$route.query;
      const qidList = _qid.split('_');
      this.exportAnswerDetail({
        qnid: +qnid,
        qid: qidList[qidList.length - 1],
        optionIndex: +index,
        qtype: type,
        ...this.payload,
      });
    },
    handleGoback() {
      this.$router.go(-1);
    },
    ...mapActions('answersheetdetail', [
      'fetchData',
      'fetchAllData',
      'exportAnswerDetail',
      'setFilterAllList',
      'clear',
    ]),
    ...mapActions('questionnairedetail', ['formatListByQid']),
  },
  computed: {
    ansList() {
      const start = this.pageSize * (this.page - 1);
      const limit = this.pageSize * this.page;
      return this.filterAllList.slice(start, limit);
    },
    ...mapGetters('answersheetdetail', [
      'allCount',
      'allList',
      'filterAllList',
    ]),
    ...mapGetters('questionnairedetail', ['filterData']),
  },
  components: {
    TableList,
    VPage: Page,
    NoData,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.answersheetdetail-container {
  min-height: 100vh;
  background-color: #f2f2f2;
  .title {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: bold;
    padding-left: 20px;
    color: #252834;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
  }
  .detail-conatiner {
    padding: 0px 21px 29px 21px;
    background-color: #f2f2f2;
    .category {
      height: 42px;
      line-height: 42px;
      font-size: 12px;
      font-weight: bold;
      color: #252834;
      span {
        margin-left: 12px;
        font-weight: normal;
        color: #828282;
        cursor: pointer;
      }
    }
    .answersheet {
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      border-radius: 4px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .name {
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        border-bottom: 1px solid #e5e5e5;
        color: #252834;
        .txt {
          margin-left: 15px;
        }
        .tips {
          float: right;
          margin-right: 12px;
          font-size: 12px;
          cursor: pointer;
        }
        .download {
          width: 16px;
          height: 13px;
          float: right;
          margin-right: 8px;
          margin-top: 10px;
          cursor: pointer;
        }
      }
      .content {
        overflow: hidden;
        padding: 0px 13px 0px 13px;
        .subject {
          padding: 24px 0px 24px 2px;
          font-size: 15px;
          font-weight: bold;
          overflow: hidden;
          color: #252834;
          .sub {
            display: inline-block;
            max-width: 360px;
          }
          .answer {
            max-width: 360px;
            float: right;
            margin-right: 32px;
            color: #0993ed;
          }
        }
        .detail {
          height: 35px;
          font-size: 15px;
          line-height: 35px;
          background-color: #f6f6f6;
          padding-left: 13px;
        }
        .page {
          margin-top: 29px;
          margin-bottom: 29px;
          float: right;
        }
      }
    }
  }
}
</style>
