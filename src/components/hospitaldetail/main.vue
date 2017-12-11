<template>
    <div class="hospital-detail-container">
      <slot></slot>
        <div class="top-bg"></div>
        <div class="float-wrap">
            <div class="hospital-info section">
                <div class="detail">
                    <div class="logo">
                        <img :src="hospital.logo">
                    </div>
                    <div class="info">
                        <div class="title">{{hospital.name}}</div>
                        <div class="dish">
                            <div class="item">
                                <div class="patch">
                                    <div class="head">医院总评：</div>
                                    <Rate class="rate" disabled :value="level"></Rate>
                                </div>
                                <div class="patch">
                                    <div class="head">医院等级：</div>
                                    <div class="text">{{hospital.level}}</div>
                                </div>
                            </div>
                            <div class="item feat">
                                <div class="head">所属区县：</div>
                                <div class="text">{{hospital.district}}</div>
                            </div>
                            <div class="item">
                                <div class="head">医院地址：</div>
                                <div class="text">{{hospital.address}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="qr-code">
                    <qrcode class="code" :value="qrCodeLink"></qrcode>
                </div>
            </div>
            <div class="hospital-intro section">
                <div class="header">
                    科室信息
                </div>
                <div class="content">
                    <Table
                        stripe
                        :columns="columns"
                        :data="divisions">
                    </Table>
                </div>
                <div class="fooer-page">
                    <Page
                        :total="count.value"
                        :current="start/10 + 1"
                        show-elevator
                        @on-change="handlePageChange">
                    </Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import qrcode from 'vue-qrcode';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      columns: [
        {
          title: '科室',
          key: 'name',
          sortable: true,
        },
      ],
      target: 'https://api.w-se.cn/',
      limit: 10,
      start: 0,
    };
  },
  components: {
    qrcode,
  },
  created() {
    const { limit } = this;
    const { start } = this.$route.query || 0;

    this.$router.replace({
      name: this.$route.name,
      query: {
        start,
      },
    });

    this.fetchDivisionData({ limit, start });
  },
  methods: {
    handlePageChange(page) {
      const limit = this.limit;
      const start = (page - 1) * 10;

      this.start = start;
      this.$router.replace({
        name: this.$route.name,
        query: { start },
      });

      this.fetchDivisionData({ limit, start });
    },
    ...mapActions('hospitaldetail', ['fetchDivisionData']),
  },
  computed: {
    ...mapState('hospitaldetail', ['hospital', 'divisions', 'count']),
    qrCodeLink() {
      const { id } = this.hospital;
      return id
        ? `http://api.highwho.com/wise/wx/redirect/spirit/hos/${id}/contact_binding`
        : '';
    },
    level() {
      if (!this.hospital.comment) return 0;

      const general = this.hospital.comment.sumpoint.general;
      const num = this.hospital.comment.count;

      const val = num > 0 ? (general / num).toPrecision(3) : 0;
      const harf = Math.floor(val) + 0.5;

      return Number(val < harf ? val : harf);
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.hospital-detail-container {
  background-color: #f2f2f2;
  padding-bottom: 60px;
  .top-bg {
    background-image: url(./images/hospital.png);
    height: 250px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .float-wrap {
    margin-top: -90px;
    .hospital-info {
      position: relative;
      .detail {
        .logo {
          float: left;
          margin-top: 10px;
          img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 1px solid #e5e5e5;
          }
        }
        .info {
          margin-left: 160px;
          .title {
            font-size: 18px;
            color: #252834;
            font-weight: bold;
          }
          .dish {
            margin-top: 15px;
            font-size: 14px;
            .item {
              margin-top: 15px;
              .patch {
                display: inline-block;
                margin-right: 70px;
              }
              .head {
                display: inline-block;
                color: #828282;
              }
              .text {
                display: inline-block;
                color: #252834;
              }
              .rate {
                margin-top: -4px;
              }
            }
            .feat.item {
              margin-top: 13px;
            }
          }
        }
      }
      .qr-code {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 158px;
        text-align: center;
        background-color: #fafafa;
        padding-top: 53px;
        border-radius: 0 5px 5px 0;
        .code {
          padding: 5px 4px 4px 5px;
          border: 1px solid #e5e5e5;
          background-color: #fff;
        }
      }
    }
    .section {
      margin: 20px 20px 0;
      background-color: #fff;
      border-radius: 5px;
      border-top: 1px solid #e5e5e5;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
      .detail {
        padding: 35px 25px 30px;
      }
      .content {
        padding: 15px;
      }
      .header {
        font-size: 16px;
        padding: 10px 15px;
        border-bottom: 1px solid #e5e5e5;
      }
      .fooer-page {
        text-align: right;
        padding: 5px 20px 20px;
      }
    }
  }
}
</style>
