/**
 * Created by luandapeng on 2017/7/10.
 */

/* global _ */
import * as Api from 'api';
import Auth from 'authorize';
import Message from 'iview/src/components/message';
import Utils from '../../utils/format';

import {
  LOGIN_SUCCESS,
  FETCH_USER_INFO_SUCCESS,
  MODIFY_STATUS,
  SET_AUTH_LIST,
  CLEAR_AUTH_LIST,
} from '../mutation-types';

const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default {
  namespaced: true,

  state: {
    user: localStorage.user || '',
    hospitalId: localStorage.hospitalId || '',
    userinfo: {},
    modifySuccess: false,
    authList: ['modifypassword', 'error', 'satisfactionstat'],
  },

  getters: {
    userinfo: state => state.userinfo,
    hospitalid: state => state.userinfo.hospitalid,
    hospitalId: state => state.hospitalId,
    modifySuccess: state => state.modifySuccess,
    authList: state => state.authList,
  },

  actions: {
    login: async ({ commit, dispatch, getters }, payload) => {
      try {
        const res = await Api.login(payload);
        if (res) {
          commit(LOGIN_SUCCESS, res);
          Object.keys(res.data).forEach((key) => {
            localStorage.setItem(key, res.data[key]);
          });
          await dispatch('fetchUserInfo');
          localStorage.setItem('hospitalId', getters.hospitalid);
          dispatch('loginSuccess');
        }
      } catch (e) {
        console.log(e);
      }
    },
    loginSuccess: ({ getters }) => {
      if (getters.hospitalid) {
        Auth.authorized();
      } else {
        Message.error('您还未绑定任何一家医院!');
      }
    },
    getUserInfo: async ({ getters, dispatch }) => {
      if (_.isEmpty(getters.userinfo)) {
        dispatch('fetchUserInfo');
      }
    },
    fetchUserInfo: async ({ commit, state }) => {
      try {
        const res = await Api.fetchUserInfo(state.user);
        if (res) {
          commit(FETCH_USER_INFO_SUCCESS, res);
        }
      } catch (e) {
        console.log(e);
      }
    },
    modifyPassword: async ({ commit, state }, payload) => {
      try {
        const res = await Api.modifyPassword(payload, state.user);
        if (res) {
          commit(MODIFY_STATUS, true);
          Message.success({
            content: '密码修改成功，请重新登录',
            duration: 1.5,
          });
          await delay(1500);
          commit(MODIFY_STATUS, false);
          Auth.clearAuthorized();
        }
      } catch (e) {
        if (e.response.status === 403) {
          Message.error('旧密码错误，请重新输入');
        }
      }
    },
    fetchManagerAuth: async ({ commit, getters }) => {
      let result = [];
      try {
        const res = await Api.fetchManagerAuth(Object.keys(Utils.authMap), +getters.hospitalId);
        if (res) {
          const { hasAuthorities } = res.data.hospital.employee;
          const authorities = (hasAuthorities === null || hasAuthorities.length === 0) ?
            [Utils.searchAuthMapByLocalKey('hospitaldetail')] :
            hasAuthorities.map(i => Utils.authMap[i]).concat(getters.authList);
          result = authorities;
          commit(SET_AUTH_LIST, authorities);
        }
      } catch (e) {
        console.log(e);
      }
      return result;
    },
  },

  mutations: {
    [LOGIN_SUCCESS]: (state, res) => {
      state.user = res.data.user;
    },
    [FETCH_USER_INFO_SUCCESS]: (state, res) => {
      state.userinfo = res.data;
      state.hospitalId = res.data.hospitalid;
    },
    [MODIFY_STATUS]: (state, payload) => {
      state.modifySuccess = payload;
    },
    [SET_AUTH_LIST]: (state, payload) => {
      state.authList = payload;
    },
    [CLEAR_AUTH_LIST]: (state) => {
      state.authList = ['hospitaldetail'];
    },
  },
};
