<template>
  <v-container fill-height>
    <alert/>
      <v-layout>
        <v-flex>
          <v-card id="detail-blog" class="mx-auto" max-width="700" height="450px">
            <v-img 
              class="white--text align-end" 
              height="250px" 
              style="background-color: rgba(102, 102, 102, 0.35);"
              :src="detailBlog.photo ? apiDomain + detailBlog.photo : 'https://dummyimage.com/300'">
              <v-card-title>{{ detailBlog.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ detailBlog.created_at }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                {{ detailBlog.description }}
              </div>
            </v-card-text>

            <v-card-actions id="button-detail-blog">
              <v-btn 
                color="orange" 
                text
                :to="'/edit-blog/' + detailBlog.id"
                v-if="!guest"
              > Edit </v-btn>
              <v-btn 
                color="red" 
                text
                @click="deleteBlog"
                v-if="!guest"
              > Delete </v-btn>

              <v-btn color="orange" text @click="backToHome"> Back </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "DetailBlog",
  components: { 
    Alert : () => import('../components/Alert.vue')
  },
  data() {
    return {
      blogId: this.$route.params.blogId,
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  methods: {
    backToHome() {
      this.$router.push("/our-blogs");
    },
    getDetailBlog() {
      this.$store.dispatch("getDetailBlog", +this.blogId);
    },
    deleteBlog() {
      let valueConfirm = confirm(`Apakah anda yakin menghapus data dengan nama '${this.detailBlog.title}'?`)
      if (valueConfirm) {
        const config = {
          method  : "POST",
          url : `${this.apiDomain}/api/v2/blog/${this.blogId}`,
          params : { _method : "DELETE" },
          headers: {
            'Authorization' : 'Bearer ' + this.token
          },
        }
        this.axios(config)
          .then(() => {
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Successfully Delete Data'
            })
            this.backToHome()
          })
          .catch(() => {
            this.setAlert({
              status: true,
              color: 'error',
              text: 'Failed Delete Data'
            })
          })
      }
    },
    ...mapActions ({
      setAlert: 'alert/set'
    })
  },

  created: function () {
    this.getDetailBlog();
  },

  computed: {
    ...mapState(["detailBlog"]),
    ...mapGetters({
      token: 'auth/token',
      guest: 'auth/guest',
    })
  },
  
};
</script>

<style scoped>
#detail-blog {
  margin-top: 0px;
  width: 50%;
  height: 300px;
}
#button-detail-blog {
  position: absolute;
  bottom: 10px;
  left: -5px;
  width: 30px;
  height: 20px;
}
#description {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>