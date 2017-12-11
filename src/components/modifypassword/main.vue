<template>
  <div class="modifypassword-container">
    <div class="bg-container"></div>
    <div class="info-wrap">
      <div class="info">
        <div class="detail">
          <div class="user-name">
            <div>姓名</div>：
            <span>{{userinfo.compellation}}</span>
          </div>
          <div class="sex">
            <div>性别</div>：
            <span>{{userinfo.gender | formatGender}}</span>
          </div>
          <div class="phone">
            <div>电话</div>：
            <span>{{userinfo.mobile}}</span>
          </div>
          <div class="mail">
            <div>电子邮箱</div>：
            <span>暂无</span>
          </div>
          <div class="relative">
            <div>相关描述</div>：
            <span>暂无</span>
          </div>
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
              旧密码：<input type="password" v-model="oldPassword">
            </div>
            <div class="wrap">
              新密码：<input type="password" v-model="newPassword">
            </div>
            <div class="wrap">
              确认新密码：
              <input
                type="password"
                @keydown.enter="confirm"
                v-model="confirmNewPassword"
              >
            </div>
          </div>
          <div class="operate">
            <div class="cancel" @click="closeToast">取消</div>
            <div class="confirm" @click="confirm">确认</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isShowToast: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  },
  filters: {
    formatGender(value) {
      switch (value) {
        case 0:
          return '保密';
        case 1:
          return '男';
        case 2:
          return '女';
        default:
          return '未知';
      }
    },
  },
  computed: {
    ...mapGetters('login', ['userinfo', 'modifySuccess']),
  },
  methods: {
    showToast() {
      this.isShowToast = true;
    },
    closeToast() {
      this.isShowToast = false;
    },
    confirm() {
      if (this.modifySuccess) {
        return;
      }
      if (!this.oldPassword) {
        this.$Message.warning('请输入旧密码');
        return;
      }
      if (!this.newPassword) {
        this.$Message.warning('请输入新密码');
        return;
      }
      if (!this.confirmNewPassword) {
        this.$Message.warning('请确认新密码');
        return;
      }
      if (this.newPassword !== this.confirmNewPassword) {
        this.$Message.warning('新密码两次输入不一致');
        return;
      }
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      this.modifyPassword(data);
    },
    ...mapActions('login', ['modifyPassword']),
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.modifypassword-container {
  min-width: 975px;
  margin-left: 175px;
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: all 0.3s ease;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-active {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .toast {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .form {
      width: 500px;
      height: 290px;
      border: 1px solid #e5e5e5;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -250px;
      margin-top: -200px;
      border-radius: 3px;
      .title {
        height: 49px;
        font-size: 16px;
        color: #666666;
        font-weight: bold;
        border-top: 1px solid transparent;
        border-bottom: 1px solid #e5e5e5;
        .txt {
          display: inline-block;
          margin-left: 34px;
          margin-top: 12px;
        }
        .close {
          width: 14px;
          height: 14px;
          margin-left: 360px;
          cursor: pointer;
        }
      }
      .input {
        height: 184px;
        font-size: 13px;
        color: #37474f;
        border-top: 1px solid transparent;
        border-bottom: 1px solid #e5e5e5;
        .wrap {
          &:nth-child(1) {
            margin-left: 61px;
            margin-top: 23px;
          }
          &:nth-child(2) {
            margin-left: 61px;
            margin-top: 15px;
          }
          &:nth-child(3) {
            margin-left: 34px;
            margin-top: 14px;
            input {
              margin-left: -3px;
            }
          }
          input {
            width: 273px;
            height: 35px;
            outline: none;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            padding-left: 8px;
          }
        }
      }
      .operate {
        height: 54px;
        font-size: 14px;
        cursor: pointer;
        background-color: #fafafa;
        .cancel {
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
        .confirm {
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
  .bg-container {
    width: 100%;
    height: 250px;
    background: url("./imgs/hospital.png") no-repeat;
    background-size: cover;
  }
  .info-wrap {
    padding-left: 24px;
    padding-right: 24px;
    margin: -56px auto 0px auto;
    height: 286px;
    .info {
      height: 288px;
      border-radius: 3px;
      background-color: #fff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.12);
      .detail {
        color: #828282;
        height: 229px;
        font-size: 14px;
        padding-left: 24px;
        padding-top: 35px;
        div {
          div {
            display: inline-block;
            width: 60px;
            text-align: justify;
            text-align-last: justify;
          }
          span {
            color: #000;
            font-weight: bold;
          }
        }
        .sex {
          margin-top: 14px;
        }
        .phone {
          margin-top: 14px;
        }
        .mail {
          margin-top: 14px;
        }
        .relative {
          margin-top: 14px;
        }
      }
      .modify {
        height: 59px;
        border-top: 1px solid #e5e5e5;
        background-color: #fafafa;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        .btn {
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
          margin-top: 11px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
