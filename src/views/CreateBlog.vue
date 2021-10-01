<template>
  <v-card id="background" color="orange" dark>
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
        <div class="orange text-center">
          <h1 class="white--text" id="createOutBlog">Create Our Blog</h1>
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
            id="buttonSubmit"
            class="mr-4"
            @click.prevent="submit"
            color="blue-grey lighten-2"
            >Publish
          </v-btn>
          <v-btn @click="clear" color="blue-grey lighten-2">Cancel</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>



<script>
import { mapState } from "vuex";
export default {
  name: "CreateBlog",
  data() {
    return {
      message: "",
      descriptionCreate: "",
      fileInput: [],
    };
  },

  methods: {
    submit() {
      const newBlog = {
        message: this.message,
        descriptionCreate: this.descriptionCreate,
        fileInput: this.fileInput,
      };

      this.$store.dispatch("createBlog", newBlog);
      this.message = "";
      this.descriptionCreate = "";
      this.fileInput = [];
    },
    clear() {
      this.message = "";
      this.descriptionCreate = "";
      this.fileInput = [];
      this.$router.push("/");
    },
  },

  computed: {
    ...mapState(["createBlog"]),
  },
};
</script>

<style scoped>
#background {
  width: 100%;
}
#buttonSubmit {
  margin-left: 20px;
  margin-bottom: 10px;
}
#createOutBlog {
  margin-bottom: 20px;
}
</style>