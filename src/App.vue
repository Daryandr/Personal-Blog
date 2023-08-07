<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="0">
      <v-icon class="mr-2" large>mdi-post</v-icon>
      <router-link
        to="/"
        class="app-name text-h5 text-decoration-none white--text"
      >
        Personal Blog
      </router-link>
    </v-app-bar>

    <v-main class="mt-8">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  created() {
    this.$store.dispatch("getPosts");
  },
});
</script>

<style lang="scss" scoped>
.app-name {
  font-family: "Montserrat", sans-serif;
}
</style>
