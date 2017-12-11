<template>
  <div class="waterWave" ref="root" :style="{transform: `scale(${radio})`, width: `${height}px`}">
    <div :style="{width: `${height}px`, height: `${height}px`, overflow: 'hidden'}">
      <canvas
        class="waterWaveCanvasWrapper"
        ref="node"
        :width="height * 2"
        :height="height * 2"
      />
    </div>
    <div class="text" :style="{width: `${height}px`}">
      <span v-if="title">{{ title }}</span>
      <h4>{{ percent }}%</h4>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'waterwave',
    data: () => ({
      radio: 1,
    }),
    props: {
      height: {
        type: Number,
        default: 160,
      },
      percent: {
        type: Number,
      },
      title: {
        type: String,
      },
      color: {
        type: String,
        default: '#1890FF',
      },
    },
    watch: {
      percent(cur, pre) {
        if (cur !== pre) {
          this.renderChart();
        }
      },
    },
    mounted() {
      this.renderChart();
      // this.resize();
    },
    beforeDestroy() {
      cancelAnimationFrame(this.timer);
      if (this.$refs.node) {
        this.$refs.node.innerHTML = '';
      }
    },
    methods: {
      resize() {
        const { offsetWidth } = this.$refs.root.parentNode;
        this.radio = offsetWidth < this.height ? offsetWidth / this.height : 1;
      },
      renderChart() {
        const data = this.percent / 100;

        if (!this.$refs.node || !data) {
          return;
        }

        const canvas = this.$refs.node;
        const ctx = canvas.getContext('2d');

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const radius = canvasWidth / 2;
        const lineWidth = 2;
        const cR = radius - (lineWidth);

        ctx.beginPath();
        ctx.lineWidth = lineWidth * 2;

        const axisLength = canvasWidth - (lineWidth);
        const unit = axisLength / 8;
        const range = 0.2; // 振幅
        let currRange = range;
        const xOffset = lineWidth;
        let sp = 0; // 周期偏移量
        let currData = 0;
        const waveupsp = 0.005; // 水波上涨速度

        let arcStack = [];
        const bR = radius - (lineWidth);
        const circleOffset = -(Math.PI / 2);
        let circleLock = true;

        for (let i = circleOffset; i < circleOffset + (2 * Math.PI); i += 1 / (8 * Math.PI)) {
          arcStack.push([
            radius + (bR * Math.cos(i)),
            radius + (bR * Math.sin(i)),
          ]);
        }

        const cStartPoint = arcStack.shift();
        ctx.strokeStyle = this.color;
        ctx.moveTo(cStartPoint[0], cStartPoint[1]);

        const drawSin = () => {
          ctx.beginPath();
          ctx.save();

          const sinStack = [];
          for (let i = xOffset; i <= xOffset + axisLength; i += 20 / axisLength) {
            const x = sp + ((xOffset + i) / unit);
            const y = Math.sin(x) * currRange;
            const dx = i;
            const dy = ((2 * cR * (1 - currData)) + (radius - cR)) - (unit * y);

            ctx.lineTo(dx, dy);
            sinStack.push([dx, dy]);
          }

          const startPoint = sinStack.shift();

          ctx.lineTo(xOffset + axisLength, canvasHeight);
          ctx.lineTo(xOffset, canvasHeight);
          ctx.lineTo(startPoint[0], startPoint[1]);

          const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(1, '#1890FF');
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.restore();
        };

        const render = () => {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          if (circleLock) {
            if (arcStack.length) {
              const temp = arcStack.shift();
              ctx.lineTo(temp[0], temp[1]);
              ctx.stroke();
            } else {
              circleLock = false;
              ctx.lineTo(cStartPoint[0], cStartPoint[1]);
              ctx.stroke();
              arcStack = null;

              ctx.globalCompositeOperation = 'destination-over';
              ctx.beginPath();
              ctx.lineWidth = lineWidth;
              ctx.arc(radius, radius, bR, 0, 2 * Math.PI, 1);

              ctx.beginPath();
              ctx.save();
              ctx.arc(radius, radius, radius - (3 * lineWidth), 0, 2 * Math.PI, 1);

              ctx.restore();
              ctx.clip();
              ctx.fillStyle = '#1890FF';
            }
          } else {
            if (data >= 0.85) {
              if (currRange > range / 4) {
                const t = range * 0.01;
                currRange -= t;
              }
            } else if (data <= 0.1) {
              if (currRange < range * 1.5) {
                const t = range * 0.01;
                currRange += t;
              }
            } else {
              if (currRange <= range) {
                const t = range * 0.01;
                currRange += t;
              }
              if (currRange >= range) {
                const t = range * 0.01;
                currRange -= t;
              }
            }
            if ((data - currData) > 0) {
              currData += waveupsp;
            }
            if ((data - currData) < 0) {
              currData -= waveupsp;
            }

            sp += 0.07;
            drawSin();
          }
          this.timer = requestAnimationFrame(render);
        };

        render();
      },
    },

  };
</script>

<style lang="less" scoped>
  .waterWave {
    position: relative;
    transform-origin: left;
    .text {
      position: absolute;
      left: 0;
      top: 32px;
      text-align: center;
      width: 100%;
      span {
        color: #8c8c8c;
        font-size: 14px;
        line-height: 22px;
      }
      h4 {
        color: #242424;
        line-height: 32px;
        font-size: 24px;
      }
    }
    .waterWaveCanvasWrapper {
      transform: scale(.5);
      transform-origin: 0 0;
    }
  }

</style>
