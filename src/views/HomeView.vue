<template>
  <v-container>
    <div
      v-if="posts.length === 0"
      class="d-flex justify-center text-h6 mt-16 mb-3"
    >
      Вы еще не добавили ни одного поста
    </div>
    <div class="d-flex justify-center my-3">
      <v-btn text color="secondary" @click.stop="isAddModalOpen = true">
        <v-icon class="mr-1">mdi-plus</v-icon>
        Добавить пост
      </v-btn>
    </div>
    <add-modal
      v-if="isAddModalOpen"
      :visible="isAddModalOpen"
      @close="isAddModalOpen = false"
      @save="savePost"
    />
    <post-card v-for="post in posts" :key="post.id" :post="post" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PostCard from "../components/PostCard.vue";
import AddModal from "@/components/AddModal.vue";
import { mapActions } from "vuex";
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
    ...mapActions(["delPost", "addPost", "editPost"]),
    savePost(post: Post) {
      this.addPost(post);
      this.isAddModalOpen = false;
    },
  },
});
</script>
