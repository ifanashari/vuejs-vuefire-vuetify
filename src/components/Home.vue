<template>
    <v-container>
        <v-layout row wrap>
          <v-flex md6 pa-2>
              <v-card>
                  <v-card-text>
                      <v-text-field v-model="name" label="label"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="addName" color="primary" flat><v-icon left>save</v-icon>save</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
          <v-flex md6 pa-2>
              <v-layout row wrap>
                  <v-flex md12 pl-2 pr-2 mb-2 v-for="(nameItem, n) in names" :key="n">
                    <v-card>
                    <!-- <v-card> -->
                        <v-card-text>
                            {{ nameItem }}
                            
                            <v-btn color="error" flat @click="removeName(n)"><v-icon>close</v-icon></v-btn>
                        </v-card-text>
                    </v-card>
                  </v-flex>
              </v-layout>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    data(){
        return{
            name: "",
            names: []
        }
    },
    mounted(){
        if(localStorage.getItem('names')){
            try{
                this.names = JSON.parse(localStorage.getItem('names'))
            } catch(e){
                localStorage.removeItem('names')
            }
        }
    },
    methods:{
        addName(){
            if(!this.name){
                return
            }
            this.names.push(this.name)
            this.name = ''
            this.saveName()
        },
        saveName(){
            const dataName = JSON.stringify(this.names)
            localStorage.setItem('names', dataName)
        },
        removeName(n){
            this.names.splice(n, 1)
            this.saveName()
        }
    }
}
</script>

<style>

</style>
