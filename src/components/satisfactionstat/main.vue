<template>
  <div class="satisfactionstat-container">
    <v-filter
      :filters="filters"
      :options="filtersOptions"
      :triggerHandler="triggerHandler">
    </v-filter>
    <div class="satisfactionstat">
      <div class="waterwave-box">
      <div class="title"><span>总满意度</span></div>
      <waterwave
        class="water"
        :height="150"
        title="满意度"
        :percent="percent">
      </waterwave>
      <div class="fullscore">
        <p>100分</p>
        <p>满分分值</p>
      </div>
      <div class="perscore">
        <p>100分</p>
        <p>平均得分</p>
      </div>
    </div>
    <div class="trend-box">
      <div class="title"><span>满意度趋势</span></div>
        <areachart
          :key="chartKey"
          :data="chartData"
          :filters="filters"
          :height="255"
        ></areachart>
      </div>
      <analysis></analysis>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import Filter from 'components/common/filters/main';
import waterwave from './waterwave';
import areachart from './areachart';
import analysis from './analysis';


export default {
  name: 'satisfactionstat',
  components: {
    waterwave,
    areachart,
    analysis,
    VFilter: Filter,
  },
  data: () => ({
    percent: 0,
    chartKey: '',
    filters: {
      datetype: 1,
      starttime: '',
      endtime: '',
      satisfaction: -1,
    },
    filtersOptions: {
      checkbox: [],
      select: ['satisfaction'],
    },
  }),
  activated() {
    this.chartKey = Date.now();
  },
  computed: {
    ...mapGetters('satisfactionstat', ['chartData']),
  },
  mounted() {
    setTimeout(() => {
      this.percent = 10;
    }, 50);
  },
  methods: {
    triggerHandler(args) {
      console.log(args);
      this.chartKey = Date.now();
    },
  },
};
</script>


<style lang="less" scoped>
.satisfactionstat-container {
  background-color: #f1f3f7;
  .satisfactionstat {
    padding: 20px 25px 33px 25px;
    overflow: hidden;
    .waterwave-box {
      width: 230px;
      height: 295px;
      float: left;
      background-color: #ffffff;
      box-shadow: 0px 2.5px 1.5px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      .title {
        height: 39px;
        font-size: 16px;
        line-height: 39px;
        color: #252834;
        border-bottom: 1px solid #e8e8e8;
        span {
          margin-left: 12px;
        }
      }
      .water {
        margin: 19px auto 0px auto;
      }
      .fullscore {
        float: left;
        width: 100px;
        height: 50px;
        margin-top: 30px;
        text-align: center;
        margin-left: 15px;
        font-size: 14px;
        color: #8c8c8c;
      }
      .perscore {
        float: left;
        width: 100px;
        height: 50px;
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        color: #8c8c8c;
      }
    }
    .trend-box {
      width: auto;
      height: 295px;
      margin-left: 247px;
      background-color: #ffffff;
      box-shadow: 0px 2.5px 1.5px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      .title {
        height: 39px;
        font-size: 16px;
        line-height: 39px;
        color: #252834;
        border-bottom: 1px solid #e8e8e8;
        span {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>

