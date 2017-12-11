/* global moment */

import * as Api from 'api';
import format from 'src/utils/format';
import * as types from '../mutation-types';

const handleRouteName = (routeName) => {
  switch (routeName) {
    case 'commentstat':
      return '评论统计';
    case 'commentdetail':
      return '评论详情';
    case 'questionnairestat':
      return '问卷统计';
    case 'questionnairedetail':
      return '问卷详情';
    default:
      return '';
  }
};

const state = {
  // 管理区域
  area: {
    title: '管理区域',
    code: 'area',
    list: [
      {
        name: '病床',
        class: 'sickbed',
        id: 1,
      },
      {
        name: '诊室',
        class: 'consulting_room',
        id: 2,
      },
      {
        name: '服务窗口',
        class: 'wicket',
        id: 3,
      },
      {
        name: '公共设施',
        class: 'facility',
        id: 4,
      },
    ],
  },
  // 科室
  divisions: {
    title: '科室',
    code: 'divisions',
    list: [],
  },
  // 病区范围
  regions: {
    title: '病区范围',
    code: 'regions',
    list: [],
  },
  // 专属范围
  exclusive: {
    title: '专属范围',
    code: 'exclusive',
    list: [],
  },
  reviewList: [],
  // 评论类型
  review: {
    title: '评论类型',
    code: 'review',
    list: [{
      name: '差评处理',
      id: 1,
      value: true,
    }],
  },
  // 评论等级
  level: {
    title: '评论等级',
    code: 'level',
    list: [
      {
        name: '4-5星',
        id: 3,
        range: [4, 5],
      },
      {
        name: '3星',
        id: 2,
        range: [3],
      },
      {
        name: '1-2星',
        id: 1,
        range: [1, 2],
      },
    ],
  },
  satisfaction: {
    title: '满意度项',
    code: 'satisfaction',
    list: [],
  },
  init: {
    datetype: 1, // 1.日 2.月 3.年
    starttime: '',
    endtime: '',
    area: -1,
    divisions: -1,
    regions: -1,
    exclusive: -1,
    review: -1,
    level: -1,
    satisfaction: -1,
  },
};

const getters = {
  // getCount:(state) => (state.count)
};

const actions = {
  // 请求数据
  initData({
    commit,
    dispatch,
    rootState,
  }, params) {
    const routeName = rootState.route.name;
    const hospitalId = rootState.login.hospitalId;
    (async function () {
      try {
        if (state.divisions.list.length <= 0) {
          const divitionRES = await Api.fetchDivitionList({
            hospitalId,
          });

          commit(types.FETCH_DIVISIONS, divitionRES);
        }

        if (state.regions.list.length <= 0) {
          const regionRES = await Api.fetchRegionList(hospitalId);

          if (regionRES.data && regionRES.data.length > 0) {
            regionRES.data.forEach((res, index) => {
              regionRES.data[index].id = index;
            });
            commit(types.FETCH_REGIONS, regionRES);
          }
        }

        const {
          divisions,
          regions,
          area,
          level,
          review,
        } = state;
        let args = format.paramsMixin(params, {
          divisions: divisions.list.length > 0 ? divisions : divisionRES ? divisionRES.data : divisions,
          regions: regions.list.length > 0 ? regions : regionRES ? regionRES.data : regions,
          area,
          level,
          review,
        });

        args = {
          ...args,
          hospitalId,
        };

        if (routeName === 'commentdetail') {
          dispatch(`${routeName}/fetchCommentData`, args, {
            root: true,
          });
        } else if (routeName === 'questionnairestat') {
          dispatch(`${routeName}/fetchChartData`, args, {
            root: true,
          });
          dispatch(`${routeName}/fetchQuesStat`, args, {
            root: true,
          });
        } else if (routeName === 'questionnairedetail') {
          dispatch(`${routeName}/fetchQuesList`, args, {
            root: true,
          });
        } else if (routeName === 'commentstat') {
          dispatch(`${routeName}/fetchCommentStatistics`, args, {
            root: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }());
  },
  setInitData({
    commit,
  }, data) {
    commit(types.SET_INITDATA, data);
  },
  async exportData({
    commit,
    rootState,
    dispatch,
  }, params) {
    const routeName = rootState.route.name;
    const hospitalId = rootState.login.hospitalId;
    const {
      area,
      divisions,
      regions,
      review,
      level,
    } = state;

    const args = format.paramsMixin(params, {
      area,
      divisions,
      regions,
      review,
      level,
    });
    const res = await Api[`export${routeName}`]({
      hospitalId,
      data: args,
    });
    if (res.data) {
      const filename = format.getNameByRouteName(routeName);
      format.downloadFile(filename, res.data);
      dispatch(
        'operateStat/operateStat',
        {
          action: `导出${handleRouteName(routeName)}筛选数据`,
          token: localStorage.token,
          time: moment(Date.now()).format(),
        },
        { root: true },
      );
    }
  },
};

const mutations = {
  [types.FETCH_DIVISIONS](state, res) {
    state.divisions.list = res.data;
  },
  [types.FETCH_REGIONS](state, res) {
    state.regions.list = res.data;
  },
  [types.SET_INITDATA](state, data) {
    Object.assign(state.init, data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
