<template>
  <div class="column-chart" :width="width">
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
/* global G2 moment */

import createG2 from 'components/common/js/g2-vue';
import format from 'utils/format';

const formatData = (target, groupby) => {
  const result = [];
  target.map((val) => {
    let { bad_count, dispose, starttime } = val;

    if (groupby === 'hour') {
      starttime = moment(starttime).format('MM-DD HH:mm');
    } else if (groupby === 'day') {
      starttime = moment(starttime).format('MM-DD');
    } else {
      starttime = moment(starttime).format('YYYY-MM');
    }
    result.push({
      starttime,
      评论推送: bad_count,
      已处理: dispose.count,
    });
  });

  return result;
};

const Chart = createG2((chart, data) => {
  chart.legend(false);
  chart.axis('starttime', {
    title: null,
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });
  chart.axis('评价数', {
    position: 'left',
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });
  chart
    .intervalDodge()
    .position('starttime*评价数')
    .color('设施', ['#6890d4', '#68d4b2'])
    .size(20);

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
      const { starttime: start, endtime: end } = this.filters;
      const { starttime, endtime, groupby } = format.getDateInterval(
        start,
        end,
      );
      const source = formatData(data, groupby);

      const Frame = G2.Frame;
      let frame = new Frame(source);
      frame = Frame.combinColumns(
        frame,
        ['评论推送', '已处理'],
        '评价数',
        '设施',
        'starttime',
      );

      return frame;
    },
  },
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.column-chart {
  min-height: 370px;
  margin-left: 20px;
}
</style>
