<template>
  <post-card />
</template>

<script lang="ts">
import Vue from "vue";
import PostCard from "../components/PostCard.vue";

export default Vue.extend({
  name: "HomePage",

  components: {
    PostCard,
  },
});
</script>
