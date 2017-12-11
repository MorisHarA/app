<template>
  <div class="area-chart" :width="width">
    <chart
      v-if="data && data.length"
      :data="data"
      :width="+width"
      :height="+height"
      :plotCfg="plotCfg"
      :forceFit="forceFit"
      :filters="filters"
    >
    </chart>
  </div>
</template>

<script type="text/ecmascript-6">
import createG2 from 'components/common/js/g2-vue';
import format from 'utils/format';

const Chart = createG2((chart, data, { starttime, endtime }) => {
  const timeRange = format.getDateInterval(starttime, endtime);
  starttime = timeRange.starttime;
  endtime = timeRange.endtime;
  const groupby = timeRange.groupby;

  const formatDataByTickCount = (tickCount, tick) => {
    try {
      const arr = [];
      for (let i = 0; i < tickCount; i += 1) {
        arr.push(data.slice(i * tick, (i + 1) * tick));
      }
      data = arr.map(h => ({
        starttime: h[0].starttime,
        count: h.reduce((a, b) => a + b.count, 0),
      }));
    } catch (e) {
      console.log(e);
    }
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
            mask: 'HH:MM',
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
    ...config('starttime'),
    count: {
      type: 'linear',
      alias: '问卷数',
      min: 0, // 定义数值范围的最小值
      tickCount: 4,
      // 列定义
    },
  };

  chart.source(data, defs);
  chart.tooltip({
    crosshairs: true,
  });
  chart.axis('starttime', {
    // 纵轴配置
    labels: {
      label: {
        fontSize: 12,
        fill: '#333333',
        fontWeight: 400,
      },
    },
    title: null,
  });
  chart.axis('count', {
    // 纵轴配置
    line: {
      lineWidth: 0, // 设置线的宽度
    },
    tickLine: {
      lineWidth: 0, // 刻度线宽
    },
    labels: {
      label: {
        fontSize: 12,
        fill: '#333333',
        fontWeight: 400,
      },
    },
    title: null,
  });
  chart.area().position('starttime*count').color('#00c6c3')
    .opacity(0.6);
  chart.line().position('starttime*count').color('#00c6c3').size(2);
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
      type: Number,
    },
    height: {
      type: Number,
    },
    plotCfg: {
      type: Object,
      default() {
        return {
          margin: [30, 40, 45, 60],
        };
      },
    },
  },
  components: {
    Chart,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.area-chart {
  height: 370px;
}
</style>
