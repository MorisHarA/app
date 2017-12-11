/**
 * Created by luandapeng on 2017/10/27.
 */

import {
  SET_LOADING,
} from '../mutation-types';

export default {
  namespaced: true,

  state: {
    loading: true,
  },

  mutations: {
    [SET_LOADING]: (state, payload) => {
      state.loading = payload.loading;
    },
  },

};
