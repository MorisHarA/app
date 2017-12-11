<template>
  <div class="privilege-addmember-container">
    <div class="">
      <div class="title">成员添加</div>
      <div class="content-wrap">
        <div class="breadcrumb">
          <span class="before" @click="handleRouterTo">权限管理</span>
          <span class="middle">></span>
          <span class="after">成员列表</span>
        </div>
        <div class="content">
          <div class="params">
            <div class="add-btn">
              <Button type="primary"
                :disabled="selected.length <= 0"
                @click="submitPageData">
                <span style="font-size: 14px;">＋ 添加已选</span>
              </Button>
            </div>
            <div class="search">
              <form v-on:submit.stop.prevent="handleSubmit">
                <input
                  class="input"
                  @input="handleInputChange"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  v-model.trim="value"
                  placeholder="请输入">
                </input>
                <div class="submit" @click="handleSubmit">搜索</div>
              </form>
              <div class="history" v-show="listStatus && historylist.length > 0">
                <ul>
                  <li class="hi"
                    @click="selectedKey(item)"
                    v-for="item in historylist"
                    v-bind:key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="operate" v-show="listStatus && historylist.length > 0">
                <div class="cancel" @click="handleHistoryCancel">关闭</div>
                <div class="clear" @click="handleHistoryClear">清空</div>
              </div>
            </div>
          </div>
          <div class="selected">
            <Alert show-icon>
              <div class="names">{{selected.length > 0 ? `${level}权限已选择` : `请选择需要添加${level}权限的成员名单。`}}</div>
              <div class="select-list">
                <span class="s"
                  v-for="(item,index) in selected"
                  v-bind:key="item+index">
                  {{ item.user.fullName + ((index + 1) === selected.length ? '' : '，') }}
                </span>
              </div>
              <div class="clear" v-show="selected.length > 0" @click="handleSelectAll(false)">清空</div>
            </Alert>
          </div>
          <div class="member-table">
            <Table ref="selection" :columns="columns" :data="pageData" @on-selection-change="handleSelectedChange"></Table>
            <div style="margin-top: 24px;overflow: hidden">
              <div style="float: right;">
                <Page
                  :total="members.length"
                  :current="currentPage"
                  @on-change="changePage"
                  @on-page-size-change="changePageSize"
                  show-sizer
                  show-elevator>
                </Page>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import { mapActions, mapGetters } from 'vuex';
import format from 'utils/format';

export default {
  name: 'addmember',
  components: {
    //
  },
  data() {
    return {
      value: '',
      listStatus: false,
      historylist: [],
      currentPage: 1,
      pageSize: 10,
      selected: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          key: 'fullName',
          render: (h, params) => h('div', params.row.user.fullName || '-'),
        },
        {
          title: '手机号',
          key: 'mobile',
          render: (h, params) => h('div', params.row.user.mobile || '-'),
        },
      ],
    };
  },
  created() {
    const { classify } = this.$route.query;
    if (classify) {
      this.fetchWaitManageUsers(classify);
    } else {
      this.$Message.warning('页面参数缺失');
    }
  },
  methods: {
    ...mapActions('member', [
      'submitSearchKeyword',
      'fetchWaitManageUsers',
      'submitAuthMember',
    ]),
    ...mapActions('authority', [
      'addAuthority',
    ]),
    handleInputChange() {
      const { listStatus } = this;
      if (!listStatus) {
        this.listStatus = true;
      }
    },
    handleSubmit() {
      const value = this.value;

      this.submitSearchKeyword(value);
      if (value !== '') this.setTheLocalStorage(value);
      this.listStatus = false;
    },
    setTheLocalStorage(value) {
      const local = format.getStorage('__member') || [];
      const index = local.findIndex(l => l === value);

      if (index !== -1) {
        local.splice(index, 1);
      }

      local.unshift(value);
      this.historylist = local;
      format.setStorage('__member', local);
    },
    handleFocus() {
      const local = format.getStorage('__member') || [];
      this.historylist = local;
      this.listStatus = true;
    },
    handleBlur() {
      // this.listStatus = false;
    },
    selectedKey(kw) {
      // console.log(kw);
      this.value = kw;
      this.setTheLocalStorage(kw);
      this.listStatus = false;
    },
    handleHistoryCancel() {
      this.listStatus = false;
    },
    handleHistoryClear() {
      format.setStorage('__member', '');
      this.historylist = [];
    },
    changePage(page) {
      this.currentPage = page;
    },
    changePageSize(size) {
      this.pageSize = size;
    },
    handleSelectedChange(data) {
      this.selected = data;
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleRouterTo() {
      this.$router.back();
    },
    submitPageData() {
      const { selected } = this;
      const { classify } = this.$route.query;

      this.submitAuthMember({
        data: selected,
        classify,
      });
      // 添加权限请求
      setTimeout(() => {
        // this.$router.back();
        this.selected = [];
        this.handleSelectAll(false);
      }, 1500);
    },
  },
  computed: {
    ...mapGetters('member', [
      'members',
    ]),
    pageData() {
      const { currentPage, pageSize, members } = this;
      return members.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    },
    level() {
      const { classify } = this.$route.query;
      return format.chooseLevel(classify);
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.privilege-addmember-container {
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 14px 26px 9px;
    border-bottom: 1px solid #e5e5e5;
    color: #252834;
  }
  .content-wrap {
    height: 100vh;
    background-color: #f2f2f2;
    .breadcrumb {
      padding: 16px 41px;
      .before {
        color: #999;
        cursor: pointer;
      }
      .after {
        font-weight: bold;
        color: #252834;
      }
      .middle {
        color: #999;
        margin-left: 6px;
        margin-right: 6px;
      }
    }
    .content {
      margin-left: 21px;
      margin-right: 24px;
      background-color: #fff;
      padding: 32px 25px;
      border-radius: 5px;
      .params {
        .add-btn {
          margin-top: 2px;
          display: inline-block;
        }
        .search {
          float: right;
          position: relative;
          .operate {
            position: absolute;
            top: 85px;
            left: 230px;
            z-index: 9;
            .cancel, .clear {
              background: #fff;
              padding: 0px 5px;
              border-radius: 5px;
              border: 1px solid #d9d9d9;
              cursor: pointer;
            }
            .cancel:hover, .clear:hover {
              color: #fff;
              background-color: #1995ff;
            }
            .clear {
              margin-top: 10px;
            }
          }
          .history {
            position: absolute;
            top: 39px;
            left: 0;
            width: 220px;
            z-index: 9;
            background-color: #fff;
            border-radius: 0 0 4px 4px;
            border: 1px solid #d9d9d9;
            border-top: none;
            padding: 5px 0 0;
            height: 150px;
            overflow-y: scroll;
            overflow-x: hidden;
            .hi {
              padding: 5px 12px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              cursor: pointer;
            }
            .hi:not(:last-child) {
              border-bottom: 1px dashed #d9d9d9;
            }
            .hi:hover {
              color: #2d8cf0;
              background-color: #d9d9d9;
            }
          }
          .input {
            width: 220px;
            height: 38px;
            border: 1px solid #d9d9d9;
            border-radius: 3px 0 0 3px;
            padding-left: 12px;
            outline: none;
            &::-webkit-input-placeholder {
              color: #bfbfbf;
            }
          }
          .submit {
            display: inline-block;
            color: #fff;
            background-color: #1995ff;
            padding: 10px 16px;
            border-radius: 0 3px 3px 0;
            margin-left: -4px;
            cursor: pointer;
            margin-top: 1px;
          }
        }
      }
      .selected {
        margin-top: 30px;
        .names, .select-list, .clear {
          display: inline-block;
          font-size: 14px;
        }
        .select-list {
          .s {
            color: #1995ff;
            font-weight: bold;
          }
        }
        .clear {
          color: #1995ff;
          margin-left: 15px;
        }
      }
      .member-table {
        margin-top: 20px;
      }
    }
  }
}
</style>
