import * as Api from 'api';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async operateStat(context, payload) {
    try {
      await Api.operateStat(payload);
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
