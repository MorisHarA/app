<template>
    <div class="stacked-chart" :width="width">
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

const Chart = createG2((chart, data) => {
  chart.axis('type', {
    title: null,
    labelOffset: 10,
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });

  chart.axis('value', {
    position: 'left',
    title: null,
    tickLine: null,
    formatter(val) {
      return `${val}%`;
    },
    labels: {
      label: {
        fill: '#828282',
      },
    },
  });

  const colorMap = {
    赞同: '#9fe697',
    不赞同: '#13bcec',
  };

  chart.legend(false);
  chart.coord().transpose();
  chart
    .intervalStack()
    .position('type*value')
    .color('opinion', opinion => colorMap[opinion])
    .size(25)
    .style({
      strokeInterval: {
        radius: 10,
      },
    });

  chart.source(data, {
    value: {
      tickInterval: 10,
    },
  });

  chart.render();
});

export default {
  name: 'stackedChart',
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
      const result = this.data
        .reduce(
          (res, { points }) =>
            res.map((r) => {
              const scores =
                points.find(({ name }) => name == r.code).scores || [];
              const agree = scores.reduce(
                (s, { score, count }) => (score > 3 ? s + count : s),
                0,
              );
              const disagree = scores.reduce(
                (s, { score, count }) => (score < 4 ? s + count : s),
                0,
              );
              return {
                ...r,
                total: r.total + agree + disagree,
                赞同: r['赞同'] + agree,
                不赞同: r['不赞同'] - disagree,
              };
            }),
        [
          {
            group: '医生',
            type: '医生',
            code: 'staff',
            total: 0,
            赞同: 0,
            不赞同: 0,
          },
          {
            group: '环境',
            type: '环境',
            code: 'environment',
            total: 0,
            赞同: 0,
            不赞同: 0,
          },
          {
            group: '服务',
            type: '服务',
            code: 'service',
            total: 0,
            赞同: 0,
            不赞同: 0,
          },
        ],
        )
        .map(r => ({
          ...r,
          赞同: parseFloat((r['赞同'] / r.total * 100).toFixed(2)),
          不赞同: parseFloat((r['不赞同'] / r.total * 100).toFixed(2)),
        }));

      const Frame = G2.Frame;
      let frame = new Frame(result);
      frame = Frame.combinColumns(frame, ['不赞同', '赞同'], 'value', 'opinion', [
        'group',
        'type',
      ]);
      return frame;
    },
  },
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.stacked-chart {
  min-height: 300px;
}
</style>
