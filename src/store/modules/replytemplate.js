import * as types from '../mutation-types';
import * as Api from 'api';
import Message from 'iview/src/components/message';

const state = {
  list: [],
};

const getters = {
  // hospital: state => state.hospital,
};

const actions = {
  async fetchReplyTemplateList({
    commit,
    rootState,
  }, params) {
    const { hospitalId } = rootState.login;
    commit('loading/SET_LOADING', { loading: true }, { root: true });
    commit(types.FETCH_REPLY_TEMPLATE_LIST, await Api.fetchReplyTemplateList(hospitalId));
    commit('loading/SET_LOADING', { loading: false }, { root: true });
  },
  async removeReplyTemplate({ commit }, params) {
    const res = await Api.deleteReplyTemplate(params);
    if (res) {
      Message.success('删除成功');
      commit(types.DELETE_TEMPLATE_SUCCESS, res.data);
    }
  },
  removeReplyTemplates({ commit }, params) {
    params.map(async ({ id }) => {
      const res = await Api.deleteReplyTemplate(id);
      commit(types.DELETE_TEMPLATE_SUCCESS, res.data);
    });

    Message.success('删除成功');
  },
  async createTemplate({ commit, rootState }, { text }) {
    const { hospitalId } = rootState.login;
    const res = await Api.createReplyTemplate({ hospitalId, data: { text } });

    if (res) {
      Message.success('添加模板成功');
      commit(types.CREATE_TEMPLATE_SUCCESS, res.data);
    }
  },
  async updateTemplate({ commit }, { id, text }) {
    const res = await Api.patchReplyTemplate({ id, data: { text } });
    if (res) {
      Message.success('模板修改成功');
      commit(types.UPDATE_TEMPLATE_SUCCESS, res.data);
    }
  },
};

const mutations = {
  [types.FETCH_REPLY_TEMPLATE_LIST](state, res) {
    state.list = res.data;
  },
  [types.DELETE_TEMPLATE_SUCCESS](state, res) {
    state.list = state.list.filter(l => l.id !== res.id);
  },
  [types.CREATE_TEMPLATE_SUCCESS](state, res) {
    state.list.unshift(res);
  },
  [types.UPDATE_TEMPLATE_SUCCESS](state, res) {
    // console.log(res)
    state.list = state.list.map(d => ({
      ...d,
      text: res.id === d.id ? res.text : d.text,
    }));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
