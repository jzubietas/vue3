import Vue from 'vue'
import Vuex from 'vuex'
import rect from './modules/rect'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    user:null
};

const store = new Vuex.Store({
    state,
    /**
     * Assign the modules to the store
     */
    modules: {'rect':  rect },
    /**
     * If strict mode should be enabled
     */
    //strict: debug,    
    getters:{
        user:(state) =>{
            return state.user;
        }
    },
    actions:{
        user(context, user){
            context.commit('user', user);
        }
    },
    mutations:{
        user(state, user){
            state.user = user;
        }
    },
    plugins: [createPersistedState(/*{storage: window.sessionStorage,}*/)]    
});

export default store;