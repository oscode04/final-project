<template>
  <v-app>
    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col  cols="12" sm="8" md="8">
                    <v-card class="elevation-12">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" md="8"> 
                                         <v-btn icon dark @click.native="close" color="#FF9100">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-card-text class="mt-12">
                                            <h1 class="text-center display-2 orange--text text--accent-3">Login To Bloggers</h1>
                                            <div class="text-center mt-4">
                                                <v-btn class="mx-2" fab color="#FF9100" outlined @click="comingSoon">
                                                    <v-icon>fab fa-facebook-f</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="#FF9100" outlined @click="comingSoon">
                                                    <v-icon>fab fa-google-plus-g</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-form>
                                                <v-text-field
                                                v-model="email"
                                                label="Email"
                                                name="Email"
                                                prepend-icon="email"
                                                type="text"
                                                color="orange accent-3"
                                                ></v-text-field>
                                                <v-text-field
                                                v-model="password"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="showPassword ? 'text' : 'password'"
                                                id="password"
                                                label="Password"
                                                name="Password"
                                                prepend-icon="lock"
                                                @click:append="showPassword = !showPassword"
                                                color="orange accent-3"
                                                ></v-text-field>
                                            </v-form>
                                        </v-card-text>
                                        <div class="text-center mb-8">
                                            <v-btn rounded color="orange accent-3" dark @click="login">LOG IN</v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="orange accent-3">
                                        <v-card-text class="white--text mt-5">
                                            <h1 class="text-center display-1">Hello, Friends !</h1>
                                            <p class="text-center mb-0">Are you don't have account?<br>Click Register Now!</p>
                                        </v-card-text>
                                        <v-img
                                        :src="require('../assets/undraw_Lost_online_re_upmy.svg')"
                                        class="mt--5 mb-7"
                                        contain
                                        height="180"
                                        />
                                        <div class="text-center">
                                            <v-btn rounded outlined dark @click="step++">REGISTER</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                            <v-window-item :value="2">
                                <v-row class="fill-height">
                                    <v-col cols="12" md="4" class="orange accent-3">
                                        <v-btn icon dark @click.native="close" color="#fff">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-card-text class="white--text mt-12">
                                            <h1 class="text-center display-1">Welcome Back!</h1>
                                            <v-img
                                            :src="require('../assets/undraw_superhero_kguv.svg')"
                                            class="mt--5 mb-7"
                                            contain
                                            height="180"
                                            />
                                            <p class="text-center">If you have account click the Log In button</p>    
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn rounded outlined dark @click="step--">LOG IN</v-btn>
                                        </div>    
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card-text class="mt-12">
                                            <h1 class="text-center display-2 orange--text text--accent-3">Create Account</h1>
                                            <div class="text-center mt-4">
                                                <v-btn class="mx-2" fab color="#FF9100" outlined @click="comingSoon">
                                                    <v-icon>fab fa-facebook-f</v-icon>
                                                </v-btn>
                                                <v-btn class="mx-2" fab color="#FF9100" outlined @click="comingSoon">
                                                    <v-icon>fab fa-google-plus-g</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-form>
                                                <v-text-field
                                                v-model="name"
                                                label="Name"
                                                name="Name"
                                                prepend-icon="person"
                                                type="text"
                                                color="orange accent-3"
                                                ></v-text-field>
                                                <v-text-field
                                                v-model="email"
                                                label="email"
                                                name="Email"
                                                prepend-icon="email"
                                                type="email"
                                                color="orange accent-3"
                                                ></v-text-field>
                                                <v-text-field
                                                v-model="password"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="showPassword ? 'text' : 'password'"
                                                id="password"
                                                label="Password"
                                                name="Password"
                                                prepend-icon="lock"
                                                @click:append="showPassword = !showPassword"
                                                color="orange accent-3"
                                                ></v-text-field>
                                                <h4>Upload Foto</h4>
                                                <div>
                                                    <input type="file" ref="photo" name="photo" >
                                                </div>
                                            </v-form>
                                        </v-card-text>
                                        <div class="text-center mb-8">
                                            <v-btn rounded color="orange accent-3" dark @click="register">REGISTER</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () { 
   return {
       step: 1,
       email: '',
       password: '',
       showPassword: false,
       name : '',
       photo_profile : '',
       apiDomain: "https://demo-api-vue.sanbercloud.com",
       
   }
  },
  methods: {
      comingSoon() {
          this.setAlert({
                status : true,
                color : 'red',
                text : 'Maaf ini cuma pajangan'
              })
      },

      ...mapActions({
            setAlert : 'alert/set',
            setToken : 'auth/setToken'
      }),

      close() {
        this.$emit('closed', false)
      },

      clearForm() {
        this.name = ''
        this.email = ''
        this.password = ''
     },

      login() {
          const config = {
              method : 'post',
              url : 'https://demo-api-vue.sanbercloud.com/api/v2/auth/login',
              data : {
                  'email' : this.email,
                  'password' : this.password
              }
          };

          this.axios(config)
          .then((response) => {
              this.setToken(response.data.access_token)
              
              this.setAlert({
                status : true,
                color : 'success',
                text : 'Login Successfully'
              })
              this.close()
              this.clearForm()             
          }).catch(() => {
            this.setAlert({
                    status : true,
                    color : 'error',
                    text : 'Login Failed'
            })
            this.close()
            this.clearForm()
          });
      },  
      register() {
         let file = this.$refs.photo.files[0]

        let formData = new FormData()
        formData.append('photo_profile', file)
        formData.append('name', this.name)
        formData.append('email', this.email)
        formData.append('password', this.password)

          let config = {
              method : 'post',
              url : this.apiDomain + "/api/v2/auth/register",
              header : {
                  'Accept' : 'application/json'
              },
              data : formData
          };

          this.axios(config)
          .then(() => {
              this.login()
              this.setAlert({
                status : true,
                color : 'success',
                text : 'Register Successfully!'
              })
              this.close()
              this.clearForm()              
          }).catch(() => {
            this.setAlert({
                status : true,
                color : 'red',
                text : 'Register Failed'
              })
              this.close()
          });
      },

  },
  props: {
      source: String
  }
};
</script>
