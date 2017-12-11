<template>
    <div class="template-filters-container">
        <div class="template-header">
            <div class="title">{{pageTitle}}</div>
            <div class="right">
                <div class="date-select-simple">
                    <Button-group>
                        <Button :type="dateGenre == 1 ? 'primary' : 'ghost'" @click="dateGenreChange(1)">今天</Button>
                        <Button :type="dateGenre == 2 ? 'primary' : 'ghost'" @click="dateGenreChange(2)">昨天</Button>
                        <Button :type="dateGenre == 4 ? 'primary' : 'ghost'" @click="dateGenreChange(4)">近7天</Button>
                        <Button :type="dateGenre == 5 ? 'primary' : 'ghost'" @click="dateGenreChange(5)">近30天</Button>
                    </Button-group>
                </div>
                <div class="export-filter-data">
                    <Button type="ghost" @click="exportFiltersData">
                        <img src="./images/export.png" class="export-icon">
                        导出筛选数据
                    </Button>
                </div>
                <div
                    :class="filterdetails ? 'high-level-filter up' : 'high-level-filter down'"
                    @click="filterdetails = !filterdetails">
                    高级筛选
                </div>
            </div>
        </div>
        <div class="overview">
            <div class="simple">
                筛选条件：
                <span class="text">
                    {{filterString}}
                </span>
            </div>
            <div :class="filterdetails ? 'complex show' : 'complex hide'">
                <div class="composite">
                    <daters
                        :datetype="filters.datetype"
                        :starttime="filters.starttime"
                        :endtime="filters.endtime"
                        :checkDateType="checkDateType"
                        :dateChange="dateChange">
                    </daters>
                    <checkbox
                        v-for="(val, index) in options.checkbox"
                        :args="checkData[val]"
                        :key="`checkbox-${index}`"
                        :params="filters[val]"
                        :changeSelectInfo="changeSelectInfo">
                    </checkbox>
                    <selector
                        v-for="(val, index) in options.select"
                        :args="checkData[val]"
                        :key="`select-${index}`"
                        v-model="filters[val]"
                        :changeSelectInfo="changeSelectInfo">
                    </selector>
                </div>
                <div class="footer">
                    <Button class="set" type="primary" @click="submit">生成</Button>
                    <div class="reset" @click="resetFilters">重置</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex';
import format from 'src/utils/format';
import daters from './date';
import checkbox from './checkbox';
import selector from './select';

export default {
  data() {
    return {
      filterdetails: false,
    };
  },
  components: {
    daters,
    checkbox,
    selector,
  },
  // 初始化query参数
  activated() {
    const filters = this.filters;
    const query = this.$route.query;

    this.$router.replace({
      name: this.pageName,
      query: Object.assign({}, query, filters),
    });
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
    triggerHandler: {
      type: Function,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        checkbox: [],
        select: [],
      }),
    },
  },
  created() {
    const { query } = this.$route;
    const { starttime } = query;

    if (!starttime) {
      const today = format.todayInterval('string');

      Object.assign(query, today);
    }

    Object.assign(this.filters, query);
    this.initData(query);
  },
  methods: {
    defaulthandle(value) {
      this.params = value;
    },
    ...mapActions('filters', ['initData', 'setInitData', 'exportData']),
    // 生成 筛选条件
    submit() {
      const { starttime, endtime, datetype } = this.filters;
      const { query } = this.$route;

      if (!starttime || (datetype < 3 && !endtime)) {
        if (!starttime || !endtime) {
          this.$Notice.warning({
            title: '日期填写不完整！',
          });
        }
        return;
      }

      const querys = {
        ...query,
        ...this.filters,
      };

      if (query.start) {
        querys.start = 0;
      }

      this.$router.replace({
        name: this.pageName,
        query: querys,
      });
      // 触发父级请求时间
      this.triggerHandler(this.filters);
      // this.setInitData(this.filters)

      this.filterdetails = false;
    },
    exportFiltersData() {
      this.exportData(this.filters);
    },
    // 筛选头部 改变时间区间
    dateGenreChange(type) {
      if (type === this.dateGenre) return;

      const { starttime, endtime } = format.getLocaleDateString(type);
      const { filters } = this;
      Object.assign(this.filters, {
        starttime,
        endtime,
        datetype: 1,
      });
      const querys = {
        ...filters,
        starttime,
        endtime,
        datetype: 1,
      };
      if (this.$route.query.start) {
        querys.start = 0;
      }
      this.$router.replace({
        name: this.pageName,
        query: querys,
      });
      // 触发父级请求时间
      this.triggerHandler({ ...filters, starttime, endtime, datetype: 1 });
    },
    // 筛选条件中 改变时间类型
    checkDateType(type) {
      if (type === this.filters.datetype) return;

      Object.assign(this.filters, {
        datetype: type,
        starttime: '',
        endtime: '',
      });
    },
    // CheckBox 和 Select 选择
    changeSelectInfo(index, code) {
      this.filters[code] = index;
    },
    // 筛选条件中 改变日期
    dateChange(date, date_type) {
      const type = this.filters.datetype;
      // console.log(date)

      if (date_type === 'start' || type === 3) {
        this.filters.starttime = date;
        if (type == 3) this.filters.endtime = '';
      }

      if (date_type === 'end') {
        this.filters.endtime = date;
      }
    },
    resetFilters() {
      const { filters, init } = this;

      Object.assign(
        this.filters,
        format.initDataNoRepeat(filters, init),
        format.todayInterval('string'),
      );
    },
  },
  computed: {
    ...mapState('filters', [
      'divisions',
      'area',
      'regions',
      'exclusive',
      'review',
      'level',
      'init',
      'satisfaction',
    ]),
    checkData() {
      const {
        divisions,
        area,
        regions,
        exclusive,
        review,
        level,
        init,
        satisfaction,
      } = this;
      return {
        divisions,
        area,
        regions,
        exclusive,
        review,
        level,
        init,
        satisfaction,
      };
    },
    filterString() {
      const { filters, pageName } = this;
      const { starttime, endtime } = filters;

      let tempstr = '';

      if (starttime && endtime) {
        if (starttime === endtime) {
          if (format.isToDay(starttime)) {
            tempstr += '今日';
          } else {
            tempstr += starttime;
          }
        } else {
          tempstr += `${starttime} ~ ${endtime}`;
        }
      } else if (!starttime) {
        tempstr += '今日';
      } else {
        tempstr += `${starttime}年`;
      }

      for (const target in filters) {
        if (
          target === 'area' ||
          target === 'divisions' ||
          target === 'exclusive' ||
          target === 'level' ||
          target === 'review' ||
          target === 'satisfaction'
        ) {
          const item = this[target].list.filter(f => f.id === filters[target]);

          tempstr += ` / ${item.length > 0 ? item[0].name : '全部'}${this[target]
            .title}`;
        }
        if (target === 'regions') {
          const item = this[target].list.filter(f => f.id === filters[target]);
          // console.log(filters[target])
          tempstr += ` / ${item.length > 0 ? item[0].name : '全部'}${this[target]
            .title}`;
        }
      }

      return tempstr;
    },
    dateGenre() {
      const { starttime, endtime } = this.filters;
      return format.timeString2dateType(starttime, endtime);
    },
    pageName() {
      return this.$route.name;
    },
    pageTitle() {
      const pageName = this.pageName;
      let result = '';
      switch (pageName) {
        case 'commentdetail':
          result = '评论详情';
          break;
        case 'commentstat':
          result = '评论统计';
          break;
        case 'questionnairestat':
          result = '问卷统计';
          break;
        case 'questionnairedetail':
          result = '问卷详情';
          break;
        case 'satisfactionstat':
          result = '满意度统计';
          break;
        default:
          result = '';
      }
      return result;
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.template-filters-container {
  font-size: 14px;
  position: relative;
  z-index: 101;
  .template-header {
    position: relative;
    padding: 15px 25px;
    background: #fff;
    border-bottom: 1px solid #e9eaec;
    z-index: 11;
    .title {
      font-weight: bold;
      display: inline-block;
      font-size: 16px;
    }
    .right {
      position: absolute;
      right: 25px;
      top: 11px;
      .date-select-simple,
      .export-filter-data,
      .high-level-filter {
        display: inline-block;
        margin-left: 15px;
      }
      .export-filter-data .export-icon {
        width: 15px;
        vertical-align: middle;
        margin-top: -2px;
        height: 11.91px;
      }
      .high-level-filter {
        font-size: 12px;
        color: rgb(9, 147, 237);
        cursor: pointer;
      }
      .high-level-filter.up:after {
        transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
      }
      .high-level-filter.down:after {
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        margin-bottom: 3px;
      }
      .high-level-filter:after {
        content: "";
        width: 7px;
        height: 7px;
        display: inline-block;
        margin-left: 5px;
        margin-bottom: -1px;
        border-top: 1px solid rgb(9, 147, 237);
        border-right: 1px solid rgb(9, 147, 237);
      }
    }
  }
  .overview {
    font-size: 13px;
    background: #fafafa;
    box-shadow: 4px 0px 8px 0px #ddd;
    position: relative;
    z-index: 10;
    .simple {
      padding: 10px 25px;
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
    }
    .complex {
      position: absolute;
      width: 100%;
      z-index: 10;
      top: 0;
      .composite {
        background: #fff;
        padding: 35px 25px 30px;
      }
      .footer {
        padding: 10px 25px 10px;
        border-top: 1px solid #e9eaec;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
        background: #fafafa;
        .set,
        .reset {
          margin-right: 15px;
          font-weight: bold;
        }
        .reset {
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          white-space: nowrap;
          line-height: 1.5;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 6px 15px;
          font-size: 12px;
          border-radius: 4px;
          transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear;
          color: #495060;
          background-color: #fff;
          border-color: #dddee1;
        }
      }
    }
    .complex.show {
      animation: showfilter ease-in 0.3s forwards;
      -ms-animation: showfilter ease-in 0.3s forwards;
    }
    .complex.hide {
      visibility: hidden;
      animation: fadeInFromNone 0.5s ease-out forwards;
      -ms-animation: fadeInFromNone 0.5s ease-out forwards;
      transition: visibility 0.5s;
      -ms-transition: visibility 0.5s;
    }
  }
  @keyframes showfilter {
    from {
      top: -600px;
    }
    to {
      top: 0;
    }
  }
  @-ms-keyframes showfilter {
    from {
      top: -600px;
    }
    to {
      top: 0;
    }
  }
  @keyframes fadeInFromNone {
    from {
      top: 0;
    }
    to {
      top: -600px;
    }
  }
  @-ms-keyframes fadeInFromNone {
    from {
      top: 0;
    }
    to {
      top: -600px;
    }
  }
}
</style>
