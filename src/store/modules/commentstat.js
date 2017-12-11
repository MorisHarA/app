
import * as Api from 'api';
import format from 'src/utils/format';
import * as types from '../mutation-types';

const state = {
  class: [{
    name: '全部',
    code: 'all',
  },
  {
    name: '病床',
    code: 'sickbed',
  },
  {
    name: '诊室',
    code: 'consulting_room',
  },
  {
    name: '服务窗口',
    code: 'wicket',
  },
  {
    name: '公共设施',
    code: 'facility',
  },
  ],
  sickbed_stat: [],
  consulting_room_stat: [],
  wicket_stat: [],
  facility_stat: [],
  all_stat: [],
};

const getters = {

};

const actions = {
  fetchCommentStatistics({
    commit,
    rootState,
    dispatch,
  }, params) {
    commit('loading/SET_LOADING', { loading: true }, { root: true });
    state.class.map(async (cls) => {
      if (cls.code !== 'all') {
        if (!params.criteria[0]) {
          params.criteria[0] = {
            class: cls.code,
          };
        } else {
          params.criteria[0].class = cls.code;
        }
      }

      commit(types.FETCH_COMMENT_STATISTICS, {
        res: await Api.fetchCommentStatistics(format.diggingOutResult(params)),
        type: cls.code,
        params,
      });
      commit('loading/SET_LOADING', { loading: false }, { root: true });
    });
  },
};

const mutations = {
  [types.FETCH_COMMENT_STATISTICS](state, {
    res,
    type,
    params,
  }) {
    const {
      starttime,
      endtime,
    } = params;
    if (res.data && res.data.length > 0) {
      res.data.sort((r1, r2) => (+new Date(r1.starttime)) - (+new Date(r2.starttime)));

      state[`${type}_stat`] = format.formatRenderStatData(res.data, {
        starttime,
        endtime,
      });
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
