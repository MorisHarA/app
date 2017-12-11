<template>
  <div class="questionnaire-info-container">
    <div class="page-name">
      <div class="name">答卷详情</div>
    </div>
    <div class="main-content">
      <div class="page-link">
        <span class="a">满意度详情</span>
        <span class="right">></span>
        <span class="a action">答卷详情</span>
      </div>
      <div class="content">
        <div class="title">门诊患者满意度</div>
        <div class="question-info">
          <div class="wrap">
            <div class="question">您对急诊医生的服务满意吗？</div>
            <div class="answer">非常满意</div>
          </div>
          <div class="type">（做大选项）</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'satisfactiondetail',
    components: {},
  };
</script>

<style lang="less" scoped>
  .questionnaire-info-container {
    background-color: #f1f3f7;
    .page-name {
      border-bottom: 1px solid #e5e5e5;
      padding: 13px 26px;
      background-color: #fff;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .page-link {
      color: #828282;
      margin: 11px 0 11px 16px;
      .action {
        color: #252834;
        font-weight: bold;
      }
      .right {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
    .main-content {
      padding: 0 20px;
      .content {
        background-color: #fff;
        border-radius: 5px;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        .title {
          font-size: 16px;
          border-bottom: 1px solid #e5e5e5;
          padding: 5px 15px;
        }
        .question-info {
          padding: 24px 50px 24px 15px;
          .wrap {
            .question {
              font-size: 15px;
              font-weight: bold;
            }
            .answer {
              font-size: 16px;
              font-weight: bold;
              color: #0993ed;
              float: right;
            }
            .question, .answer {
              display: inline-block;
            }
          }
          .type {
            font-size: 14px;
            text-align: right;
            clear: both;
            margin-top: 4px;
            margin-right: -10px;
          }
        }
      }
    }
  }
</style>

