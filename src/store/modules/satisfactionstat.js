
export default {
  namespaced: true,

  state: {
    chartData: [
      { starttime: '2016-06-10T00:00:00+08:00', count: 12 },
      { starttime: '2016-06-10T01:00:00+08:00', count: 42 },
      { starttime: '2016-06-10T02:00:00+08:00', count: 43 },
      { starttime: '2016-06-10T03:00:00+08:00', count: 64 },
      { starttime: '2016-06-10T04:00:00+08:00', count: 32 },
      { starttime: '2016-06-10T05:00:00+08:00', count: 34 },
      { starttime: '2016-06-10T06:00:00+08:00', count: 54 },
      { starttime: '2016-06-10T07:00:00+08:00', count: 4 },
      { starttime: '2016-06-10T08:00:00+08:00', count: 0 },
      { starttime: '2016-06-10T09:00:00+08:00', count: 23 },
      { starttime: '2016-06-10T10:00:00+08:00', count: 43 },
      { starttime: '2016-06-10T11:00:00+08:00', count: 53 },
      { starttime: '2016-06-10T12:00:00+08:00', count: 53 },
      { starttime: '2016-06-10T13:00:00+08:00', count: 1 },
      { starttime: '2016-06-10T14:00:00+08:00', count: 54 },
      { starttime: '2016-06-10T15:00:00+08:00', count: 0 },
      { starttime: '2016-06-10T16:00:00+08:00', count: 65 },
      { starttime: '2016-06-10T17:00:00+08:00', count: 75 },
      { starttime: '2016-06-10T18:00:00+08:00', count: 0 },
      { starttime: '2016-06-10T19:00:00+08:00', count: 32 },
      { starttime: '2016-06-10T20:00:00+08:00', count: 1 },
      { starttime: '2016-06-10T21:00:00+08:00', count: 42 },
      { starttime: '2016-06-10T22:00:00+08:00', count: 0 },
      { starttime: '2016-06-10T23:00:00+08:00', count: 12 },
    ],
  },

  getters: {
    chartData: state => state.chartData,
  },

  mutations: {

  },

  actions: {

  },
};
