<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app v-if="sign">
      <v-list>
        <v-list-tile>
          <v-list-tile-avatar color="primary">
            <v-icon dark>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.email }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <hr>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" router :to="item.link">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" color="primary" dark v-if="sign" flat>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="signOut"><v-icon left>lock</v-icon> log out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      title: 'DormApp'
    }
  },
  computed:{
    sign(){
      return this.$store.getters.getSign
    },
    items(){
      if(this.$store.getters.getUser.status === 'admin'){
        return [
          { icon: 'add', title: 'Add Room', link: '/rooms/addRoom' },
          { icon: 'hotel', title: 'Room List', link: '/rooms/roomList' },
          { icon: 'settings', title: 'Manage All Room', link: '/rooms/roomManage' },
        ]
      } else{
        return [
          { icon: 'add', title: 'standard user', link: '/rooms/orderRoom' },
        ]
      }
    },
    user(){
      return this.$store.getters.getUser
    }
  },
  watch:{
    sign(value){
      if(value === true){
        this.$router.push('/')
      } else{
        this.$router.push('/sign')
      }
    }
  },
  methods:{
    signOut(){
      this.$store.dispatch('signOut')
    }
  }
}
</script>