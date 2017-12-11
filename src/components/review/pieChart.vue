<template>
    <div class="pie-chart" :width="width">
        <chart
            v-if="data && data.length"
            :data="statData"
            :width="+width"
            :height="+height"
            :plotCfg="plotCfg"
            :forceFit="forceFit"
            :filters="filters"
            :color="color">
        </chart>
    </div>
</template>

<script type="text/ecmascript-6">
/* global G2 */

import createG2 from 'components/common/js/g2-vue';
import format from 'utils/format';

const Chart = createG2((chart, data) => {
  const Stat = G2.Stat;

  chart.coord('theta', {
    radius: 0.8, // 设置饼图的大小
  });

  chart.legend('name', {
    position: 'bottom',
    itemWrap: true,
    formatter: (val) => {
      let sum = 0;
      data.map((d) => {
        sum += d.value;
      });

      for (let i = 0, len = data.length; i < len; i++) {
        const obj = data[i];

        if (obj.name === val) {
          return `${val}: ${format.mathToRate(obj.value, sum, 2)}%`;
        }
      }
    },
    word: {
      fill: '#252834',
    },
  });

  chart.tooltip({
    title: null,
    map: {
      value: 'value',
    },
  });

  chart
    .intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name', ['#efefef', '#c2b3e4', '#67e887', '#158af2'])
    .label('name*..percent', (name, percent) => {
      percent = `${(percent * 100).toFixed(2)}%`;
      return `${name} ${percent}`;
    });

  chart.source(data);
  chart.render();
});

export default {
  name: 'pieChart',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    forceFit: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    filters: {
      type: Object,
      required: true,
    },
    plotCfg: {
      type: Object,
      default() {
        return {
          margin: [40, 60, 40, 60],
        };
      },
    },
    color: {
      type: String,
      default: '#61a8eb',
    },
  },
  computed: {
    statData() {
      const result = [
        {
          name: '未处理',
          code: 'untreated',
          value: 0,
        },
        {
          name: '72小时外',
          code: 'gt72h_count',
          value: 0,
        },
        {
          name: '12-72小时',
          code: 'gt12h_count',
          value: 0,
        },
        {
          name: '0-12小时',
          code: 'lt12h_count',
          value: 0,
        },
      ];

      this.data.map((pie) => {
        result.map((data, index) => {
          const { code, value } = data;
          const { dispose, bad_count } = pie;
          if (code !== 'untreated') {
            result[index].value = value + dispose[code];
          } else {
            result[index].value = value + (bad_count - dispose.count);
          }
        });
      });
      return result;
    },
  },
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.pie-chart {
  min-height: 300px;
}
</style>
