<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col lg="8" md="9" sm="10">
        <div class="d-flex justify-space-between">
          <p class="text-h5 post-text">{{ post.title }}</p>

          <div class="d-flex">
            <v-btn @click="isEditModalOpen = true" class="mx-3" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deletePost" icon><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </div>

        <v-divider class="mb-4" />
        <p class="post-text">{{ post.shortDescription }}</p>
        <p class="post-text">{{ post.description }}</p>
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

        <add-modal
          v-if="isEditModalOpen"
          :visible="isEditModalOpen"
          :post-id="postId"
          header="Редактирование поста"
          @close="isEditModalOpen = false"
          @save="savePost"
        />
        <confirm-modal ref="confirm" />
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
import AddModal from "@/components/AddModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

interface ConfirmModalComponent extends Vue {
  open(message: string): Promise<boolean>;
}

export default Vue.extend({
  name: "HomePage",
  components: {
    CommentForm,
    CommentCard,
    AddModal,
    ConfirmModal,
  },
  data: () => ({
    isComFormOpen: false,
    isEditModalOpen: false,
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
    savePost(p: Post) {
      this.editPost(p);
      this.isEditModalOpen = false;
    },
    saveComment(comment: Comment) {
      this.addComment({
        id: this.postId,
        comment: comment,
      });
    },
    async deletePost() {
      if (
        await (this.$refs.confirm as ConfirmModalComponent).open(
          `Вы точно хотите удалить пост "${this.post.title}"?`
        )
      ) {
        this.delPost(this.postId);
        this.$router.push("/");
      }
    },
  },
});
</script>
