<template>
    <v-col cols="12"
            sm="6"
            md="4"
            lg="3">
        <v-card :to="'/detail-blog/' + blog.id" 
            max-width="400px">
          <v-img
            :src="blog.photo ? apiDomain + blog.photo : 'https://dummyimage.com/300'"
            class="white--text"
            height="200px"
            style="background-color: rgba(102, 102, 102, 0.35);"
          >
            <v-card-title
              class="fill-height align-end"
              v-text="blog.title"
            ></v-card-title>
          </v-img>
          <v-card-actions>
            <v-progress-linear
              color="blue-grey"
              height="7"
            >
            </v-progress-linear>
          </v-card-actions>
          <v-card-actions>
            <span>{{ blog.description.substring(0,15) }}...</span>
          </v-card-actions>
        </v-card>
      </v-col>
</template>

<script>
export default {
    data: () => ({
    apiDomain: 'https://demo-api-vue.sanbercloud.com'
  }),
  props: ['blog'],

}
</script>