import comment from 'components/hospital/imgs/comment.png';
import questionnaire from 'components/hospital/imgs/questionnaire.png';
import hospital from 'components/hospital/imgs/hospital.png';

export default {
  namespaced: true,

  state: {
    routeConf: [
      {
        name: '评论',
        url: comment,
        children: [
          {
            name: '评论统计',
            routeName: 'commentstat',
          },
          {
            name: '评论详情',
            routeName: 'commentdetail',
          },
        ],
      },
      {
        name: '问卷',
        url: questionnaire,
        children: [
          {
            name: '问卷统计',
            routeName: 'questionnairestat',
          },
          {
            name: '满意度统计',
            routeName: 'satisfactionstat',
          },
          {
            name: '问卷详情',
            routeName: 'questionnairedetail',
          },
        ],
      },
      {
        name: '医院',
        url: hospital,
        children: [
          {
            name: '医院信息',
            routeName: 'hospitaldetail',
          },
          {
            name: '回复模板',
            routeName: 'replytemplate',
          },
          {
            name: '权限管理',
            routeName: 'authority',
          },
        ],
      },
    ],
  },

  getters: {
    routeConfWithAuthority: (state, getters, rootState) => {
      const { authList } = rootState.login;

      return state.routeConf.reduce((r, i) => {
        const filter = i.children.filter(c => authList.indexOf(c.routeName) > -1);
        return filter.length > 0 ? [...r, { ...i, children: filter }] : r;
      }, []);
    },

    redirect: (state, getters) =>
      getters.routeConfWithAuthority[0] &&
      getters.routeConfWithAuthority[0].children[0].routeName,
  },

};
