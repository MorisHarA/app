import * as types from '../mutation-types'


const state = {
  count:0,
  name:'sdd222'
}


const getters = {
  getCount:(state) => (state.count)
}


const actions = {
  asyncAddCount({commit}){
    commit(types.ADD_COUNT)
  }
}


const mutations = {
  [types.ADD_COUNT](state){
    state.count ++
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}
