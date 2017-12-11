<template>
  <div class="satisfaction-detail-container">
    <div class="page-name">
      <div class="name">满意度详情</div>
    </div>
    <div class="main-content">
      <div class="page-link">
        <span class="a">满意度统计</span>
        <span class="right">></span>
        <span class="a action">满意度详情</span>
      </div>
      <div class="content">
        <div class="title">满意度详情</div>
        <div class="area-info">
          <div class="small">
            <span class="i">门诊</span>
            <span class="i">总得分</span>
          </div>
          <div class="large">100</div>
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
  .satisfaction-detail-container {
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
        .area-info {
          font-size: 15px;
          font-weight: bold;
          padding: 27px 15px;
          .large {
            font-size: 24px;
            color: #0993ed;
          }
          .small, .large {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>

