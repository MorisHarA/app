<template>
  <div class="modifypassword-container">
    <div class="bg-container"></div>
    <div class="info-wrap">
      <div class="info">
        <div class="detail">
          <div class="user-name">姓名：<span>匿名用户</span></div>
          <div class="sex">性别：<span>男</span></div>
          <div class="phone">电话：<span>12838948559</span></div>
          <div class="mail">电子邮箱：<span>暂无</span></div>
          <div class="relative">相关描述：<span>暂无</span></div>
        </div>
        <div class="modify">
          <div class="btn" @click="showToast">修改密码</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="toast" v-if="isShowToast">
        <div class="form">
          <div class="title">
            <div class="txt">修改密码</div>
            <img class="close" @click="closeToast" src="./imgs/close.png" />
          </div>
          <div class="input">
            <div class="wrap">
              旧密码：<input type="password">
            </div>
            <div class="wrap">
              新密码：<input type="password">
            </div>
            <div class="wrap">
              确认新密码：<input type="password">
            </div>
          </div>
          <div class="operate">
            <div class="cancel" @click="closeToast">取消</div>
            <div class="confirm">确认</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
    	return {
        isShowToast:false
      }
    },
    methods:{
      showToast(){
      	this.isShowToast = true
      },
      closeToast(){
        this.isShowToast = false
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .modifypassword-container{
    min-width: 975px;
    margin-left: 175px;
    .fade-enter{
      opacity: 0;
    }
    .fade-enter-active {
      opacity: 1;
      transition: all .3s ease;
    }
    .fade-leave{
      opacity: 1;
    }
    .fade-leave-active {
      opacity: 0;
      transition: all .3s ease;
    }
    .toast{
      width: 100%;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0,0.6);
      .form{
        width: 500px;
        height: 290px;
        border: 1px solid #e5e5e5 ;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -200px;
        border-radius: 3px;
        .title{
          height:49px;
          font-size: 16px;
          color: #666666;
          font-weight: bold;
          border-top: 1px solid transparent;
          border-bottom: 1px solid #e5e5e5;
          .txt{
            display: inline-block;
            margin-left: 34px;
            margin-top: 12px;
          }
          .close{
            width: 14px;
            height: 14px;
            margin-left: 360px;
            cursor: pointer;
          }
        }
        .input{
          height:184px;
          font-size: 13px;
          color: #37474f;
          border-top: 1px solid transparent;
          border-bottom: 1px solid #e5e5e5;
          .wrap{
            &:nth-child(1){
              margin-left: 61px;
              margin-top: 23px;
            }
            &:nth-child(2){
              margin-left: 61px;
              margin-top: 15px;
            }
            &:nth-child(3){
              margin-left: 34px;
              margin-top: 14px;
            }
            input{
              width: 273px;
              height: 35px;
              outline: none;
              border:1px solid #e5e5e5;
              border-radius: 3px;
              padding-left: 8px;
            }
          }
        }
        .operate{
          height:54px;
          font-size: 14px;
          cursor: pointer;
          background-color: #fafafa;
          .cancel{
            width: 64px;
            display: inline-block;
            height: 32px;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            background-color: #fff;
            line-height: 32px;
            text-align: center;
            color: #666666;
            border-radius: 3px;
            margin-left: 333px;
            margin-top: 10px;
          }
          .confirm{
            width: 64px;
            display: inline-block;
            height: 30px;
            background-color: #0993ed;
            line-height: 30px;
            text-align: center;
            color: #fff;
            border-radius: 3px;
            margin-left: 9px;
          }
        }
      }
    }
    .bg-container{
      width: 100%;
      height: 252px;
      background: url("./imgs/bg.png");
      background-size: 872px 252px;
    }
    .info-wrap{
      padding-left:24px;
      padding-right: 24px;
      margin: -56px auto 0px auto;
      height: 286px;
      .info{
        height:288px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0px 3px 3px #ccc;
        .detail{
          color: #828282;
          height: 229px;
          font-size: 14px;
          padding-left: 24px;
          padding-top: 35px;
          div{
            span{
              color: #000;
              font-weight: bold;
            }
          }
          .sex{
            margin-top: 14px;
          }
          .phone{
            margin-top: 14px;
          }
          .mail{
            margin-top: 14px;
          }
          .relative{
            margin-top: 14px;
          }
        }
        .modify{
          height:59px;
          border-top: 1px solid #e5e5e5;
          background-color:#fafafa;
          .btn{
            width: 87px;
            height: 32px;
            background-color: #0993ed;
            border-radius: 3px;
            font-size: 14px;
            color: #fff;
            line-height: 32px;
            text-align: center;
            font-weight: bold;
            margin-left: 37px;
            margin-top:11px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
