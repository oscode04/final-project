<template>
  <v-container fill-height>
  <alert/>
    <v-layout>
      <v-flex>
        <v-card color="orange" dark>
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="amber lighten-4"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          
          <v-form>
            <v-container>
              <v-img 
                class="white--text align-end" 
                height="250px" 
                :src="detailBlog.photo ? apiDomain + detailBlog.photo : 'https://dummyimage.com/300'">
              </v-img>
              <div class="orange text-center">
                <span class="white--text">Edit Blog</span>
              </div>
              <v-row>
                <v-col cols="12" md="20">
                  <v-text-field v-model="message" filled label="Title"></v-text-field>
                </v-col>
                <br />
                <v-divider></v-divider>
                <v-col id="descriptionCreate" cols="12" md="20">
                  <v-text-field
                    v-model="descriptionCreate"
                    filled
                    label="Description"
                  ></v-text-field>
                </v-col>
                <v-divider></v-divider>
                <v-col cols="12" md="20">
                  <v-file-input
                    v-model="fileInput"
                    label="Upload Photo"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-divider></v-divider>
                <v-btn
                  class="mr-4"
                  @click="updateBlog"
                  color="blue-grey lighten-2"
                  >Save
                </v-btn>
                <v-btn @click="back" color="blue-grey lighten-2">Back</v-btn>
              </v-row>
            </v-container>
          </v-form>
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
      fileInput: [],
    };
  },

  methods: {
    back() {
      this.$router.push("/detail-blog/" + this.blogId);
    },
    getDetailBlog() {
      this.$store.dispatch("getDetailBlog", +this.blogId);
      this.message = this.detailBlog.title;
      this.descriptionCreate = this.detailBlog.description;
    },
    updateBlog() {
      let file = this.fileInput;
      let formData = new FormData();
      formData.append("photo", file);

      let config = {
          method : "POST",
          url : `${this.apiDomain}/api/v2/blog/${this.blogId}`,
          params : { _method : 'PUT'},
          headers: {
              'Authorization' : 'Bearer ' + this.token
          },
          data : {
            title: this.message,
            description: this.descriptionCreate,
          }
      }

      let configUpload = {
        method : "POST",
        url : `${this.apiDomain}/api/v2/blog/${this.blogId}/upload-photo`,
        headers: {
            'Authorization' : 'Bearer ' + this.token
        },
        data : formData
      }

      this.axios(config)
      .then(() => {
        this.axios(configUpload)
          .then(() => {
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Successfully Changed Data'
            })
            this.back()
          })
          .catch(() => {
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Failed Changed Data'
            })
          })
      })
      .catch(() => {
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Failed Changed Data'
          })
      })
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
      token: "auth/token",
    }),
  },
};
</script>

<style scoped>
#detail-blog {
  margin-top: 45px;
}
#button-detail-blog {
  margin-bottom: 10px;
  margin-left: 15px;
}
</style>