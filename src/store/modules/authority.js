/**
 * Created by luandapeng on 2017/7/18.
 */

import * as Api from 'api';
import Message from 'iview/src/components/message';
import Utils from '../../utils/format';
import Router from '../../router';

import {
  DELETE_AUTHORITY,
  FETCH_AUTHORITY_LIST,
  ADD_AUTHORITY,
  SET_AUTHORITY_ACTIVE_INDEX,
} from '../mutation-types';


export default {
  namespaced: true,

  state: {
    data: {},
    classes: [
      { name: '评论统计', desc: '查看评论统计数据', alias: 'commentstat' },
      { name: '问卷统计', desc: '查看问卷统计数据', alias: 'questionnairestat' },
      { name: '评论详情', desc: '查看／操作评论内容', alias: 'commentdetail' },
      { name: '问卷详情', desc: '查看／操作问卷内容', alias: 'questionnairedetail' },
      { name: '权限管理', desc: '管理／配置用户权限', alias: 'authority' },
      { name: '回复模板', desc: '管理／配置回复模板', alias: 'replytemplate' },
    ],
    activeIdx: 0,
  },

  getters: {
    classes: state => state.classes,
    activeIdx: state => state.activeIdx,
    activeAlias: (state, getters) => state.classes[getters.activeIdx].alias,
    activeDesc: (state, getters) => state.classes[getters.activeIdx].desc,
    list: (state, getters) => state.data[getters.activeAlias] || [],
  },

  actions: {
    fetchAuthorityList: async ({ commit, getters, rootGetters }) => {
      const hospitalId = rootGetters['login/hospitalId'];
      const concise = Object.keys(Utils.authMap)
        .find(key => Utils.authMap[key] === getters.activeAlias);
      const res = await Api.fetchAuthorityList(concise, +hospitalId, {});
      commit(FETCH_AUTHORITY_LIST, { res, activeAlias: getters.activeAlias });
    },
    addAuthority: ({ commit, getters }, payload) => {
      commit(ADD_AUTHORITY, { activeAlias: getters.activeAlias, list: payload });
    },
    deleteAuthority: async ({ commit, getters }, payload) => {
      const { index, id } = payload;
      try {
        const res = await Api.mutateAuthority(
          id,
          Utils.searchAuthMapByLocalKey(getters.activeAlias),
          false,
        );
        commit(DELETE_AUTHORITY, { activeAlias: getters.activeAlias, index });
        if (res) {
          Message.success({ content: '删除成功', duration: 1.5 });
        }
      } catch (e) {
        console.log(e);
        Message.error({ content: '删除失败', duration: 1.5 });
      }
    },
    setAuthorityActiveIndex: ({ commit, getters, dispatch }, payload) => {
      commit('SET_AUTHORITY_ACTIVE_INDEX', payload);
      Router.replace({
        query: {
          index: getters.activeIdx,
        },
      });
      dispatch('fetchAuthorityList');
    },
  },

  mutations: {
    [DELETE_AUTHORITY]: (state, { activeAlias, index }) => {
      state.data[activeAlias].splice(index, 1);
    },
    [ADD_AUTHORITY]: (state, { activeAlias, list }) => {
      state.data = {
        ...state.data,
        [activeAlias]: state.data[activeAlias] ? state.data[activeAlias].concat(list) : list,
      };
    },
    [FETCH_AUTHORITY_LIST]: (state, { res, activeAlias }) => {
      const { employees } = res.data.hospital.auth;
      const plur = employees.map(e => ({
        id: e.user.id,
        fullName: e.user.fullName,
        mobile: e.user.mobile,
        action: 'delete',
      }));
      state.data = { ...state.data, [activeAlias]: plur };
    },
    [SET_AUTHORITY_ACTIVE_INDEX]: (state, payload) => {
      state.activeIdx = +payload;
    },
  },
};
