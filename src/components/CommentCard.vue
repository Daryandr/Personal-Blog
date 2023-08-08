<template>
  <v-card class="pa-3" elevation="0" outlined>
    <div class="d-flex mb-3">
      <v-icon large>mdi-account-circle</v-icon>
      <div>
        <p class="text-subtitle-1 mb-n2 ml-2">{{ comment.username }}</p>
        <p class="text-caption mb-0 ml-2">{{ comment.email }}</p>
      </div>

      <v-spacer />

      <v-btn @click="$emit('delete')" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <p class="px-1">{{ comment.text }}</p>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",

  props: {
    comment: {
      required: true,
    },
  },
});
</script>
