<template>
  <div class="authority">
    <div class="head"><span>权限管理</span></div>
    <div class="layout">
      <div class="sub-head">权限管理</div>
      <div class="classification">
        <span>权限分类： </span>
        <div
          v-for="(i, index) in classes"
          :key="index"
          :class="['item', activeIdx === index && 'active']"
          @click="handleClassificationChange(index)"
        >
          {{i.name}}
        </div>
      </div>
      <div class="table">
        <div class="management">管理范围</div>
        <div class="tip">{{ activeDesc }}</div>
        <Button @click="routeToAddNumber" class="addNumber" type="primary">添加成员</Button>
        <Table class="anthor-table" :columns="columns" :data="list"></Table>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { Poptip } from 'iview'; // eslint-disable-line
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'authority',
    data() {
      return {
        columns: [
          {
            title: '成员姓名',
            key: 'fullName',
          },
          {
            title: '手机号',
            key: 'mobile',
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => (+params.row.id !== +this.userinfo.id ?
              h('Poptip', {
                props: {
                  title: '是否要删除此成员',
                  confirm: true,
                },
                on: {
                  'on-ok': () => {
                    const { index, row } = params;
                    this.$store.dispatch('authority/deleteAuthority', {
                      index,
                      id: row.id,
                    });
                  },
                  'on-cancel': () => {
                    console.log('cancel');
                  },
                },
              }, [
                h('div', {
                  style: {
                    color: '#1895ff',
                    cursor: 'pointer',
                  },
                }, '删除'),
              ]) :
              h('div', {
                style: {
                  color: '#8c8c8c',
                  cursor: 'not-allowed',
                },
              }, '删除')),
          },
        ],
      };
    },
    activated() {
      this.$store.dispatch('authority/setAuthorityActiveIndex', this.query.index || 0);
    },
    computed: {
      ...mapGetters('authority', ['list', 'activeIdx', 'activeAlias', 'activeDesc', 'classes']),
      ...mapGetters('login', ['userinfo']),
      ...mapState('route', ['query']),
    },
    methods: {
      handleClassificationChange(index) {
        this.$store.dispatch('authority/setAuthorityActiveIndex', index);
      },
      routeToAddNumber() {
        this.$router.push({
          name: 'addmember',
          query: {
            classify: this.activeAlias,
          },
        });
      },
    },
  };
</script>

<style lang="less" rel="stylesheet/less">
  .authority {
    background-color: #f2f2f2;
    .head {
      width: 100%;
      height: 48px;
      padding-top: 14px;
      font-weight: bold;
      font-size: 16px;
      background-color: #fff;
      color: #252834;
      border-bottom: 1px solid #e5e5e5;
      span {
        margin-left: 26px;
      }
    }
    .layout {
      padding: 0px 22px 0px 22px;
      .sub-head {
        font-size: 12px;
        color: #252834;
        font-weight: bold;
        margin: 16px 0px 16px 19px;
      }
      .classification {
        width: 100%;
        padding: 20px 0px 20px 0px;
        border-radius: 4px;
        background-color: #ffffff;
        color: #262626;
        font-size: 14px;
        span {
          margin-left: 25px;
        }
        .item {
          display: inline-block;
          cursor: pointer;
          width: 71px;
          height: 22px;
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          margin-left: 20px;
          &.active {
            border-radius: 4px;
            color: #ffffff;
            background-color: #1996ff;
          }
        }
      }
      .table {
        margin-top: 17px;
        padding: 23px 25px 40px 25px;
        background-color: #fff;
        border-radius: 4px;
        .management {
          font-size: 16px;
          font-weight: bold;
          color: #282828;
        }
       .tip {
         font-size: 14px;
         color: #8c8c8c;
         margin-top: 6px;
       }
       .addNumber {
         width: 88px;
         height: 32px;
         line-height: 0;
         font-size: 14px;
         float: right;
         margin-top: -46px;
       }
       .anthor-table {
          margin-top: 16px;
          border: 0px;
          color: #303030;
          .ivu-table  {
            font-size: 14px;
            .ivu-table-header {
              th {
                height: 50px;
              }
            }
            .ivu-table-body {
              td {
                height: 52px;
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
    }
  }
</style>

