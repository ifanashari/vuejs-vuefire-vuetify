<template>
    <v-container>
        <v-layout row wrap>
            <v-flex sm12 md6 px-3 mb-3>
                <h1 class="display-1">Your room data</h1>
                <div v-for="name in names" :key="name">
                    {{ name }}
                </div>
                <v-card>
                    <v-card-text>
                        <form @submit.prevent="save(roomId)">
                            <div class="form-group">
                                <label for="">Room name</label>
                                <input type="text" v-model="roomName" class="form-control">
                                <small id="helpId" class="text-muted">Help text</small>
                            </div>
                            <div class="form-group">
                                <label for="">Room description</label>
                                <textarea v-model="roomDesc" class="form-control"></textarea>
                                <small id="helpId" class="text-muted">Help text</small>
                            </div>
                            <div class="form-group">
                                <label for="">Price</label>
                                <input type="number" v-model="price" class="form-control">
                                <small id="helpId" class="text-muted">Help text</small>
                            </div>
                            <v-btn color="success" :loading="loadingSave" type="submit"><v-icon left>save</v-icon>save</v-btn>
                            <v-btn color="info" @click="clearForm"><v-icon left>clear</v-icon>clear</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md6 px-3>
                <h1 class="display-1">The existing room</h1>
                <v-card class="mb-2" v-for="room in rooms" :key="room.Id">
                    <v-layout row>
                        <v-flex md8>
                            <v-container>
                                <v-card-text>
                                    <h4 class="primary--text">{{ room.roomName }} <small class="black--text">Rp {{ new Intl.NumberFormat().format(room.price) }}</small></h4>
                                    <p>{{ room.roomDesc }}</p>
                                </v-card-text>
                                <v-btn color="error" :loading="loadingRemove" flat @click="removeRoom(room.roomId)"><v-icon left>delete</v-icon> remove</v-btn>
                                <v-btn color="success" flat @click="setUpdater(room.roomId, room.roomName, room.roomDesc, room.price)"><v-icon left>edit</v-icon>edit</v-btn>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'RoomList',
    data(){
        return{
            roomId: '',
            roomName: '',
            roomDesc: '',
            price: '',
            loadingSave: false,
            loadingRemove: false,
            names: []
        }
    },
    mounted(){
        try{
            this.names = JSON.parse(localStorage.getItem('names'))
        } catch(e){
            console.log(e)
        }
    },
    computed:{
        rooms(){
            return this.$store.getters.loadAllRooms
        }
    },
    watch:{
        rooms(){
            this.loadingSave = false
            this.loadingRemove = false
        }
    },
    methods:{
        setUpdater(roomId, roomName, roomDesc, price){
            this.roomId = roomId,
            this.roomName = roomName,
            this.roomDesc = roomDesc,
            this.price = price
        },
        clearForm(){
            this.roomId = '',
            this.roomName = '',
            this.roomDesc = '',
            this.price = '',
            this.status = ''
        },
        removeRoom(roomId){
            this.loadingRemove = true
            this.$store.dispatch('removeRoom', roomId)
        },
        save(roomId){
            const roomData = {
                roomId: roomId,
                roomName: this.roomName,
                roomDesc: this.roomDesc,
                price: this.price,
            }
            this.loadingSave = true
            this.$store.dispatch('save', roomData)
        }
    }
}
</script>

<style>

</style>
