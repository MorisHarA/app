<template>
  <div class="bar-chart" :width="width">
    <chart
      v-if="data && data.length"
      :data="data"
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
import createG2 from 'components/common/js/g2-vue';
import format from 'utils/format';

const Chart = createG2((chart, data, { starttime, endtime }, color) => {
  const timeRange = format.getDateInterval(starttime, endtime);
  starttime = timeRange.starttime;
  endtime = timeRange.endtime;
  const groupby = timeRange.groupby;
  const keys = Object.keys(data[0]);

  const formatDataByTickCount = (tickCount, tick) => {
    const arr = [];
    for (let i = 0; i < tickCount; i += 1) {
      arr.push(data.slice(i * tick, (i + 1) * tick));
    }
    data = arr.map(h => ({
      starttime: h[0].starttime,
      count: h.reduce((a, b) => a + b.count, 0),
    }));
  };

  const config = (key) => {
    let tickCount;
    let tick;
    switch (groupby) {
      case 'hour':
        tick = data.length / 12;
        tickCount = 12;
        formatDataByTickCount(tickCount, tick);
        return {
          [key]: {
            type: 'timeCat',
            tickCount,
            mask: 'mm-dd HH:MM',
          },
        };
      case 'day':
        if (data.length < 12) {
          tickCount = data.length;
        } else if (data.length > 12 && data.length < 30) {
          tick = 2;
          tickCount =
            data.length % tick
              ? parseInt(data.length / tick, 10) + 1
              : parseInt(data.length / tick, 10);
          formatDataByTickCount(tickCount, tick);
        } else if (data.length >= 30) {
          tick = parseInt(data.length / 10, 10);
          tickCount =
            data.length % tick
              ? parseInt(data.length / tick, 10) + 1
              : parseInt(data.length / tick, 10);
          formatDataByTickCount(tickCount, tick);
        }
        return {
          [key]: {
            type: 'timeCat',
            tickCount,
            mask: 'mm-dd',
          },
        };
      case 'month':
        tick = data.length / 12;
        tickCount = 12;
        formatDataByTickCount(tickCount, tick);
        return {
          [key]: {
            type: 'timeCat',
            tickCount,
            mask: 'yy-mm-dd',
          },
        };
      default:
        return this;
    }
  };

  const defs = {
    ...config(keys[0]),
    [keys[1]]: {
      type: 'linear',
      alias: '问卷数',
      min: 0, // 定义数值范围的最小值
      tickCount: 4,
      // 列定义
    },
  };

  chart.axis([keys[0]], {
    // 横轴配置
    labels: {
      label: {
        fontSize: 12,
        fill: '#828282',
        fontWeight: 400,
      },
    },
  });

  chart.axis([keys[1]], {
    // 纵轴配置
    labels: {
      label: {
        fontSize: 12,
        fill: '#828282',
        fontWeight: 400,
      },
    },
    title: null,
  });

  chart.source(data, defs);
  chart.tooltip(true);
  chart
    .interval()
    .position(`${keys[0]}*${keys[1]}`)
    .color(color)
    .size(10);
  chart.render();
});

export default {
  name: 'barchart',
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
      type: String | Number,
    },
    height: {
      type: String | Number,
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
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bar-chart {
  height: 370px;
}
</style>
