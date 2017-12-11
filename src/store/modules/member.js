/**
 * Created by Weiyu on 2017/11/20.
 */

import * as Api from 'api';
import format from 'utils/format';
import Message from 'iview/src/components/message';
import Router from '../../router';

import * as types from '../mutation-types';

const state = {
  members: [],
  kw: '',
};

const getters = {
  members: (state) => {
    const currectValue = state.members.find(m => m.fullName === state.kw);
    return state.kw === ''
      ? state.members
      : currectValue
      ? [currectValue]
        : state.members.filter(m => format.fuzzyMatching(m.user.fullName, state.kw));
  },
};

const actions = {
  async fetchWaitManageUsers({ commit, rootState }, payload) {
    const { hospitalId } = rootState.login;
    const res = await Api.fetchWaitManageUsers({
      id: hospitalId,
      classify: format.searchAuthMapByLocalKey(payload),
    });
    // 初始化数据 判断成员身份
    if (res) {
      commit(types.FETCH_MANAGE_USERS_SUCCESS,
        res.data.hospital.staff.map(val => ({ ...val, _disabled: !!val.hasAuthorities[0] })),
      );
    }
  },
  submitSearchKeyword({
    commit,
  }, payload) {
    commit(types.CHANGE_KEYWORD, payload);
  },
  submitAuthMember({ commit, rootState, dispatch }, { data, classify }) {
    const auth = format.searchAuthMapByLocalKey(classify);
    try {
      data.forEach(async (val, index) => {
        const ret = await Api.postAuthMember({
          id: val.user.id,
          auth,
        });
        // 默认最后一次请求成功 批量更新成功
        if ((data.length === (index + 1)) && ret) {
          Message.success({
            content: '添加成功',
            duration: 1.5,
          });
          // 推给上级页面
          dispatch('authority/addAuthority',
            data.map(({ user }) => user),
            { root: true },
          );
          // back
          setTimeout(() => {
            Router.back();
          }, 1500);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  [types.CHANGE_KEYWORD](state, payload) {
    state.kw = payload;
  },
  [types.FETCH_MANAGE_USERS_SUCCESS](state, payload) {
    state.members = payload;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
