<template>
  <v-dialog v-model="show" width="30rem" persistent>
    <v-card class="pa-2">
      <v-card-title class="d-flex justify-space-between">
        <span class="text-h6">{{ header }}</span>
        <v-btn class="ml-2" small plain icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-form ref="addForm" lazy-validation @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            color="secondary"
            v-model="post.title"
            class="my-2"
            label="Заголовок"
            :rules="titleRules"
            outlined
            clearable
            required
          />
          <v-textarea
            v-model="post.shortDescription"
            class="my-2"
            color="secondary"
            label="Краткое описание"
            :rules="shortRules"
            outlined
            clearable
            required
            auto-grow
            rows="1"
          />
          <v-textarea
            v-model="post.description"
            class="mt-2"
            color="secondary"
            label="Описание"
            :rules="descRules"
            outlined
            clearable
            auto-grow
            rows="4"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="cancel" dark>Отмена</v-btn>
          <v-btn color="primary" type="submit">Сохранить</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
import { Post, Comment } from "@/types";

export default Vue.extend({
  name: "AddModal",

  props: {
    visible: Boolean,
    postId: {
      type: String,
      default: undefined,
    },
    header: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    post: {
      id: "",
      title: "",
      shortDescription: "",
      description: "",
      date: "",
      comments: [] as Comment[],
    },
    titleRules: [
      (v: string) => !!v || "Введите заголовок",
      (v: string) => (v && v.length <= 50) || "Максимальная длина 50 символов",
    ],
    shortRules: [
      (v: string) => !!v || "Введите описание",
      (v: string) =>
        (v && v.length <= 100) || "Максимальная длина 100 символов",
    ],
    descRules: [
      (v: string) =>
        (v && v.length <= 255) || "Максимальная длина 255 символов",
    ],
  }),
  computed: {
    show: {
      get(): boolean {
        return this.visible;
      },
      set(value: boolean) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    postData(): Post {
      return this.$store.getters.getPostById(this.postId);
    },
  },
  created() {
    if (this.postData) {
      this.post = structuredClone(this.postData);
    } else {
      this.post = {
        id: uuidv4(),
        title: "",
        shortDescription: "",
        description: "",
        date: new Date().toJSON().slice(0, 10),
        comments: [],
      };
    }
  },
  methods: {
    cancel() {
      this.show = false;
    },
    submit() {
      const valid = (
        this.$refs.addForm as Vue & { validate: () => boolean }
      ).validate();
      if (valid) {
        this.$emit("save", this.post);
      }
    },
  },
});
</script>
