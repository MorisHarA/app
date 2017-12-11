<template>
  <div class="analysis">
    <div class="title"><span>满意度分析</span></div>
    <div class="table-container">
      <Table class="table" :columns="columns" :data="list"></Table>
    </div>
    <Page :total="100" show-elevator></Page>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'analysis',
    data() {
      return {
        list: Array.from({ length: 10 }).fill({
          item: 'kobe',
          score: 100,
          action: '查看详情',
        }),
        columns: [
          {
            title: '满意度项',
            key: 'item',
            className: 'first',
          },
          {
            title: '得分',
            key: 'score',
            className: 'second',
          },
          {
            title: '操作',
            key: 'action',
            className: 'third',
            render: (h, params) =>
              h('div', {
                on: {
                  click: () => {
                    console.log(params);
                    this.$router.push({
                      name: 'satisfactiondetail',
                    });
                  },
                },
              },
              '查看详情',
            ),
          },
        ],
      };
    },
  };
</script>

<style lang="less">
  .analysis {
    padding-bottom: 28px;
    margin-top: 18px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 2.5px 1.5px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    .title {
      height: 39px;
      font-size: 16px;
      line-height: 39px;
      color: #252834;
      border-bottom: 1px solid #e8e8e8;
      span {
        margin-left: 12px;
      }
    }
    .table-container {
      padding: 16px 14px 26px 14px;
      .table {
        border: 0px;
        .ivu-table {
          font-size: 14px;
          .ivu-table-header {
            th {
              height: 47px;
              font-size: 15px;
              color: #252834;
              &.first {
                text-align: left;
              }
              &.second {
                text-align: center;
              }
              &.third {
                text-align: right;
                .ivu-table-cell {
                  padding-right: 48px;
                }
              }
            }
          }
          .ivu-table-body {
            td {
              height: 47px;
              font-size: 14px;
              &.first {
                text-align: left;
                .ivu-table-cell {
                  color: #1895ff;
                }
              }
              &.second {
                text-align: center;
              }
              &.third {
                text-align: right;
                .ivu-table-cell {
                  padding-right: 36px;
                  color: #1895ff;
                  cursor: pointer;
                }
              }
            }
          }
          &:before {
            width: 0px;
          }
          &:after {
            width: 0px;
          }
        }
      }
    }
    .ivu-page {
      float: right;
      margin-right: 37px;
    }
  }
</style>
