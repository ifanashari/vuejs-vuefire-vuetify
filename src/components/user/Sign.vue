<template>
    <div class="container-fluid" id="container">

        <!-- ============================|Sign In|============================ -->

        <div class="row" v-if="sign">
            <div class="col-lg-4 offset-md-4">
                <div class="card mt-5">
                    <div class="card-body text-center">
                        <img src="./../../assets/logo.png" alt="">
                        <h4 class="card-title display-1 my-3">Sign In to your account</h4>
                        <h1 class="display-1"></h1>
                        <form class="text-left" @submit.prevent="signIn">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" class="form-control" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="">Password</label>
                                <div class="input-group mb-3">
                                    <input :type="passwordType" class="form-control" v-model="password">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <input type="checkbox" v-model="passwordStatus">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <v-btn color="success" :loading="loadingSign" type="submit"><v-icon left>lock_open</v-icon>sign in</v-btn>
                            </div>
                        </form>
                        <a class="blue--text" @click="sign = !sign">create new account</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================|Sign In|============================ -->

        <!-- ============================|Sign Up|============================ -->

        <div class="row" v-if="!sign">
            <div class="col-lg-4 offset-md-4">
                <div class="card mt-5">
                    <div class="card-body text-center">
                        <img src="./../../assets/logo.png" alt="">
                        <h4 class="card-title display-1 my-3">Create new account</h4>
                        <h1 class="display-1"></h1>
                        <form class="text-left" @submit.prevent="signUp">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" class="form-control" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="">Password</label>
                                <div class="input-group mb-3">
                                    <input :type="passwordType" class="form-control" v-model="password">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <input type="checkbox" v-model="passwordStatus">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <v-btn color="info" :loading="loadingSign" type="submit"><v-icon left>person_add</v-icon>sign up</v-btn>
                            </div>
                        </form>
                        <a class="blue--text" @click="sign = !sign">sign in to your account</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================|Sign Up|============================ -->
        
        <div class="row my-3" v-if="warning">
            <div class="col-md-4 offset-md-4">
                <div class="alert alert-danger" role="alert">
                    <strong>alert: </strong>{{ errorMessage }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Sign',
    data(){
        return{
            email: '',
            password: '',
            sign: true,
            warning: false,
            loadingSign: false,
            passwordType: 'password',
            passwordStatus: false
        }
    },
    computed:{
        activateSign(){
            return this.email !== '' && this.password !== ''
        },
        errorMessage(){
            return this.$store.getters.getErrorMessage
        },
        getSign(){
            return this.$store.getters.getSign
        }
    },
    methods:{
        signIn(){
            const signData = {
                email: this.email,
                password: this.password,
            }
            this.loadingSign = true
            this.$store.dispatch('signIn', signData)
        },
        signUp(){
            const signData = {
                email: this.email,
                password: this.password,
            }
            this.loadingSign = true
            this.$store.dispatch('signUp', signData)
        }
    },
    watch:{
        errorMessage(data){
            if(data !== ''){
                this.warning = true
                this.loadingSign = false
            } else{
                this.warning = false
                this.loadingSign = true                
            }
        },
        passwordStatus(data){
            if(data === true){
                this.passwordType = 'text'
            } else{
                this.passwordType = 'password'
            }
        },
        getSign(data){
            if(data === false){
                this.loadingSign = false
            } else{
                this.loadingSign = true                
            }
        }
    }
}
</script>

<style scoped>
    #container{
        background: linear-gradient(to right bottom, #ff7517 60%, white 60%);
        height: 100vh;
    }
</style>
