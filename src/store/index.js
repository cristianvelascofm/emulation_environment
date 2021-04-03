import Vue from 'vue'
import Vuex from 'vuex'
import {mapState} from 'vuex'

Vue.use(mapState);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tool: '',
    mani: ''
  },
  mutations: {
    actualTool(state, id){
      state.tool = id;
      console.log(state.tool);
      return state.tool;
      
    },
    idTool(state){
    
      return state.tool;
    }
  },
  actions: {
  },
  modules: {
  },
  
})
