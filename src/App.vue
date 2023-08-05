<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="0">
      <v-icon class="mr-2" large>mdi-post</v-icon>
      <div class="app-name text-h5">Personal Blog</div>
    </v-app-bar>

    <v-main>
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
