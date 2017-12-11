/**
 * Created by luandapeng on 2017/7/10.
 */
import * as Api from 'api';

import {
  FETCH_CHARTDATA_SUCCESS,
  FETCH_QUESTIONNAIRESTAT_SUCCESS,
  CLEAR_CHARTDATA,
} from '../mutation-types';

export default {
  namespaced: true,

  state: {
    chartData: [],
    questionnairestat: [],
  },

  getters: {
    chartDataDetail: state => state.chartData.map(val => ({
      starttime: val.starttime,
      count: val.count,
    })).sort((a, b) => (+new Date(a.starttime)) - (+new Date(b.starttime))),
    chartDataPush: state => state.chartData.map(val => ({
      starttime: val.starttime,
      count: val.dispose.sendcount,
    })).sort((a, b) => (+new Date(a.starttime)) - (+new Date(b.starttime))),
    totalCount: state => state.chartData.reduce((a, b) => (a + b.count), 0),
    pushCount: state => state.chartData.reduce((a, b) => (a + b.dispose.sendcount), 0),
    sendStat: (state) => {
      const s = {};
      const arr = [];
      state.chartData.filter(item => item.questionnaires instanceof Array).forEach((chart) => {
        chart.questionnaires.forEach(({
          id,
          name,
          dispose,
        }) => {
          s[id] = {
            id,
            name,
            count: s[id] ? s[id].count + dispose.sendcount : dispose.sendcount,
          };
        });
      });
      Object.keys(s).forEach((key) => {
        arr.push(s[key]);
      });
      return [{
        count: '推送总数',
        name: '对象',
      }, ...arr.sort((a, b) => a.id - b.id)];
    },
    stat: (state) => {
      const arr = [...state.questionnairestat.map(({
        sheetcount,
        id,
        name,
      }) => ({
        id,
        name,
        count: sheetcount,
      }))];
      return [{
        count: '问卷总数',
        name: '对象',
      }, ...arr.sort((a, b) => a.id - b.id)];
    },
  },

  actions: {
    fetchChartData: async ({ commit }, payload) => {
      commit(FETCH_CHARTDATA_SUCCESS, await Api.fetchChartData(payload));
    },
    fetchQuesStat: async ({ commit }, payload) => {
      commit('loading/SET_LOADING', { loading: true }, { root: true });
      commit(FETCH_QUESTIONNAIRESTAT_SUCCESS, await Api.fetchQuestionnaireDetail(payload));
      commit('loading/SET_LOADING', { loading: false }, { root: true });
    },
  },

  mutations: {
    [FETCH_CHARTDATA_SUCCESS]: (state, res) => {
      state.chartData = res.data;
    },
    [FETCH_QUESTIONNAIRESTAT_SUCCESS]: (state, res) => {
      state.questionnairestat = res.data;
    },
    [CLEAR_CHARTDATA]: (state) => {
      state.chartData = [];
    },
  },

};

