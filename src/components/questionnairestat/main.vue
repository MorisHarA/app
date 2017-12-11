<template>
  <div class="questionnairestat-container">
    <slot></slot>
    <v-filter
      :filters="filters"
      :options="filtersOptions"
      :triggerHandler="triggerHandler">
    </v-filter>
    <div class="chart-container">
      <div class="dashboard">
        <div class="goodrate" v-if="false">
          <div class="auto">
            <img src="./imgs/goodrate.png" >
            <span class="txt">满意度</span>
            <span class="score">100<span>分</span></span>
          </div>
        </div>
        <div class="questionnaire-count">
          <div class="auto">
            <img src="./imgs/questionnairecount.png">
            <span class="txt">问卷数</span>
            <span class="score">{{totalCount | format}}<span>{{totalCount | isShowWan}}份</span>
            </span>
          </div>
        </div>
        <div class="questionnaire-push-count">
          <div class="auto">
            <img src="./imgs/pushcount.png">
            <span class="txt">问卷推送数</span>
            <span class="score">{{pushCount | format}}<span>{{pushCount | isShowWan}}份</span>
            </span>
          </div>
        </div>
      </div>
      <div class="analysis-conatiner">
        <div class="title">
          <div class="txt">问卷分析</div>
        </div>
        <div class="tab">
          <div class="dot"></div>
          <div class="kind">
            {{activeChart == 'detail'? '问卷数': '问卷推送数'}}
          </div>
          <v-button-group class="toggle">
            <v-button
              @click.native="clickbtn('detail')"
              :type="activeChart == 'detail'? 'primary': 'ghost'">
              问卷详情
            </v-button>
            <v-button
              @click.native="clickbtn('push')"
              :type="activeChart == 'push'? 'primary': 'ghost'">
              问卷推送
            </v-button>
          </v-button-group>
        </div>
        <div class="chart">
          <bar-chart
            :key="chartKey"
            height="365"
            :filters="filters"
            :data="activeChart == 'detail'? chartDataDetail: chartDataPush">
          </bar-chart>
        </div>
        <v-table
          v-if="stat.length > 1"
          :stat="activeChart == 'push'? sendStat: stat">
        </v-table>
      </div>
      <div class="degree-container" v-if="false">
        <div class="title">
          <div class="txt">满意度分析</div>
          <img class="download" src="./imgs/download.png" >
          <span class="download-txt">导出</span>
        </div>
        <div class="legend">
          <div class="dot"></div>
          <div class="kind">满意度</div>
        </div>
        <bar-chart
          color="#4cc1cd"
          height="365"
          :timeRange="timeRange"
          :data="chartDataDetail">
        </bar-chart>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Filter from 'components/common/filters/main';
import Button from 'iview/src/components/button/button';
import ButtonGroup from 'iview/src/components/button/button-group';
import Spin from 'iview/src/components/spin/spin';
import { filterMixin } from 'components/common/mixin';
import Table from './table';
import BarChart from './barchart';

export default {
  mixins: [filterMixin],
  data() {
    return {
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
      filter: {},
      activeChart: 'detail',
      chartKey: '',
    };
  },
  beforeDestroy() {
    this.clearChartData();
  },
  filters: {
    format(value) {
      if (value.toString().length >= 5) {
        return `${(+value / 10000).toFixed(3)}`;
      }
      return value;
    },
    isShowWan(value) {
      if (value.toString().length >= 5) {
        return '万';
      }
      return '';
    },
  },
  computed: {
    ...mapGetters('questionnairestat', [
      'chartDataDetail',
      'chartDataPush',
      'stat',
      'sendStat',
      'totalCount',
      'pushCount',
    ]),
  },
  activated() {
    this.chartKey = Date.now();
  },
  methods: {
    async triggerHandler(args) {
      const payload = this.formatFilterForRest(args);
      this.fetchQuesStat(payload);
      await this.fetchChartData(payload);
      this.chartKey = Date.now();
    },
    clickbtn(name) {
      if (this.activeChart == name) return;
      this.activeChart = name;
      this.chartKey = Date.now();
    },
    ...mapActions('questionnairestat', ['fetchChartData', 'fetchQuesStat']),
    ...mapMutations('questionnairestat', {
      clearChartData: 'CLEAR_CHARTDATA',
    }),
  },
  components: {
    BarChart,
    VFilter: Filter,
    VButton: Button,
    VButtonGroup: ButtonGroup,
    Spin,
    VTable: Table,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.questionnairestat-container {
  background-color: #f2f2f2;
  .chart-container {
    padding: 16px 22px 16px 22px;
    .dashboard {
      height: 100px;
      div {
        width: 49.7%;
        height: 100px;
        float: left;
        border-radius: 6px;
        font-size: 14px;
        color: #fff;
        position: relative;
        .auto {
          width: 220px;
          height: 100px;
          position: absolute;
          left: 6%;
          img {
            width: 49px;
            height: 49px;
            margin-top: 26px;
          }
          .txt {
            width: 110px;
            position: absolute;
            left: 72px;
            top: 24px;
          }
          .score {
            position: absolute;
            left: 70px;
            top: 42px;
            font-size: 30px;
            span {
              font-size: 16px;
              position: relative;
              top: -1px;
            }
          }
        }
      }
      .goodrate {
        background-color: #53acff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .questionnaire-count {
        background-color: #38db74;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .questionnaire-push-count {
        margin-left: 0.6%;
        background-color: #5c6977;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
    .analysis-conatiner {
      margin-top: 14px;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      border-radius: 4px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      .title {
        height: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-top: 4px;
        box-sizing: border-box;
        font-size: 16px;
        .txt {
          margin-left: 16px;
          display: inline-block;
        }
        .download-txt {
          float: right;
          margin-right: -48px;
          font-size: 12px;
          margin-top: 4px;
          cursor: pointer;
          &:hover {
            color: #0993e6;
          }
        }
        .download {
          width: 16px;
          height: 13px;
          float: right;
          margin-top: 6px;
          margin-right: 68px;
          cursor: pointer;
        }
      }
      .tab {
        height: 31px;
        margin-top: 16px;
        line-height: 29px;
        .dot {
          width: 7px;
          height: 7px;
          background-color: #61a8eb;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          margin-left: 24px;
        }
        .kind {
          font-size: 13px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 6px;
        }
        .toggle {
          cursor: pointer;
          float: right;
          margin-right: 21px;
          height: 28px;
        }
      }
      .chart {
        background-color: #fff;
        padding-bottom: 28px;
        border-radius: 4px;
      }
    }
    .degree-container {
      margin-top: 30px;
      height: 475px;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      border-radius: 4px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      .title {
        height: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-top: 4px;
        box-sizing: border-box;
        font-size: 16px;
        .txt {
          margin-left: 16px;
          display: inline-block;
        }
        .download-txt {
          float: right;
          margin-right: -48px;
          font-size: 12px;
          margin-top: 4px;
          cursor: pointer;
        }
        .download {
          width: 16px;
          height: 13px;
          float: right;
          margin-top: 6px;
          margin-right: 68px;
          cursor: pointer;
        }
      }
      .legend {
        height: 31px;
        margin-top: 16px;
        line-height: 29px;
        .dot {
          width: 7px;
          height: 7px;
          background-color: #4cc1cd;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          margin-left: 24px;
        }
        .kind {
          font-size: 13px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
