<template>
  <div class="review-detail-container">
    <slot></slot>
    <filters :filters="filters" :triggerHandler="triggerHandler" :options="filtersOptions"></filters>
    <div class="pannel-wrap">
      <div class="detail-pannel">
        <div class="title">
          评论明细
        </div>
        <div class="detail-wrap" v-if="comments.length > 0">
          <div class="review-count">
            评论总数：{{count.value}}条
          </div>
          <div class="review-table">
            <reviewTable
              :sortableHandler="sortableHandler"
              :comments="comments"
              :references="references"
              :templates="replayTemplates">
            </reviewTable>
          </div>
          <div class="fooer-page">
            <Page
              :total="count.value"
              :current="filters.start/10 + 1"
              show-elevator
              @on-change="handlePageChange">
            </Page>
          </div>
        </div>
        <no-data
          v-if="comments.length <= 0"
          txt="暂无评论">
        </no-data>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import { mapActions, mapState } from 'vuex';
import { filterMixin } from 'components/common/mixin';
import NoData from 'components/common/nodata/main';
import filters from '../common/filters/main';
import reviewTable from './table';

export default {
  mixins: [filterMixin],
  components: {
    filters,
    reviewTable,
    NoData,
  },
  data() {
    return {
      pageName: '评论详情',
      filters: {
        datetype: 1, // 1.日 2.月 3.年
        starttime: '',
        endtime: '',
        area: -1,
        divisions: -1,
        regions: -1,
        exclusive: -1,
        review: -1,
        level: -1,
        start: 0,
        limit: 10,
      },
      filtersOptions: {
        checkbox: ['review', 'level', 'area'],
        select: ['divisions', 'regions', 'exclusive'],
      },
    };
  },
  mounted() {
    // this.fetchCommentData(this.filters)
  },
  methods: {
    handlePageChange(page) {
      const pageName = this.$route.name;
      const start = (page - 1) * 10;

      this.filters.start = start;

      const args = this.formatFilterForRest(this.$route.query);
      this.fetchCommentData({ ...args, start });
      this.$router.replace({
        name: pageName,
        query: Object.assign({}, this.$route.query, this.filters),
      });
    },
    ...mapActions('commentdetail', ['fetchCommentData']),
    triggerHandler(args) {
      const params = this.formatFilterForRest({
        ...args,
        start: 0,
      });
      this.fetchCommentData(params);
      this.filters.start = 0;
    },
    sortableHandler({ order }) {
      if (!order) return;
      const sort = ['-createtime']; // '-point.general'
      const query = this.$route.query;
      const pageName = this.$route.name;

      if (order === 'desc') {
        sort.unshift('-point.general');
      } else if (order === 'asc') {
        sort.unshift('point.general');
      }

      const args = this.formatFilterForRest({
        ...query,
        start: 0,
      });

      this.$router.replace({
        name: pageName,
        query: {
          ...query,
          sort: order,
          start: 0,
        },
      });

      this.fetchCommentData({ ...args, sort });

      this.filters.start = 0;
    },
  },
  computed: {
    ...mapState('commentdetail', [
      'count',
      'comments',
      'replayTemplates',
      'references',
    ]),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.review-detail-container {
  position: relative;
  .pannel-wrap {
    background: #f2f2f2;
    padding: 20px 20px 50px;
    position: absolute;
    left: 0;
    right: 0;
    top: 95px;
    min-height: 100vh;
    .detail-pannel {
      background: #fff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      .title {
        font-size: 14px;
        padding: 7px 15px;
        font-size: 16px;
        border-bottom: 1px solid #f2f2f2;
      }
      .detail-wrap {
        .review-count {
          font-size: 14px;
          padding: 20px 15px;
          font-size: 16px;
        }
        .review-table {
          padding: 0 12px;
        }
        .fooer-page {
          text-align: right;
          padding: 18px 8px;
          margin: 0 15px;
        }
      }
    }
  }
}
</style>
