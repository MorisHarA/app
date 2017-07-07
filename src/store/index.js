import Vue from 'vue'
import Vuex from 'vuex'
import {myPlugin} from './plugins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const context = require.context('./modules', false, /\.js$/)

const modules = (context) =>{
  const obj = {}
  context.keys().map(key =>{
    obj[key.slice(2,-3)] = context(key).default
  })
  return obj
}

const store = new Vuex.Store({
  modules: modules(context),
  plugins: [myPlugin],
  strict: debug
})


//TODO
if (module.hot) {
  module.hot.accept(['./modules/login.js'], () => {
    alert(222)
    store.hotUpdate({
      modules: modules(context)
    })
  })
}


export default store
