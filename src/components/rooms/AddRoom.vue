<template>
    <v-container>
        <v-layout row wrap>
            <!-- ============================|Add room|============================ -->
            <v-flex xs12 md6 pa-3>
                <form @submit.prevent="addRoom">
                    <h1 class="display-1">Add new room</h1>
                    <div class="form-group">
                      <label for="">Room name</label>
                      <input type="text" v-model="roomName" class="form-control">
                      <small id="helpId" class="text-muted">Room name</small>
                    </div>
                    <div class="form-group">
                      <label for="">Room description</label>
                      <textarea v-model="roomDesc" class="form-control"></textarea>
                      <small id="helpId" class="text-muted">Room description</small>
                    </div>
                    <div class="form-group">
                      <label for="">Price</label>
                      <input v-model="price" type="number" class="form-control">
                      <small id="helpId" class="text-muted">Room Price</small>
                    </div>
                    <v-btn color="info" type="submit" :loading="loadingAdd">
                        <v-icon left>add</v-icon>Add Room
                    </v-btn>
                </form>
            </v-flex>

            <!-- ============================|Add room|============================ -->

            <!-- ============================|Room List|============================ -->

            <v-flex xs12 md6 pa-3>
                <h1 class="display-1">The existing room <v-btn color="info" @click="reload"><v-icon>loop</v-icon></v-btn></h1>
                <v-card class="mb-2" v-for="room in rooms" :key="room.Id">
                    <v-layout row>
                        <v-flex md8>
                            <v-container>
                                <v-card-text>
                                    <h4 class="primary--text">{{ room.roomName }} <small class="black--text">Rp {{ new Intl.NumberFormat().format(room.price) }}</small></h4>
                                    <p>{{ room.roomDesc }}</p>
                                </v-card-text>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <!-- ============================|Room List|============================ -->

        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'AddRoom',
    data(){
        return{
            roomName: '',
            roomDesc: '',
            price: '',
            loadingAdd: false
        }
    },
    computed:{
        rooms(){
            return this.$store.getters.loadAllRooms
        }
    },
    watch:{
        rooms(){
            this.loadingAdd = false
        }
    },
    methods:{
        addRoom(){
            const roomData = {
                roomName: this.roomName,
                roomDesc: this.roomDesc,
                price: this.price,
            }
            this.$store.dispatch('addRoom', roomData)
            this.loadingAdd = true
        },
        reload(){
            this.$store.dispatch('loadAllRooms')
        }
    }
}
</script>

<style>

</style>
