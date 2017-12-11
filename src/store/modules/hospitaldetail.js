import * as types from '../mutation-types';
import * as Api from 'api';

const state = {
  hospital: {},
  divisions: [],
  count: {
    value: 0,
  },
};

const getters = {
  hospital: state => state.hospital,
};

const actions = {
  async fetchhospitalDetail({
    commit,
    rootState,
  }) {
    const {
      hospitalId,
    } = rootState.login;
    try {
      const hospitalRES = await Api.fetchHospitalDetail(hospitalId);
      if (hospitalRES) {
        commit(types.FETCH_HOSPITAL_DETAIL, hospitalRES);
      }
    } catch (e) {
      console.log(e);
    }
  },
  fetchDivisionData({
    commit,
    rootState,
  }, params) {
    const {
      hospitalId,
    } = rootState.login;
    (async function () {
      try {
        commit('loading/SET_LOADING', { loading: true }, { root: true });
        if (state.count.value <= 0) {
          const divisionCount = await Api.fetchDivitionCount(hospitalId);
          commit(types.FETCH_DIVISIONS_COUNT, divisionCount);
        }
        const divitionRES = await Api.fetchDivitionList({ ...params,
          hospitalId,
        });
        commit(types.FETCH_DIVISIONS, divitionRES);
        commit('loading/SET_LOADING', { loading: false }, { root: true });
      } catch (err) {
        console.log(err);
      }
    }());
  },
};

const mutations = {
  [types.FETCH_HOSPITAL_DETAIL](state, res) {
    state.hospital = res.data;
  },
  [types.FETCH_DIVISIONS](state, res) {
    state.divisions = res.data;
  },
  [types.FETCH_DIVISIONS_COUNT](state, res) {
    state.count = res.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
