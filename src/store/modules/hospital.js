import * as types from '../mutation-types'

const state = {
  title:'哈哈'
}


const actions = {
  changeCount({commit}){
    commit(types.ADD_COUNT)
  }
}


export default {
  state,
  actions
}
