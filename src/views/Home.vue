<template>
  <v-container class="ma-0 pa-0 text-center">
    <h1 class="text-uppercase">
      welcome <br />
      to the blogger website
    </h1>
    <p>Share your story with other here</p>
    <div v-if="!guest">
      <router-link to="/create-blog" class="text-decoration-none" style="color: black">
        <v-btn
          style="margin-top: 50px"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          start writing
        </v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },
};
</script>