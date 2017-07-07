<template>
  <div class="questionnairestat-container">
    <div class="chart-container">
      <div class="dashboard">
        <div class="goodrate">
          <div class="auto">
            <img src="./imgs/goodrate.png" >
            <span class="txt">满意度</span>
            <span class="score">85.3<span style="font-size: 16px">分</span></span>
          </div>
        </div>
        <div class="questionnaire-count">
          <div class="auto">
            <img src="./imgs/questionnairecount.png">
            <span class="txt">问卷数</span>
            <span class="score">1.002<span style="font-size: 16px">万份</span></span>
          </div>
        </div>
        <div class="questionnaire-push-count">
          <div class="auto">
            <img src="./imgs/pushcount.png">
            <span class="txt">问卷推送数</span>
            <span class="score">1<span style="font-size: 16px">份</span></span>
          </div>
        </div>
      </div>
      <div class="line-chart-conatiner">
        <div class="title">
          <div class="txt">问卷分析</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="less" rel="stylesheet/less">
  .questionnairestat-container{
    height: 2000px;
    .chart-container{
      height: 2000px;
      padding: 16px 22px 12px 22px;
      background-color: #f2f2f2;
      .dashboard{
        height:100px;
        overflow: hidden;
        div{
          width:32.4%;
          height: 100px;
          display: inline-block;
          border-radius: 6px;
          font-size: 14px;
          color: #fff;
          position: relative;
          .auto{
            width: 200px;
            height: 100px;
            position: absolute;
            left: 50%;
            margin-left: -100px;
            img{
              width: 49px;
              height: 49px;
              margin-top: 26px;
            }
            .txt{
              width: 110px;
              position: absolute;
              left: 72px;
              top : 24px;
            }
            .score{
              width: 110px;
              position: absolute;
              left: 70px;
              top : 42px;
              font-size: 30px;
            }
          }
        }
        .goodrate{
          background-color: #53acff;
        }
        .questionnaire-count{
          margin-left: 1%;
          background-color: #38db74;
        }
        .questionnaire-push-count{
          margin-left: 1%;
          background-color: #5c6977;
        }
      }
      .line-chart-conatiner{
        margin-top: 14px;
        background-color: #fff;
        height: 1000px;
        border:1px solid #e5e5e5;
        border-radius: 4px;
        .title{
          height: 34px;
          border-bottom:1px solid #e5e5e5;
          padding-top: 4px;
          box-sizing: border-box;
          font-size: 16px;
          .txt{
            margin-left: 16px;
          }
        }
      }
    }
  }
</style>
