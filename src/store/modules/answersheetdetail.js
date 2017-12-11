/**
 * Created by luandapeng on 2017/7/18.
 */

/* global moment */

import * as Api from 'api';
import format from 'src/utils/format';
import {
  FETCH_ANSWERSHEET,
  FETCH_ANSWERSHEET_SUCCESS,
  FETCH_ANSWERSHEET_ALL,
  FETCH_ANSWERSHEET_ALL_SUCCESS,
  SET_FILTER_ALL_LIST,
  CLEAR_ANSWERSHEET_DATA,
} from '../mutation-types';

export default {
  namespaced: true,

  state: {
    allList: [],
    filterAllList: [],
  },

  getters: {
    allList: state => state.allList,
    allCount: state => state.filterAllList.length,
    filterAllList: state => state.filterAllList,
  },

  actions: {
    fetchAllData: async ({ commit }, payload) => {
      commit(FETCH_ANSWERSHEET_ALL);
      try {
        commit('loading/SET_LOADING', { loading: true }, { root: true });
        const res = await Api.fetchAnswerDetail(payload);
        if (res) {
          commit(FETCH_ANSWERSHEET_ALL_SUCCESS, res);
          commit('loading/SET_LOADING', { loading: false }, { root: true });
        }
      } catch (e) {
        console.log(e);
      }
    },
    exportAnswerDetail: async ({ dispatch }, payload) => {
      try {
        const res = await Api.exportAnswerDetail(payload);
        if (res) {
          format.downloadFile('答卷详情.xlsx', res.data);
          dispatch(
            'operateStat/operateStat',
            {
              action: '导出答卷详情筛选数据',
              token: localStorage.token,
              time: moment(Date.now()).format(),
            },
            { root: true },
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    setFilterAllList: ({ commit }, payload) => {
      commit(SET_FILTER_ALL_LIST, payload);
    },
    clear: ({ commit }) => {
      commit(CLEAR_ANSWERSHEET_DATA);
    },
  },

  mutations: {
    [FETCH_ANSWERSHEET_SUCCESS]: (state, payload) => {
      state.list = payload.data;
    },
    [FETCH_ANSWERSHEET_ALL_SUCCESS]: (state, payload) => {
      state.allList = payload.data;
    },
    [FETCH_ANSWERSHEET]: (state) => {
      state.list = [];
    },
    [FETCH_ANSWERSHEET_ALL]: (state) => {
      state.allList = [];
    },
    [SET_FILTER_ALL_LIST]: (state, payload) => {
      state.filterAllList = payload;
    },
    [CLEAR_ANSWERSHEET_DATA]: (state) => {
      state.allList = [];
      state.filterAllList = [];
    },
  },
};
