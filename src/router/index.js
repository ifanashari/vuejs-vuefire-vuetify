import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Sign from '@/components/user/Sign'
import AddRoom from '@/components/rooms/AddRoom'
import RoomList from '@/components/rooms/RoomList'
import RoomManage from '@/components/rooms/RoomManage'
import OrderRoom from '@/components/rooms/OrderRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/sign', name: 'Sign', component: Sign },
    { path: '/rooms/addRoom', name: 'AddRoom', component: AddRoom },
    { path: '/rooms/roomList', name: 'RoomList', component: RoomList },
    { path: '/rooms/roomManage', name: 'RoomManage', component: RoomManage },
    { path: '/rooms/orderRoom', name: 'OrderRoom', component: OrderRoom }
  ],
  mode: 'history'
})
