<template>
  <li class="list-container">
    <div class="title"><div class="dot"></div><span>{{value.text}}</span></div>
    <ul v-if="value.options && value.options.length" class="answers">
      <li class="answer" v-for="(item,index) in value.options" :key="index">
        <div class="answer-detail"
             :style="{
      	        marginBottom:item.reaction.questions && item.reaction.questions.length? '12px': '0px',
      	        marginTop:index == 0 ? '0px': '12px',
              }">
          <div class="name">{{item.text}}</div>
          <div class="detail" @click="routerToAnswersheetdetail(index)">查看详情</div>
          <div class="per">占 {{formatPer(item.sheetcount)}}%</div>
          <div class="count">{{item.sheetcount}}人</div>
          <v-progress class="v-progress" limit="50" :percent="total == 0 ? 0 : (item.sheetcount/total)"></v-progress>
        </div>
        <ul v-if="item.reaction.questions && item.reaction.questions.length">
          <list
            v-for="(value,index) in item.reaction.questions"
            :value="value"
            :$qid="_qid"
            :qid="value.qid"
            :total="total"
            :qnid="qnid"
            :type="value.type"
            :name="name"
            :key="`${value.qid}${index}`">
          </list>
        </ul>
      </li>
    </ul>
    <div class="input-txt" v-else>
      <img class="comment" src="./imgs/comment.png" >
      <span>查看患者回复详情，请点击右侧“查看详情”</span>
      <span class="detail" @click="routerToAnswersheetdetail(-1)">查看详情</span>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
import VProgress from './progress';

export default {
  name: 'list',
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    total: {
      type: Number | String,
    },
    $qid: {
      type: Number | String,
    },
    qid: {
      type: Number | String,
    },
    qnid: {
      type: Number | String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  computed: {
    _qid() {
      if (this.$qid === '') {
        return this.qid;
      }
      return `${this.$qid}_${this.qid}`;
    },
  },
  methods: {
    formatPer(count) {
      return ((+count / this.total).toFixed(2) * 100) | 0;
    },
    routerToAnswersheetdetail(index) {
      const { query } = this.$route;
      this.$router.push({
        name: 'answersheetdetail',
        query: {
          ...query,
          _qid: this._qid,
          qnid: this.qnid,
          qname: this.name,
          type: this.type,
          index,
        },
      });
    },
  },
  components: {
    VProgress,
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.list-container {
  .list-container {
    background-color: #f8f8f8;
    .list-container {
      background-color: #f1f1f3;
      .list-container {
        background-color: #eaeaec;
        .title {
          background-color: #eaeaec;
          .dot {
            background-color: #80a8d9;
            margin-left: 68px;
          }
        }
        .answers {
          background-color: #f1f1f3;
          .answer {
            .answer-detail {
              .count {
                margin-right: 7.72%;
              }
              .v-progress {
                margin-right: 7.72%;
              }
              .per {
                margin-right: 7.72%;
              }
              .name {
                display: inline-block;
                margin-left: 80px;
              }
            }
          }
        }
      }
      .title {
        background-color: #f1f1f3;
        .dot {
          background-color: #578bcb;
          margin-left: 55px;
        }
      }
      .answers {
        background-color: #f8f8f8;
        .answer {
          .answer-detail {
            .count {
              margin-right: 7.66%;
            }
            .v-progress {
              margin-right: 7.66%;
            }
            .per {
              margin-right: 7.66%;
            }
            .name {
              display: inline-block;
              margin-left: 68px;
            }
          }
        }
      }
    }
    .title {
      color: #565656;
      background-color: #f8f8f8;
      font-size: 14px;
      .dot {
        width: 12px;
        height: 12px;
        display: inline-block;
        background-color: #266bbf;
        border-radius: 50%;
        position: relative;
        top: 1px;
        margin-left: 40px;
      }
      span {
        margin-left: 13px;
      }
    }
    .answers {
      background-color: #fcfcfc;
      margin-left: 13px;
      .answer {
        .answer-detail {
          .count {
            margin-right: 7.58%;
          }
          .v-progress {
            margin-right: 7.58%;
          }
          .per {
            margin-right: 7.58%;
          }
          .name {
            display: inline-block;
            margin-left: 53px;
          }
        }
      }
    }
    .input-txt {
      background-color: #fcfcfc;
      height: 48px;
      line-height: 48px;
      span {
        &.detail {
          height: 48px;
        }
      }
    }
  }
  .title {
    height: 49px;
    line-height: 49px;
    background-color: #fafafa;
    font-size: 15px;
    font-weight: bold;
    color: #266bbf;
    span {
      margin-left: 16px;
    }
  }
  .answers {
    background-color: #ffffff;
    padding: 12px 0px 12px 0px;
    .answer {
      font-size: 13px;
      line-height: 32px;
      .answer-detail {
        .count {
          width: 40px;
          text-align: left;
          float: right;
          margin-right: 7.5%;
        }
        .v-progress {
          float: right;
          margin-top: 10px;
          margin-right: 7.5%;
        }
        .per {
          float: right;
          width: 70px;
          margin-right: 7.5%;
        }
        .detail {
          float: right;
          margin-right: 30px;
          width: 58px;
          height: 32px;
          cursor: pointer;
          color: #0993ed;
          font-weight: bold;
        }
        .name {
          display: inline-block;
          margin-left: 40px;
        }
      }
    }
  }
  .input-txt {
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    .comment {
      width: 22px;
      height: 22px;
      margin-left: 40px;
      vertical-align: middle;
    }
    span {
      margin-left: 14px;
      font-size: 13px;
      color: #666666;
      &.detail {
        float: right;
        width: 58px;
        height: 60px;
        cursor: pointer;
        color: #0993ed;
        font-weight: bold;
        margin-right: 30px;
      }
    }
  }
}
</style>
