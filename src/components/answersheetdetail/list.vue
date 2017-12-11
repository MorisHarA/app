<template>
  <li class="list-container">
    <div class="title" v-if="isChildren">
      <div class="dot"></div>
      <span>{{ value.text }}</span>
    </div>
    <ul v-if="value.options && value.options.length" class="answers">
      <li class="answer" v-for="(item,index) in value.options" :key="index">
        <div
          class="answer-detail"
          :style="{
      	    marginBottom: item.reaction.questions && item.reaction.questions.length? '12px': '0px',
      	    marginTop:index == 0 ? '0px': '12px',
          }">
          <div class="name">{{item.text}}</div>
          <img v-if="ansInfo.index.indexOf(index) > -1" class="select" src="./imgs/select.png" >
        </div>
        <ul v-if="item.reaction.questions && item.reaction.questions.length">
          <list
            v-for="(value,index) in item.reaction.questions"
            :value="value"
            :qidInfo="qidInfo"
            :is-children="true"
            :key="`${value.type}${index}`">
          </list>
        </ul>
      </li>
    </ul>
    <div class="input-txt" v-else>
      <img class="comment" src="./imgs/comment.png" >
      <textarea
        :style="{height: `${height}px`}"
        ref="txt"
        disabled
        readonly
        v-model="ansInfo.text">
      </textarea>
    </div>
  </li>
</template>


<script type="text/ecmascript-6">
/* global _ */

export default {
  name: 'list',
  data() {
    return {
      height: '',
      handler: null,
      text: '',
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    isChildren: {
      type: Boolean,
      default: false,
    },
    qidInfo: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    const { throttle } = _;
    if (this.value.options && this.value.options.length) {
      return;
    }
    const caculateHeight = () => {
      this.height = this.$refs.txt.scrollHeight;
    };
    this.handler = throttle(caculateHeight, 1000);
    setTimeout(this.handler, 1);
    window.addEventListener('resize', this.handler);
  },
  beforeDestroy() {
    if (this.handler) window.removeEventListener('resize', this.handler);
  },
  computed: {
    ansInfo() {
      // for sub items
      if (!this.qidInfo[this.value.qid]) {
        return {
          index: [],
          text: '',
        };
      }
      return this.qidInfo[this.value.qid];
    },
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.list-container {
  color: #252834;
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
            margin-left: 74px;
          }
        }
        .answers {
          background-color: #f1f1f3;
          .answer {
            .answer-detail {
              .select {
                margin-right: 26.6%;
              }
              .name {
                display: inline-block;
                margin-left: 90px;
              }
            }
          }
        }
        .input-txt {
          background-color: #f8f8f8;
          textarea {
            background-color: #f8f8f8;
          }
        }
      }
      .title {
        background-color: #f1f1f3;
        .dot {
          background-color: #578bcb;
          margin-left: 56px;
        }
      }
      .answers {
        background-color: #f8f8f8;
        .answer {
          .answer-detail {
            .select {
              margin-right: 26.4%;
            }
            .name {
              display: inline-block;
              margin-left: 74px;
            }
          }
        }
      }
      .input-txt {
        background-color: #f8f8f8;
        textarea {
          background-color: #f8f8f8;
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
          .select {
            margin-right: 26.2%;
          }
          .name {
            display: inline-block;
            margin-left: 56px;
          }
        }
      }
    }
    .input-txt {
      background-color: #fcfcfc;
      textarea {
        background-color: #fcfcfc;
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
    padding: 12px 0px 12px 0px;
    .answer {
      font-size: 13px;
      line-height: 32px;
      .answer-detail {
        .name {
          display: inline-block;
          margin-left: 40px;
        }
        .select {
          width: 19px;
          text-align: left;
          float: right;
          margin-right: 26%;
          margin-top: 6px;
        }
      }
    }
  }
  .input-txt {
    padding: 14px 0px 14px 40px;
    .comment {
      width: 22px;
      height: 22px;
      display: block;
    }
    textarea {
      width: 100%;
      height: 19px;
      display: block;
      margin-left: 38px;
      margin-top: -20px;
      font-size: 13px;
      resize: none;
      border: 0;
      padding-right: 40px;
      background-color: #fff;
      color: #252834;
      line-height: normal;
    }
  }
}
</style>

