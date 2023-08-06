<template>
  <v-row class="justify-center">
    <v-col lg="5" md="6" sm="7">
      <router-link :to="'/post/' + post.id" class="text-decoration-none">
        <v-card
          class="pa-2"
          :elevation="elevation"
          @mouseover="elevation = 4"
          @mouseleave="elevation = 2"
        >
          <v-card-title>{{ post.title }}</v-card-title>
          <v-divider />
          <v-card-text>
            <p class="body-1 black--text">{{ post.shortDescription }}</p>
            <div class="d-flex justify-space-between">
              <p>Комментарии ({{ post.comments.length }})</p>
              <p>{{ formattedDate }}</p>
            </div>
          </v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Post } from "@/types";

export default Vue.extend({
  name: "PostCard",

  props: {
    post: {
      required: true,
    },
  },
  data: () => ({
    elevation: 2,
  }),
  computed: {
    formattedDate() {
      return new Date((this.post as Post).date).toLocaleDateString("ru-RU");
    },
  },
});
</script>
