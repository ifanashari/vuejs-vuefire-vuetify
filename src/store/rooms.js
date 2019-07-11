import { roomsCol } from '../firebase'

const state = {
    rooms: [],
    bookedRooms: [],
    allRooms: []
}
const mutations = {
    loadRooms(state, payload){
        state.rooms = payload
    },
    loadBookedRooms(state, payload){
        state.bookedRooms = payload
    },
    loadAllRooms(state, payload){
        state.allRooms = payload
    }
}
const actions = {
    addRoom({commit, dispatch}, payload){
        const roomData = {
            roomName: payload.roomName,
            roomDesc: payload.roomDesc,
            price: payload.price,
            status: 'empty'
        }
        roomsCol.doc().set(roomData).then(function(){
            dispatch('loadRooms')
            dispatch('loadAllRooms')
        })
    },
    loadRooms({commit}){
        roomsCol.where("status", "==", "empty").get().then((querySnapshot) => {
            const dataPush = []
            querySnapshot.forEach(function(doc) {
                const roomData = {
                    roomName: doc.data().roomName,
                    roomDesc: doc.data().roomDesc,
                    roomId: doc.id,
                    price: doc.data().price,
                    status: doc.data().status
                }
                dataPush.push(roomData)
            })
            commit('loadRooms', dataPush)
        }) 
    },
    loadBookedRooms({commit}){
        roomsCol.where("status", "==", "booked").get().then((querySnapshot) => {
            const dataPush = []
            querySnapshot.forEach(function(doc) {
                const roomData = {
                    roomName: doc.data().roomName,
                    roomDesc: doc.data().roomDesc,
                    price: doc.data().price,
                    roomId: doc.id,
                    status: doc.data().status
                }
                dataPush.push(roomData)
            })
            commit('loadBookedRooms', dataPush)
        }) 
    },
    loadAllRooms({commit}){
        roomsCol.get().then((querySnapshot) => {
            const dataPush = []
            querySnapshot.forEach(function(doc) {
                const roomData = {
                    roomName: doc.data().roomName,
                    roomDesc: doc.data().roomDesc,
                    price: doc.data().price,
                    roomId: doc.id,
                    status: doc.data().status
                }
                dataPush.push(roomData)
            })
            commit('loadAllRooms', dataPush)
        }) 
    },
    removeRoom({dispatch}, payload){
        roomsCol.doc(payload).delete().then(function(){
            dispatch('loadRooms')
            dispatch('loadAllRooms')
        })
    },
    save({dispatch}, payload){
        const roomData = {
            roomName: payload.roomName,
            roomDesc: payload.roomDesc,
            price: payload.price,
        }
        roomsCol.doc(payload.roomId).update(roomData).then(function(){
            dispatch('loadAllRooms')
        })
    },
    bookRoom({dispatch},payload){
        const roomData = {
            status: 'booked'
        }
        roomsCol.doc(payload).update(roomData).then(function(){
            dispatch('loadRooms')
            dispatch('loadBookedRooms')
            dispatch('loadAllRooms')
        })
    },
    declineRoom({dispatch}, payload){
        const roomData = {
            status: 'empty'
        }
        roomsCol.doc(payload).update(roomData).then(function(){
            dispatch('loadRooms')
            dispatch('loadBookedRooms')
            dispatch('loadAllRooms')
        })
    }
}
const getters = {
    loadRooms(state){
        return state.rooms
    },
    loadBookedRooms(state){
        return state.bookedRooms
    },
    loadAllRooms(state){
        return state.allRooms
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}
