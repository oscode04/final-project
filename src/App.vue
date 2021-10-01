<template>
<!-- App.vue -->
<v-app>

  <alert/>
  <Dialog/>
  
  <v-navigation-drawer app v-model="drawer" hide-overlay temporary>
    <v-list>
      <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://randomuser.me/api/portraits/men/78.jpg'"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="pa-2" v-if="guest">
        <v-btn block dark color="orange" class="mb-1" @click="login">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
      </div>
      
      <v-divider></v-divider>

      <v-list-item
        v-for="(item, index) in menus"
        :key="`menu-${index}`"
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon left>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <router-link 
        active-class="active"
        class="text-decoration-none d-flex align-center" 
        to="/create-blog" 
        style="color: black"
        tag="li"
        v-if="!guest"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon left>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Create Blog</v-list-item-title>
          </v-list-item-content>        
        </v-list-item>
      </router-link>
    </v-list>
      
    <template v-slot:append v-if="!guest">
      <div class="pa-2"> 
        <v-btn block color="red" dark @click="logout">
          <v-icon left>mdi-lock</v-icon>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- TopNav -->
  <v-app-bar
    app
    sticky
    color="white"
    elevate-on-scroll
  >
    <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-btn href="/" id="logo" class="font-weight-black" depressed text><h3>BLOGGERS</h3></v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="hidden-sm-and-down">
      <v-list class="d-flex align-center">
        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    
    <div class="hidden-sm-and-down">
      <v-list class="d-flex align-center">
        <v-list-item v-if="!guest">
          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-avatar>
                  <v-img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://randomuser.me/api/portraits/men/78.jpg'"></v-img>
                </v-list-item-avatar>
              </v-btn>
            </template>
            
            <v-list>
              <v-list-item>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn block dark  color="orange">
                    <v-icon left>mdi-pencil</v-icon>
                      <router-link 
                        class="text-decoration-none" 
                        to="/create-blog" 
                        style="color: white"
                      >Create Blog</router-link>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn block color="red" dark @click="logout">
                    <v-icon left>mdi-lock</v-icon>
                    Logout
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <div class="pa-1 d-flex align-center" v-if="guest" >
          <v-btn @click="login" text large>
            Login
          </v-btn>
        </div> 
        <v-divider></v-divider>
      </v-list>
    </div>

  </v-app-bar>

  <!-- main conten  -->
  <v-main>
    <v-container fill-height>
      <v-slide-y-transition>
        <router-view></router-view>
      </v-slide-y-transition>
    </v-container>
  </v-main>

  <v-footer app>
    <v-container class="text-center">
      &copy; Kelompok 8 | Final Project
    </v-container>
  </v-footer>
</v-app>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'App',
  components: { 
    Alert : () => import('./components/Alert.vue'),
    Dialog : () => import('./components/Dialog.vue')
  },

  data: () => ({
    drawer : false,
    menus : [
      { title : 'Home', icon : 'mdi-home', route: '/'},
      { title : 'Our Blogs', icon : 'mdi-note', route: '/our-blogs'}
    ],
    apiDomain: 'https://demo-api-vue.sanbercloud.com'
  }),

  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      token: 'auth/token'
    })
  },

  methods: {
    logout(){
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/me",
        headers: {
          'Authorization' : 'Bearer ' + this.token
        }
      }

      this.axios(config)
        .then(() => {
          this.setToken('')
          this.setUser({})
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Anda berhasil logout'
          })
          if (this.$router.currentRoute.path !== '/') {
            this.$router.push('/')
          }
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Anda gagal logout'
          })
          if (this.$router.currentRoute.path !== '/') {
            this.$router.push('/')
          }
        })
    },

    login(){
      this.setDialogComponent({'component' : 'login'})
    },
    register() {
      this.setDialogComponent({ component: "login" });
    },

    ...mapActions ({
      setAlert: 'alert/set',
      setDialogComponent : 'dialog/setComponent', 
      setToken : 'auth/setToken',
      setUser : 'auth/setUser',
      checkToken: 'auth/checkToken'
    }),

  },

  mounted() {
    if (this.token) {
      this.checkToken(this.token)
    }
  },
};
</script>

<style>
  .active {
    background-color: rgba(102, 102, 102, 0.2);
  }
 li:hover{
    cursor: pointer;
    background-color: rgba(102, 102, 102, 0.07);
  }
</style>
