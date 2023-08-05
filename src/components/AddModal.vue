<template>
  <v-dialog v-model="show" width="30rem" persistent>
    <v-card class="pa-2">
      <v-card-title class="d-flex justify-space-between">
        <span class="text-h6">Добавление поста</span>
        <v-btn class="ml-2" small plain icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-form ref="addForm" lazy-validation @submit.prevent="submit">
        <v-card-text>
          <v-text-field
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
          <v-btn color="primary" type="submit" :loading="isLoading">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

export default Vue.extend({
  name: "AddModal",

  props: {
    visible: Boolean,
  },

  data: () => ({
    post: {
      id: uuidv4(),
      title: "",
      shortDescription: "",
      description: "",
      date: new Date().toJSON().slice(0, 10),
      comments: [],
    },
    titleRules: [
      (v: any) => !!v || "Введите заголовок",
      (v: any) => v.length <= 50 || "Максимальная длина 50 символов",
    ],
    shortRules: [
      (v: any) => !!v || "Введите описание",
      (v: any) => v.length <= 100 || "Максимальная длина 100 символов",
    ],
    descRules: [
      (v: any) => v.length <= 255 || "Максимальная длина 255 символов",
    ],
    isLoading: false,
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
  },
  methods: {
    cancel() {
      this.show = false;
    },
    async submit() {
      const valid = (
        this.$refs.addForm as Vue & { validate: () => boolean }
      ).validate();
      if (valid) {
        this.isLoading = true;
        this.$emit("save", this.post);
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
