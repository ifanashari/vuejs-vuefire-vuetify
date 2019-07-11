<template>
  <v-container>
    <v-layout row wrap>
        <v-flex md12>
        <div class="display-1 text-center">
            <v-btn flat @click="display"><v-icon>chevron_left</v-icon></v-btn>
            {{ roomStatus }} rooms
            <v-btn flat @click="display"><v-icon>chevron_right</v-icon></v-btn>
        </div>
        </v-flex>
      <v-flex md12>
        <table class="table table-stripped mt-4">
          <thead>
            <tr>
              <th>Room Id</th>
              <th>Room name</th>
              <th>Room User</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            

            <tr v-if="tableDisplay" v-for="room in loadRooms" :key="room.roomId">
              <td>{{ room.roomId }}</td>
              <td>{{ room.roomName }}</td>
              <td>Default</td>
              <td>
                <v-btn color="success" @click="bookRoom(room.roomId)" :loading="loadingBook" flat><v-icon left>book</v-icon>book</v-btn>
                <v-btn color="error" flat><v-icon left>loop</v-icon>text</v-btn>
              </td>
            </tr>
            
            <tr v-if="!tableDisplay" v-for="room in loadBookedRooms" :key="room.roomId">
              <td>{{ room.roomId }}</td>
              <td>{{ room.roomName }}</td>
              <td>Default</td>
              <td>
                <v-btn color="success" flat><v-icon left>loop</v-icon>text</v-btn>
                <v-btn color="error" @click="declineRoom(room.roomId)" :loading="loadingDec" flat><v-icon left>not_interested</v-icon>decline</v-btn>
              </td>
            </tr>

          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'RoomManage',
    data() {
      return {
        tableDisplay: true,
        roomStatus: 'Available',
        loadingBook: false,
        loadingDec: false,
      }
    },
    methods: {
      display() {
        this.tableDisplay = !this.tableDisplay
        if(this.tableDisplay === true){
          this.roomStatus = 'Availabel'
        } else{
          this.roomStatus = 'Booked'
        }
      },
      bookRoom(roomId){
        this.$store.dispatch('bookRoom', roomId)
        this.loadingBook = true
      },
      declineRoom(roomId){
        this.$store.dispatch('declineRoom', roomId)
        this.loadingDec = true
      }
    },
    computed:{
      loadBookedRooms(){
        return this.$store.getters.loadBookedRooms
      },
      loadRooms(){
        return this.$store.getters.loadRooms
      }
    },
    watch:{
      loadBookedRooms(){
        this.loadingBook = false
        this.loadingDec = false
      },
      loadRooms(){
        this.loadingBook = false
        this.loadingDec = false
      }
    }
  }
</script>

<style>
</style>