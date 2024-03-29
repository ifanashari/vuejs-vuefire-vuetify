import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import rooms from './rooms'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules:{
        user,
        rooms
    }
})
