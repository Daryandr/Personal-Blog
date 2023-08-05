<template>
  <v-card>
    <p>{{ post.title }}</p>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostCard",

  props: {
    post: {
      required: true,
    },
  },
});
</script>
