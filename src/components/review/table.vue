<template>
    <div class="review-table-wrap">
        <Table :columns="TRS" :data="comments" :start="2" @on-sort-change="sortTable"></Table>
        <Modal
            v-model="modalReply"
            title="回复评论"
            class-name="review-table-vertical-center-modal"
            @on-ok="submitReply"
            @on-cancel="modalCancel('reply')">
            <Input
                v-model="reply.text"
                type="textarea"
                :rows="4"
                placeholder="请输入回复内容">
            </Input>
            <Select
                v-model="selectModel"
                style="width:100%;margin-top:18px;"
                placeholder="请选择回复模板"
                @on-change="changeReplyModal">
                <Option v-for="item in templates"
                    :value="item.id"
                    :key="item.id">
                    {{ item.text }}
                </Option>
            </Select>
        </Modal>
        <Modal
            v-model="modalDispose"
            title="医院处理"
            class-name="review-table-vertical-center-modal"
            @on-ok="submitDealWith"
            @on-cancel="modalCancel('dispose')">
            <div class="dispose">
                <a><div :class="dispose ? 'consult active pannel':'consult pannel'"
                    @click="changeDisposeStyle(true)">
                    <div class="text">协商处理</div>
                    <p class="vice">经与病人沟通，仅显示处理结果</p>
                </div></a>
                <a><div :class="!dispose ? 'disposed active pannel':'disposed pannel'"
                    @click="changeDisposeStyle(false)">
                    <div class="text">处理完毕</div>
                    <p class="vice">该问题已处理完毕</p>
                </div></a>
            </div>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
import format from 'src/utils/format';
import { mapActions, mapState } from 'vuex';
import bad_icon from './images/bad.png';
import good_icon from './images/good.png';
import star_grey from './images/star_grey.png';
import star_blink from './images/star_blink.png';
import default_icon from './images/default_icon.png';

export default {
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    templates: {
      type: Array,
      default() {
        return [];
      },
    },
    references: {
      type: Array,
      default() {
        return [];
      },
    },
    sortableHandler: {
      type: Function,
    },
  },
  data() {
    return {
      reply: {
        id: '',
        text: '',
      },
      modalReply: false,
      modalDispose: false,
      dispose: null, // 1协商处理 2处理完毕
      selectModel: '',
      TRS: [
        {
          title: '编号',
          key: 'id',
          align: 'center',
          width: 80,
          render: (h, params) => {
            const { start } = this.$route.query;
            return h('div', start - 0 + 1 + params.index);
          },
        },
        {
          title: '评论内容',
          key: 'detail',
          align: 'center',
          render: (h, params) => {
            const {
              reference,
              division,
              region,
              text,
              commenter,
              dispose,
              reply,
            } = params.row;
            const killSurplusReg = /^\n+|\n+$/g;
            const replaceCrReg = /\r\n|\n|↵/g;

            let title = reference.building ? `${reference.building} ` : '';
            title += reference.floor ? `${reference.floor}层 ` : '';
            title += region
              ? region + (region.indexOf('病区') == '-1' ? '病区 ' : ' ')
              : '';
            title += division && division.name ? `${division.name} ` : '';
            title += reference.name ? reference.name : '';

            const contentArr = text
              .replace(killSurplusReg, '')
              .split(replaceCrReg);
            const contentChild = [];
            contentArr.map((t, index) => {
              if (contentArr[index - 1] || t) {
                contentChild.push(
                  h(
                    'div',
                    {
                      style: {
                        minHeight: '21px',
                      },
                    },
                    t,
                  ),
                );
              }
            });

            const rightHTML = [
              h(
                'div',
                {
                  style: {
                    fontWeight: 'bold',
                    marginTop: '5px',
                  },
                },
                `${title}:`,
              ),
              h(
                'div',
                {
                  style: {
                    marginTop: '5px',
                    marginBottom: '10px',
                  },
                },
                contentChild,
              ),
            ];

            if (reply) {
              reply.map((d) => {
                const textArr = d.text
                  .replace(killSurplusReg, '')
                  .split(replaceCrReg);
                const textChild = [];
                textArr.map((t, index) => {
                  if (textArr[index - 1] || t) {
                    textChild.push(
                      h(
                        'div',
                        {
                          style: {
                            minHeight: '21px',
                          },
                        },
                        t,
                      ),
                    );
                  }
                });
                rightHTML.push(
                  h('div', [
                    h(
                      'span',
                      {
                        style: {
                          fontWeight: 'bold',
                        },
                      },
                      '医院回复',
                    ),
                    h(
                      'span',
                      {
                        props: {
                          class: 'title',
                        },
                        style: {
                          marginLeft: '5px',
                          color: '#999',
                        },
                      },
                      format.formatTime(d.createtime, 6),
                    ),
                    h(
                      'div',
                      {
                        style: {
                          marginBottom: '15px',
                        },
                      },
                      textChild,
                    ),
                  ]),
                );
              });
            }

            const childHTML = [
              h(
                'div',
                {
                  style: {
                    backgroundImage: `url(${commenter && commenter.icon
                      ? commenter.icon
                      : default_icon})`,
                    width: '25px',
                    height: '25px',
                    backgroundSize: 'cover',
                    float: 'left',
                  },
                },
                '',
              ),
              h(
                'div',
                {
                  style: {
                    marginLeft: '30px',
                  },
                },
                rightHTML,
              ),
            ];

            const wrapHTML = [
              h(
                'div',
                {
                  style: {
                    textAlign: 'left',
                    marginTop: '20px',
                  },
                },
                childHTML,
              ),
            ];

            return h('div', wrapHTML);
          },
        },
        {
          title: '联系电话',
          key: 'mobile',
          align: 'center',
          width: 120,
          render: (h, params) => {
            const { commenter } = params.row;
            return h(
              'div',
              commenter && commenter.mobile ? commenter.mobile : '无',
            );
          },
        },
        {
          title: '医生',
          key: 'staff',
          align: 'center',
          width: 55,
          render: (h, params) =>
            h('div', [
              h('i', {
                style: {
                  width: '15px',
                  display: 'inline-block',
                  backgroundImage: `url(${params.row.point.staff >= 4
                    ? good_icon
                    : bad_icon})`,
                  height: '15px',
                  backgroundSize: 'cover',
                },
              }),
            ]),
        },
        {
          title: '环境',
          key: 'environment',
          align: 'center',
          width: 55,
          render: (h, params) =>
            h('div', [
              h('i', {
                style: {
                  width: '15px',
                  display: 'inline-block',
                  backgroundImage: `url(${params.row.point.environment >= 4
                    ? good_icon
                    : bad_icon})`,
                  height: '15px',
                  backgroundSize: 'cover',
                },
              }),
            ]),
        },
        {
          title: '服务',
          key: 'serve',
          align: 'center',
          width: 55,
          render: (h, params) =>
            h('div', [
              h('i', {
                style: {
                  width: '15px',
                  display: 'inline-block',
                  backgroundImage: `url(${params.row.point.service >= 4
                    ? good_icon
                    : bad_icon})`,
                  height: '15px',
                  backgroundSize: 'cover',
                },
              }),
            ]),
        },
        {
          title: '评分',
          key: 'level',
          align: 'center',
          sortable: 'custom',
          width: 130,
          render: (h, params) => {
            const grade = params.row.point.general;
            const renderStar = [];

            const blink = h('i', {
              style: {
                width: '15px',
                display: 'inline-block',
                backgroundImage: `url(${star_blink})`,
                height: '15px',
                marginLeft: '5px',
                backgroundSize: 'cover',
              },
            });

            const grey = h('i', {
              style: {
                width: '15px',
                display: 'inline-block',
                backgroundImage: `url(${star_grey})`,
                height: '15px',
                marginLeft: '5px',
                backgroundSize: 'cover',
              },
            });

            for (let i = 0; i < 5; i++) {
              if (i < grade) {
                renderStar.push(blink);
              } else {
                renderStar.push(grey);
              }
            }

            return h('div', renderStar);
          },
        },
        {
          title: '发布时间',
          key: 'createtime',
          width: 140,
          align: 'center',
          render: (h, params) =>
            h(
              'div',
              {
                props: {
                  href: 'javascript: void(0);',
                },
                style: {
                  display: 'block',
                },
              },
              format.formatTime(params.row.createtime, 6),
            ),
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          width: 90,
          render: (h, params) => {
            const { dispose } = params.row;
            let status = null;
            if (dispose) {
              status = dispose.hidden;
            }

            return h('div', [
              h(
                'a',
                {
                  attrs: {
                    href: 'javascript: void(0);',
                  },
                  style: {
                    display: 'block',
                    color: status == null ? '#2d8cf0' : 'red',
                    cursor: status == null ? 'pointer' : 'not-allowed',
                  },
                  on: {
                    click: () => {
                      status == null && this.showReply(params.row);
                    },
                  },
                },
                status == null ? '回复评论' : status ? '协商处理' : '处理完毕',
              ),
              h(
                'a',
                {
                  attrs: {
                    href: 'javascript: void(0);',
                  },
                  style: {
                    marginTop: '5px',
                    display: 'block',
                  },
                  on: {
                    click: () => {
                      this.showDispose(params.row);
                    },
                  },
                },
                status == null ? '处理评论' : '修改处理',
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions('commentdetail', ['replyComment']),
    showReply(params) {
      const { id, dispose, reply } = params;
      let text = '';

      if (reply && reply.length > 0) {
        text = reply[0].text;
      }

      this.selectModel = '';
      this.reply.id = id;
      this.reply.text = text;
      this.modalReply = true;
    },
    showDispose(params) {
      this.reply.id = params.id;
      this.dispose = params.dispose ? params.dispose.hidden : false;
      this.modalDispose = true;
    },
    submitReply() {
      const { id, text } = this.reply;

      if (!text) {
        this.$Message.error('请输入评论内容后再提交！', 2);
        return;
      }

      const release = {
        reply: {
          text,
        },
      };

      this.replyComment({ id, release });

      this.reply.text = '';
      this.reply.id = '';
      this.dispose = null;
    },
    submitDealWith() {
      const { reply, dispose } = this;
      const id = reply.id;

      const release = {
        dispose: {
          display: dispose
            ? '本次问题已与患者沟通后妥善解决。为保护患者隐私，故本次评论暂不予显示，如有任何疑问可联系本站管理人员。'
            : '院方已处理',
          hidden: dispose,
          state: '已处理',
        },
      };

      this.replyComment({ id, release });
      this.dispose = null;
      this.reply.id = '';
    },
    changeReplyModal(id) {
      if (!id) return;
      const replyObj = this.templates.filter(d => d.id === id);

      this.reply.text = replyObj[0].text;
    },
    modalCancel(type) {
      if (type === 'reply') {
        this.modalReply = false;
        this.reply.id = '';
        this.reply.text = '';
      } else if (type === 'dispose') {
        this.modalDispose = false;
        this.dispose = null;
        this.reply.id = '';
      }
    },
    changeDisposeStyle(type) {
      this.dispose = type;
    },
    sortTable(e) {
      this.sortableHandler(e);
    },
  },
  computed: {
    ...mapState('filters', ['divisions']),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.review-table-wrap {
}
</style>
