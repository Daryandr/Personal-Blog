<template>
  <v-container>
    <div
      v-if="posts.length === 0"
      class="d-flex justify-center text-h6 mt-15 mb-6"
    >
      Вы еще не добавили ни одного поста
    </div>

    <div class="d-flex justify-center mb-3">
      <v-btn text color="secondary" @click.stop="isAddModalOpen = true">
        <v-icon class="mr-1">mdi-plus</v-icon>
        Добавить пост
      </v-btn>
    </div>

    <add-modal
      v-if="isAddModalOpen"
      :visible="isAddModalOpen"
      header="Добавление поста"
      @close="isAddModalOpen = false"
      @save="savePost"
    />

    <v-row v-for="post in posts" :key="post.id" class="justify-center">
      <v-col lg="5" md="6" sm="7">
        <post-card :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PostCard from "../components/PostCard.vue";
import AddModal from "@/components/AddModal.vue";
import { Post } from "@/types";

export default Vue.extend({
  name: "HomePage",

  data: () => ({
    isAddModalOpen: false,
  }),

  components: {
    AddModal,
    PostCard,
  },

  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    savePost(post: Post) {
      this.$store.commit("addPost", post);
      this.isAddModalOpen = false;
    },
  },
});
</script>
