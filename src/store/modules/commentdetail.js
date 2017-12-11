/* global moment */

import * as Api from 'api';
import Notice from 'iview/src/components/notice';
import * as types from '../mutation-types';

const state = {
  count: {
    value: 0,
  },
  comments: [],
  replayTemplates: [],
  references: [],
};

const getters = {
  // getCount:(state) => (state.count)
};

const actions = {
  async fetchCommentData({
    commit,
    rootState,
    dispatch,
  }, params) {
    const {
      sort,
    } = rootState.route.query;
    if (sort) {
      const condition = ['-createtime'];
      if (sort === 'desc') {
        condition.unshift('-point.general');
      } else if (sort === 'asc') {
        condition.unshift('point.general');
      }

      params.sort = condition;
    } else {
      params.sort = ['-createtime'];
    }
    params.groupby = '';
    const {
      hospitalId,
    } = rootState.login;
    commit('loading/SET_LOADING', { loading: true }, { root: true });
    // 获取评论数
    commit(types.FETCH_COMMENT_COUNT, await Api.fetchCommentStatistics(params));
    // 获取评论列表
    const commentsRES = await Api.fetchCommentList(params);
    commit(types.FETCH_COMMENTS, commentsRES);
    // 获取评论模板
    if (state.replayTemplates.length <= 0) {
      commit(types.FETCH_REPLAY_TEMPLATES, await Api.fetchCommentTemplateList(hospitalId));
    }
    commit('loading/SET_LOADING', { loading: false }, { root: true });
  },
  replyComment({
    commit,
    rootState,
    dispatch,
  }, params) {
    const {
      hospitalId,
    } = rootState.login;
    const {
      id,
      release,
    } = params;
    const actionTxt = release.dispose ? `处理了评论 ${id}` : `回复了评论 ${id}`;
    dispatch(
      'operateStat/operateStat',
      {
        action: actionTxt,
        token: localStorage.token,
        time: moment(Date.now()).format(),
      },
      { root: true },
    );
    Api.submitCommentReply({ ...params,
      hospitalId,
    }).then((res) => {
      commit(types.REPLY_COMMENT, res.data);
    }).catch((err) => {
      Notice.error({
        title: '提交失败~',
        duration: 2,
      });
      console.log(err);
    });
  },
};

const mutations = {
  [types.FETCH_COMMENT_COUNT](state, res) {
    let count = 0;
    if (res.data.length > 0) {
      res.data.map((val) => {
        count += val.count;
      });
    }
    state.count.value = count;
  },
  [types.FETCH_COMMENTS](state, res) {
    state.comments = res.data;
  },
  [types.FETCH_REPLAY_TEMPLATES](state, res) {
    state.replayTemplates = res.data;
  },
  [types.FETCH_AND_ASSIGNMENT](state, {
    res,
    cls,
  }) {
    state.references.push({ ...res.data,
      class: cls,
    });
  },
  [types.REPLY_COMMENT](state, res) {
    state.comments.map((c, index) => {
      if (c.id === res.id) {
        const source = state.comments[index];
        const {
          dispose,
          reply,
        } = res;
        state.comments.splice(index, 1, { ...source,
          dispose,
          reply,
        });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
