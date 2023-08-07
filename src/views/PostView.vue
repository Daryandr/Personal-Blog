<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col lg="8" md="9" sm="10">
        <div class="d-flex justify-space-between">
          <p class="text-h5">{{ post.title }}</p>
          <div class="d-flex">
            <v-btn class="mr-3" icon><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn @click="deletePost" icon><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </div>
        <v-divider class="mb-4" />
        <p>{{ post.shortDescription }}</p>
        <p>{{ post.description }}</p>
        <p>Дата обновления: {{ formattedDate }}</p>
        <p>Комментарии ({{ post.comments.length }}):</p>
        <v-text-field
          filled
          dense
          class="mt-3"
          @click="isComFormOpen = true"
          v-if="!isComFormOpen"
          value="Написать комментарий..."
        />
        <comment-form
          v-if="isComFormOpen"
          @close="isComFormOpen = false"
          @save="saveComment"
        />
        <comment-card
          v-for="com in post.comments"
          :key="com.id"
          :comment="com"
          class="my-3"
          @delete="delComment({ id: postId, comment: com })"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import { Comment, Post } from "@/types";
import CommentForm from "@/components/CommentForm.vue";
import CommentCard from "@/components/CommentCard.vue";

export default Vue.extend({
  name: "HomePage",
  components: {
    CommentForm,
    CommentCard,
  },
  data: () => ({
    isComFormOpen: false,
  }),

  computed: {
    postId(): string {
      return this.$route.params.id;
    },
    post(): Post {
      return this.$store.getters.getPostById(this.postId);
    },
    formattedDate(): string {
      return new Date(this.post.date).toLocaleDateString("ru-RU");
    },
  },

  methods: {
    ...mapMutations(["delPost", "editPost", "addComment", "delComment"]),
    saveComment(comment: Comment) {
      this.addComment({
        id: this.postId,
        comment: comment,
      });
    },
    deletePost() {
      this.delPost(this.postId);
      this.$router.push("/");
    },
  },
});
</script>
