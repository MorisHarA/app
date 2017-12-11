<template>
  	<div class="review-total-container">
      <slot></slot>
    	<filters :filters="filters" :triggerHandler="triggerHandler" :options="filtersOptions"></filters>
        <div class="review-total-wrap">
            <div class="total-pannel">
                <div class="item blue">
                    <img class="icon" src="./images/space.png">
                    <div class="wrap">
                        <div class="text">好评率</div>
                        <div class="count">{{showRate.goodRate}}<span class="unit">%</span></div>
                    </div>
                </div>
                <div class="item green">
                    <img class="icon" src="./images/weixin.png">
                    <div class="wrap">
                        <div class="text">评论数</div>
                        <div class="count">{{showRate.count}}<span class="unit">份</span></div>
                    </div>
                </div>
                <div class="item grey">
                    <img class="icon" src="./images/message.png">
                    <div class="wrap">
                        <div class="text">评论推送数</div>
                        <div class="count">{{showRate.bad_count}}<span class="unit">份</span></div>
                    </div>
                </div>
                <div class="item white">
                    <img class="icon" src="./images/listen.png">
                    <div class="wrap">
                        <div class="text">处理率</div>
                        <div class="count">{{showRate.disposeRate}}<span class="unit">%</span></div>
                    </div>
                </div>
            </div>
            <div class="chart-group">
                <div class="chart">
                    <div class="title">
                        评论分析
                    </div>
                    <div class="under-header">
                        <div class="legend">
                            <ul v-show="charttype === 1" class="sum">
                                <li>评论总数</li>
                                <li>4-5星</li>
                                <li>3星</li>
                                <li>1-2星</li>
                            </ul>
                            <ul v-show="charttype === 2" class="push">
                                <li>评论推送</li>
                                <li>已处理</li>
                            </ul>
                        </div>
                        <div class="btn-group">
                            <Button-group>
                                <Button
                                    :type="charttype === 1 ? 'primary' : 'ghost'"
                                    @click="checkTopChart(1)">
                                    评论详情
                                </Button>
                                <Button
                                    :type="charttype === 2 ? 'primary' : 'ghost'"
                                    @click="checkTopChart(2)">
                                    处理详情
                                </Button>
                            </Button-group>
                        </div>

                    </div>
                    <fusionChart
                        v-if="charttype === 1"
                        :key="motionkey + 'fusion'"
                        color="#4cc1cd"
                        height="365"
                        :filters="filters"
                        :data="selectChartData">
                    </fusionChart>
                    <stackColumnChart
                        v-if="charttype === 2"
                        :key="piekey + 'columns'"
                        color="#4cc1cd"
                        height="365"
                        :filters="filters"
                        :data="selectChartData">
                    </stackColumnChart>
                    <div class="table">
                        <Table
                            v-if="charttype === 1 && selectChartData && selectChartData.length > 0"
                            stripe
                            :columns="columns2"
                            :data="detailTableModalData"
                            >
                        </Table>
                        <Table
                            v-if="charttype === 2"
                            stripe
                            :columns="columns1"
                            :data="tableModalData">
                        </Table>
                    </div>
                </div>
                <div class="chart">
                    <div class="title">
                        得分趋势
                    </div>
                    <divergingStackedBarChart
                        :key="motionkey + 'stacked'"
                        color="#4cc1cd"
                        height="365"
                        :filters="filters"
                        :data="selectChartData">
                    </divergingStackedBarChart>
                </div>
                <div class="chart">
                    <div class="title">
                        处理率分析
                    </div>
                    <pieChart
                        :key="piekey + 'pie'"
                        color="#4cc1cd"
                        height="365"
                        :filters="filters"
                        :data="selectChartData">
                    </pieChart>
                </div>
            </div>
        </div>
  	</div>
</template>

<script type="text/ecmascript-6">

import { mapActions, mapState } from 'vuex';
import format from 'utils/format';
import { filterMixin } from 'components/common/mixin';
import fusionChart from './fusionChart';
import pieChart from './pieChart';
import divergingStackedBarChart from './divergingStackedBarChart';
import stackColumnChart from './stackColumnChart';
import filters from '../common/filters/main';

export default {
  mixins: [filterMixin],
  components: {
    filters,
    fusionChart,
    pieChart,
    divergingStackedBarChart,
    stackColumnChart,
  },
  data() {
    return {
      filters: {
        datetype: 1, // 1.日 2.月 3.年
        starttime: '',
        endtime: '',
        area: -1,
        divisions: -1,
        regions: -1,
        exclusive: -1,
        review: -1,
        level: -1,
      },
      filtersOptions: {
        checkbox: ['area'],
        select: ['divisions', 'regions', 'exclusive'],
      },
      charttype: 1, // 1 push 2 sum
      columns1: [
        {
          title: '对象',
          key: 'name',
        },
        {
          title: '推送总数',
          key: 'bad_count',
        },
        {
          title: '已处理',
          key: 'dispose',
        },
      ],
      columns2: [
        {
          title: '对象',
          key: 'name',
        },
        {
          title: '总数',
          key: 'total',
        },
        {
          title: '4-5星',
          key: 'star_45',
        },
        {
          title: '3星',
          key: 'star_3',
        },
        {
          title: '1-2星',
          key: 'star_12',
        },
      ],
      motionkey: '',
      piekey: '',
    };
  },
  activated() {
    this.motionkey = Date.now();
    this.piekey = Date.now();
  },
  computed: {
    ...mapState('filters', ['divisions', 'area', 'regions']),
    ...mapState('commentstat', [
      'consulting_room_stat',
      'facility_stat',
      'sickbed_stat',
      'wicket_stat',
      'all_stat',
    ]),
    selectChartData() {
      const { area } = this.$route.query;
      if (area > 0) {
        const choose = this.area.list.filter(a => a.id == area);
        return this[`${choose[0].class}_stat`];
      }
      return this.all_stat;
    },
    showRate() {
      let good_count = 0;
      let count = 0;
      let dispose = 0;
      let bad_count = 0;

      if (this.selectChartData) {
        this.selectChartData.map((val) => {
          good_count += val.good_count;
          count += val.count;
          dispose += val.dispose.count;
          bad_count += val.bad_count;
        });
      }

      return {
        goodRate: format.mathToRate(good_count, count),
        disposeRate: format.mathToRate(dispose, bad_count),
        count: format.countToFixed(count),
        bad_count: format.countToFixed(bad_count),
      };
    },
    tableModalData() {
      const { area } = this.$route.query;
      const result = [];
      const template = [
        {
          name: '病床',
          code: 'sickbed',
          bad_count: 0,
          dispose: 0,
          id: 1,
        },
        {
          name: '诊室',
          code: 'consulting_room',
          bad_count: 0,
          dispose: 0,
          id: 2,
        },
        {
          name: '服务窗口',
          code: 'wicket',
          bad_count: 0,
          dispose: 0,
          id: 3,
        },
        {
          name: '公共设施',
          code: 'facility',
          bad_count: 0,
          dispose: 0,
          id: 4,
        },
      ];

      template.map((type, index) => {
        if (area > 0 && area != type.id) return;

        if (this[`${type.code}_stat`]) {
          this[`${type.code}_stat`].map((stat) => {
            type.bad_count += stat.bad_count;
            type.dispose += stat.dispose.count;
          });
          result.push(type);
        }
      });

      return result;
    },
    detailTableModalData() {
      const { area } = this.$route.query;
      const result = [];
      const template = [
        {
          name: '病床',
          code: 'sickbed',
          id: 1,
          total: 0,
          star_45: 0,
          star_3: 0,
          star_12: 0,
        },
        {
          name: '诊室',
          code: 'consulting_room',
          id: 2,
          total: 0,
          star_45: 0,
          star_3: 0,
          star_12: 0,
        },
        {
          name: '服务窗口',
          code: 'wicket',
          id: 3,
          total: 0,
          star_45: 0,
          star_3: 0,
          star_12: 0,
        },
        {
          name: '公共设施',
          code: 'facility',
          id: 4,
          total: 0,
          star_45: 0,
          star_3: 0,
          star_12: 0,
        },
      ];
      template.map((m, index) => {
        if (area > 0 && area != m.id) return;

        if (this[`${m.code}_stat`] && this[`${m.code}_stat`].length > 0) {
          let total = 0,
            star_45 = 0,
            star_3 = 0,
            star_12 = 0;
          this[`${m.code}_stat`].map((val) => {
            const ahead = val.points.filter(v => v.name === 'general');
            if (ahead.length > 0) {
              ahead[0].scores.map((s) => {
                total += s.count;
                if (s.score > 3) {
                  star_45 += s.count;
                } else if (s.score < 3 && s.score > 0) {
                  star_12 += s.count;
                } else if (s.score == 3) {
                  star_3 += s.count;
                }
              });
            }
          });

          result.push({
            ...m,
            total,
            star_45,
            star_3,
            star_12,
          });
        }
      });
      return result;
    },
  },
  methods: {
    ...mapActions('commentstat', ['fetchCommentStatistics']),
    // 传入filters组件触发的Action
    triggerHandler(params) {
      const args = this.formatFilterForRest(params);
      this.fetchCommentStatistics(args);

      setTimeout(() => {
        this.piekey = Date.now();
      }, 1000);
    },
    checkTopChart(type) {
      const charttype = this.charttype;
      if (type === charttype) return;

      this.charttype = charttype === 1 ? 2 : 1;
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.review-total-container {
  position: relative;
  .review-total-wrap {
    position: absolute;
    top: 95px;
    left: 0;
    width: 100%;
    background: #f1f3f7;
    .total-pannel {
      display: inline-block;
      width: 100%;
      text-align: center;
      padding: 22px 22px 0;
      .item {
        display: inline-block;
        padding: 15px;
        height: 100px;
        min-width: 24.62%;
        float: left;
        vertical-align: top;
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
        text-align: left;
        box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.1);
        .icon {
          width: 50px;
          float: left;
          margin-top: 10px;
        }
        .wrap {
          margin-left: 65px;
          margin-top: 8px;
          .count {
            font-size: 30px;
            line-height: 26px;
            margin-top: 5px;
            .unit {
              font-size: 16px;
              line-height: 14px;
              margin-left: 2px;
            }
          }
        }
      }
      .item:not(:last-child) {
        margin-right: 0.5%;
      }
      .blue {
        background: #53acff;
      }
      .green {
        background: #38db74;
      }
      .grey {
        background: #5c6977;
      }
      .white {
        background: #fff;
        .wrap {
          .text {
            color: #828282;
          }
          .count {
            color: #0993ed;
          }
        }
      }
    }
    .chart-group {
      margin: 22px 22px 22px;
      .chart {
        border-radius: 5px;
        margin-top: 22px;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        .title {
          font-size: 16px;
          padding: 10px 15px;
          border-bottom: 1px solid #e5e5e5;
        }
        .table {
          padding: 15px 15px 30px;
        }
        .under-header {
          padding: 18px 30px;
          .legend {
            display: inline-block;
            padding: 6px 0;
            li {
              display: inline-block;
              font-size: 13px;
              margin-right: 24px;
            }
            li:before {
              content: "";
              width: 7px;
              height: 7px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 8px;
              vertical-align: middle;
              margin-top: -2px;
            }
            .sum {
              li:nth-child(1):before {
                background: #6893d7;
              }
              li:nth-child(2):before {
                background: #4cc1cd;
              }
              li:nth-child(3):before {
                background: #5ed7b1;
              }
              li:nth-child(4):before {
                background: #9fe797;
              }
            }
            .push {
              li:nth-child(1):before {
                background: #6890d4;
              }
              li:nth-child(2):before {
                background: #68d4b2;
              }
            }
          }
          .btn-group {
            float: right;
          }
        }
      }
    }
  }
}
</style>
