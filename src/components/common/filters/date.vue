<template>
    <div class="template-date-container">
        <label class="title">时间类型：</label>
        <div class="wrap filter-content">
            <div class="date-classify">
                <Button-group>
                    <Button
                        :type="datetype == 1 ? 'primary' : 'ghost'"
                        @click="checkDateType(1)">
                        <Tooltip
                            content="最多选择一整月"
                            placement="top">
                            日
                        </Tooltip>
                    </Button>
                    <Button
                        :type="datetype == 2 ? 'primary' : 'ghost'"
                        @click="checkDateType(2)">
                        <Tooltip
                            content="最多选择三个月"
                            placement="top">
                            月
                        </Tooltip>
                    </Button>
                    <Button
                        :type="datetype == 3 ? 'primary' : 'ghost'"
                        @click="checkDateType(3)">
                        <Tooltip
                            content="最多选择一年"
                            placement="top">
                            年
                        </Tooltip>
                    </Button>
                </Button-group>
            </div>
            <div v-show="datetype == 1" class="date-picker">
                <Date-picker
                    type="date"
                    placeholder="开始时间"
                    :value="starttime"
                    @on-change="dateChange($event,'start')"
                    :options="daterule_s"
                    style="width: 150px">
                </Date-picker>
                <Date-picker
                    type="date"
                    placeholder="结束时间"
                    :value="endtime"
                    @on-change="dateChange($event,'end')"
                    :options="daterule_e"
                    style="width: 150px;margin-left: 5px;">
                </Date-picker>
            </div>
            <div v-show="datetype == 2" class="date-picker">
                <Date-picker
                    type="month"
                    placeholder="开始时间"
                    :value="starttime"
                    @on-change="dateChange($event,'start')"
                    :options="daterule_s"
                    style="width: 150px">
                </Date-picker>
                <Date-picker
                    type="month"
                    placeholder="结束时间"
                    :value="endtime"
                    @on-change="dateChange($event,'end')"
                    :options="daterule_e"
                    style="width: 150px;margin-left: 5px;">
                </Date-picker>
            </div>
            <div v-show="datetype == 3" class="date-picker">
                <Date-picker
                    type="year"
                    placeholder="选择年份"
                    :value="starttime"
                    @on-change="dateChange"
                    style="width: 150px">
                </Date-picker>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import format from 'src/utils/format';

const OneMonth = 30 * 24 * 60 * 60 * 1000;

export default {
  props: ['datetype', 'starttime', 'endtime', 'checkDateType', 'dateChange'],
  data() {
    const self = this;

    return {
      // type: 1,    //1.日 2.月 3.年
      daterule_s: {
        disabledDate(date) {
          const { datetype, endtime } = self;

          return (
            date &&
            (!endtime
              ? date.valueOf() > Date.now()
              : datetype == 1
                ? date.valueOf() > Date.now() ||
                  date.valueOf() > format.string2timestamp(endtime) ||
                  date.valueOf() < format.string2timestamp(endtime) - OneMonth
                : (datetype == 2 &&
                    date.valueOf() >
                      format.string2timestamp(endtime) + OneMonth * 0.9) ||
                  date.valueOf() <
                    format.string2timestamp(endtime) - 2.1 * OneMonth)
          );
        },
      },
      daterule_e: {
        disabledDate(date) {
          const { datetype, starttime } = self;

          return (
            date &&
            (!starttime
              ? date.valueOf() > Date.now()
              : datetype == 1
                ? date.valueOf() > Date.now() ||
                  date.valueOf() < format.string2timestamp(starttime) ||
                  date.valueOf() > format.string2timestamp(starttime) + OneMonth
                : (datetype == 2 &&
                    date.valueOf() >
                      format.string2timestamp(starttime) + OneMonth * 3) ||
                  date.valueOf() <
                    format.string2timestamp(starttime) - 0.1 * OneMonth ||
                  date.valueOf() > Date.now() + OneMonth * 0.1)
          );
        },
      },
    };
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.template-date-container {
  .title {
    font-size: 14px;
    width: 75px;
    display: inline-block;
  }
  .wrap {
    font-size: 12px;
    display: inline-block;
    .date-classify,
    .date-picker {
      display: inline-block;
    }
    .date-picker {
      margin-left: 15px;
    }
    .date-classify .ivu-tooltip-popper {
      top: 10px !important;
    }
  }
}
</style>
