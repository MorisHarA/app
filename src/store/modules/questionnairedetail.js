/**
 * Created by luandapeng on 2017/7/10.
 */
import * as Api from 'api';
import {
  FETCH_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRE_SUCCESS,
  SET_FILTER_LIST,
} from '../mutation-types';

export default {
  namespaced: true,

  state: {
    list: [],
    loading: true,
    filterData: {},
  },

  getters: {
    totalCount: state => state.list.reduce((a, b) => (a + b.sheetcount), 0),
    list: state => state.list,
    loading: state => state.loading,
    filterData: state => state.filterData,
  },

  actions: {
    fetchQuesList: async ({ commit }, payload) => {
      try {
        commit(FETCH_QUESTIONNAIRE);
        commit('loading/SET_LOADING', { loading: true }, { root: true });
        const res = await Api.fetchQuestionnaireDetail(payload);
        if (res) {
          commit(FETCH_QUESTIONNAIRE_SUCCESS, res);
          commit('loading/SET_LOADING', { loading: false }, { root: true });
        }
      } catch (e) {
        console.log(e);
      }
    },
    getQuesList: async ({ state, dispatch }, payload) => {
      if (state.list.length === 0) {
        await dispatch('fetchQuesList', payload);
      }
    },
    formatListByQid: async ({ state, rootState, dispatch, commit }, payload) => {
      try {
        await dispatch('getQuesList', payload);
        const { route } = rootState;
        const { _qid, qnid } = route.query;
        let arr = state.list.find(question => question.id == qnid).questions;
        let _arr = [];
        _qid.split('_').forEach((qid) => {
          const filter = arr.filter(question => question.qid == qid);
          if (filter.length === 0) {
            return;
          }
          _arr = filter;
          const opts = filter[0].options;
          if (opts && opts.length) {
            const sub = [];
            opts.forEach((opt) => {
              opt.reaction.questions.forEach((item) => {
                sub.push(item);
              });
            });
            arr = sub;
          }
        });
        commit(SET_FILTER_LIST, _arr[0]);
      } catch (e) {
        console.log(e);
      }
    },
  },

  mutations: {
    [FETCH_QUESTIONNAIRE](state) {
      state.loading = true;
    },
    [FETCH_QUESTIONNAIRE_SUCCESS](state, res) {
      state.list = res.data;
      state.loading = false;
    },
    [SET_FILTER_LIST](state, payload) {
      state.filterData = payload;
    },
  },
};
