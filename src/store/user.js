import { userCol, userAuth } from "../firebase";

const state = {
    user: {
        sign: false,
        status: ''
    },
    errorMessage: ''
}
const mutations = {
    setUser(state, payload){
        state.user = payload
    },
    unsetUser(state){
        state.user = ''
    },
    setErrorMessage(state, payload){
        state.errorMessage = payload
    }
}
const actions = {
    signIn({commit}, payload){
        userAuth.signInWithEmailAndPassword(payload.email, payload.password).then((data) => {
            userCol.doc(payload.email).get().then((querySnapshot) => {
                const userData = {
                    sign: true,
                    id: querySnapshot.data().id,
                    email: querySnapshot.id,
                    status: querySnapshot.data().status
                }
                commit('setUser', userData)
            })
        }).catch((data) => {
            commit('setErrorMessage', data.message)
        })
    },
    signUp({commit}, payload){
        userAuth.createUserWithEmailAndPassword(payload.email, payload.password).then((data) => {
            userCol.doc(payload.email).get().then((querySnapshot) => {
                const userData = {
                    sign: true,
                    id: querySnapshot.data().id,
                    email: querySnapshot.id,
                    status: querySnapshot.data().status
                }
                commit('setUser', userData)
                
            })
        }).catch((data) => {
            commit('setErrorMessage', data.message)
        })
    },
    signOut({commit}){
        userAuth.signOut().then(function(){
            commit('unsetUser')
        })
    }
}
const getters = {
    getSign(){
        return state.user.sign
    },
    getErrorMessage(state){
        return state.errorMessage
    },
    getUser(state){
        return state.user
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}
