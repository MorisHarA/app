import router from 'router';
import store from 'store';
import Message from 'iview/src/components/message';

export default {
  unauthorized(to) {
    const {
      fullPath,
      name,
    } = to || store.state.route;
    if (name === 'login') {
      Message.error('账号或密码错误，请重新输入!');
    } else {
      this.clearData();
      if (to) {
        router.replace({
          name: 'login',
          query: {
            redirect: fullPath,
          },
        });
        Message.error('授权已过期，请重新登录!');
      } else {
        Message.error({
          content: '授权已过期，请重新登录!',
          duration: 3,
          onClose() {
            router.replace({
              name: 'login',
              query: {
                redirect: fullPath,
              },
            });
          },
        });
      }
    }
  },
  clearData() {
    localStorage.clear();
  },
  clearAuthorized() {
    this.clearData();
    router.replace({
      name: 'login',
    });
  },
  checkAuthorized() {
    const token = localStorage.token;
    const expire = localStorage.expire;
    if (!token || (expire * 1000) - new Date().getTime() < 0) {
      return false;
    }
    return true;
  },
  authorized() {
    const {
      query,
    } = store.state.route;
    if (query.redirect) {
      router.replace({
        path: query.redirect,
      });
    } else {
      router.replace({
        name: 'hospital',
      });
    }
  },
};
