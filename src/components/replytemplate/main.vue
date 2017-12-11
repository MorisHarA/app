<template>
  <div class="reply-template-container">
    <slot></slot>
    <div class="top-bg"></div>
    <div class="float-wrap">
      <div class="section">
        <div class="btn-group">
          <div
            @click="deleteSelected"
            :class="selected.length > 0 ? 'info' : 'info disable'">
            删除选中模板
          </div>
          <div class="info" @click="create">添加新模板</div>
        </div>
        <Table
          ref="selection"
          @on-selection-change="selectChange"
          size="large"
          :columns="columns"
          :data="pageData">
        </Table>
        <div class="footer">
          <div class="float-left">
            <Checkbox v-model="single">全选</Checkbox>
          </div>
          <Page
            :total="list.length"
            :current="current"
            show-elevator
            @on-change="changePage">
          </Page>
        </div>
        <div class="under-header">
          共计<span class="text"> {{list.length}}条 </span>正在使用的模板
        </div>
      </div>
    </div>
    <Modal
      :title="templateid ? '修改模板' : '添加新模板'"
      v-model="showModal"
      class-name="reply-template-modal"
      @on-ok="submitTemplate"
      @on-Cancel="handleClear"
      :styles="{top: '20px'}">
      <div class="modal-wrap">
        <div class="title">模板内容</div>
        <div class="input-wrap">
          <textarea
            v-model="templatetext"
            type="textarea"
            :rows="4"
            placeholder="请输入内容">
          </textarea>
          <div class="count"><span :class="templatetext.length >= 200 ? 'red' : ''">{{templatetext.length}} </span> / 200</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import format from 'src/utils/format';
import { mapActions, mapState } from 'vuex';
import trashIcon from './imgs/trash.png';

export default {
  data() {
    return {
      showModal: false,
      templateid: null,
      templatetext: '',
      single: false,
      current: 1,
      selected: [],
      columns: [
        {
          type: 'selection',
          width: 40,
          align: 'center',
        },
        {
          title: '模板内容',
          key: 'text',
        },
        {
          title: '创建时间',
          width: 200,
          key: 'createtime',
          render: (h, params) =>
            h('div', format.formatTime(params.row.createtime, 6)),
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => h('div', [
            h('span', {
              style: {
                marginRight: '5px',
                color: '#2db7f5',
                cursor: 'pointer',
              },
              on: {
                click: () => {
                  this.updateTemplateModal(params.row.id, params.row.text);
                },
              },
            }, '修改此模板'),
            h('img', {
              attrs: {
                src: trashIcon,
              },
              style: {
                width: '15px',
                height: '14px',
                display: 'inline-block',
                verticalAlign: 'text-top',
                marginTop: '1px',
                marginLeft: '10px',
                cursor: 'pointer',
              },
              on: {
                click: () => {
                  this.remove(params.row.id);
                },
              },
            }, '删除'),
          ]),
        },
      ],
    };
  },
  components: {
  },
  created() {
    this.fetchReplyTemplateList();
  },
  methods: {
    ...mapActions('replytemplate', [
      'fetchReplyTemplateList',
      'removeReplyTemplate',
      'createTemplate',
      'updateTemplate',
      'removeReplyTemplates',
    ]),
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    remove(id) {
      const self = this;
      this.$Modal.confirm({
        title: '您确定要删除此模板吗？',
        content: '<p>删除后将无法恢复</p>',
        onOk: () => {
          self.removeReplyTemplate(id);
        },
        onCancel: () => {},
      });
    },
    create() {
      this.handleClear();

      this.showModal = true;
    },
    updateTemplateModal(id, text) {
      this.templatetext = text;
      this.templateid = id;
      this.showModal = true;
    },
    submitTemplate() {
      const { templateid, templatetext } = this;
      if (!templatetext || (templatetext.replace(/\s/g, '') === '')) {
        this.$Message.error('请填写模板内容~');
        return;
      }
      if (!templateid) {
        this.createTemplate({ text: templatetext });
      } else {
        this.updateTemplate({ id: templateid, text: templatetext });
      }
    },
    handleClear() {
      this.templatetext = '';
      this.templateid = null;
    },
    selectChange(selected) {
      const { pageData } = this;
      if (pageData.length > 0 && selected.length === pageData.length) {
        this.single = true;
      } else {
        this.single = false;
      }

      this.selected = selected;
    },
    deleteSelected() {
      const self = this;
      const { selected } = this;

      if (selected.length <= 0) return;

      this.$Modal.confirm({
        title: '您确定要删除这些模板吗？',
        content: '<p>删除后将无法恢复</p>',
        onOk: () => {
          self.removeReplyTemplates(selected);
          self.selected = [];
          self.handleSelectAll(false);
        },
        onCancel: () => {},
      });
    },
    changePage(page) {
      this.current = page;
      this.selected = [];
      this.handleSelectAll(false);
    },
  },
  computed: {
    ...mapState('replytemplate', ['list']),
    pageData() {
      const { current, list } = this;

      return list.slice((current - 1) * 10, current * 10);
    },
  },
  watch: {
    single(status) {
      if (!status && this.selected.length > 0 && this.selected.length !== this.pageData.length) {
        return;
      }
      this.handleSelectAll(status);
    },
    templatetext(val) {
      if (val.length > 200) {
        this.$Message.error('您的字数已超');
        this.templatetext = val.slice(0, 200);
      }
    },
  },
};

</script>

<style scoped lang="less" rel="stylesheet/less">
.reply-template-container {
  background-color: #f2f2f2;
  padding-bottom: 60px;
  .top-bg {
    background-image: url(../hospitaldetail/images/hospital.png);
    height: 250px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .float-wrap {
    margin-top: -90px;
    .section {
      padding: 27px 15px;
      margin: 20px 20px 0;
      background-color: #fff;
      border-radius: 5px;
      border-top: 1px solid #e5e5e5;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
      .under-header {
        margin-top: 10px;
        margin-left: 20px;
        .text {
          color: #2db7f5;
          font-weight: 600;
        }
      }
      .footer {
        margin-top: 20px;
        text-align: right;
        .float-left {
          float: left;
          margin-left: 19px;
        }
      }
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
      .btn-group {
        margin-bottom: 20px;
        .info {
          margin-right: 8px;
          color: #fff;
          background-color: #2db7f5;
          border-color: #2db7f5;
          display: inline-block;
          margin-bottom: 0;
          font-weight: 600;
          text-align: center;
          touch-action: manipulation;
          cursor: pointer;
          white-space: nowrap;
          padding: 4px 15px;
          font-size: 12px;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: all .3s cubic-bezier(.645,.045,.355,1);
        }
        .info.disable {
          color: #ccc;
          background-color: #f7f7f7;
          border-color: #d9d9d9;
        }
      }
    }
  }
  .reply-template-modal {
    background: #ccc;
  }
}
</style>
