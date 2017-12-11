<template>
  <div class="fusion-chart" :width="width">
    <chart
      v-if="data && data.length"
      :data="statData"
      :width="+width"
      :height="+height"
      :plotCfg="plotCfg"
      :forceFit="forceFit"
      :filters="filters"
      :color="color"
    >
    </chart>
  </div>
</template>

<script type="text/ecmascript-6">
/* global G2 moment */

import createG2 from 'components/common/js/g2-vue';
import format from 'utils/format';

const fusionModal = [
  {
    name: '评论总数',
    code: 'sum',
    data: [],
  },
  {
    name: '4-5星',
    code: 'star_45',
    data: [],
  },
  {
    name: '3星',
    code: 'star_3',
    data: [],
  },
  {
    name: '1-2星',
    code: 'star_12',
    data: [],
  },
];

const formatData = (target) => {
  const modal = fusionModal;
  modal.map((m, index) => {
    const data = [];
    target.map((val) => {
      const { points } = val;
      let sum = 0,
        star_45 = 0,
        star_3 = 0,
        star_12 = 0;
      const ahead = val.points.filter(v => v.name === 'general');
      if (ahead.length > 0) {
        ahead[0].scores.map((s) => {
          sum += s.count;
          if (s.score > 3) {
            star_45 += s.count;
          } else if (s.score < 3 && s.score > 0) {
            star_12 += s.count;
          } else if (s.score == 3) {
            star_3 += s.count;
          }
        });
      }

      if (m.code === 'sum') {
        data.push(sum);
      } else if (m.code === 'star_45') {
        data.push(star_45);
      } else if (m.code === 'star_3') {
        data.push(star_3);
      } else {
        data.push(star_12);
      }
    });

    modal[index].data = data;
  });

  return modal;
};

const Chart = createG2((chart, data) => {
  chart.legend(false);
  chart.axis('时间', {
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });
  chart.axis('评价', {
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });
  chart
    .intervalDodge()
    .position('时间*评价')
    .color('name');

  chart.source(data);
  chart.render();
});

export default {
  name: 'fusionchart',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    filters: {
      type: Object,
      required: true,
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
    plotCfg: {
      type: Object,
      default() {
        return {
          margin: [40, 60, 30, 30],
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
      const data = this.data;
      const columns = [];
      const { starttime: start, endtime: end } = this.filters;
      const { starttime, endtime, groupby } = format.getDateInterval(
        start,
        end,
      );
      data.map((val) => {
        let column;
        if (groupby === 'hour') {
          column = moment(val.starttime).format('MM-DD HH:mm');
        } else if (groupby === 'day') {
          column = moment(val.starttime).format('MM-DD');
        } else {
          column = moment(val.starttime).format('YYYY-MM');
        }
        columns.push(column);
      });

      const source = formatData(data);

      for (let i = 0; i < source.length; i++) {
        const item = source[i];
        const datas = item.data;
        for (let j = 0; j < datas.length; j++) {
          item[columns[j]] = datas[j];
        }
        source[i] = item;
      }

      const Frame = G2.Frame;
      let frame = new Frame(source);
      frame = Frame.combinColumns(frame, columns, '评价', '时间', 'name');
      return frame;
    },
  },
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.fusion-chart {
  min-height: 370px;
  margin-left: 20px;
}
</style>
