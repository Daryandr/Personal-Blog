<template>
  <v-form ref="commentForm" lazy-validation @submit.prevent="saveComment">
    <div class="d-flex">
      <v-text-field
        color="secondary"
        prepend-icon="mdi-account"
        class="mr-10"
        v-model="comment.username"
        label="Имя"
        :rules="nameRules"
        clearable
        required
      />
      <v-text-field
        v-model="comment.email"
        prepend-icon="mdi-email"
        color="secondary"
        label="Email"
        :rules="emailRules"
        clearable
      />
    </div>
    <v-textarea
      v-model="comment.text"
      class="mt-3"
      color="secondary"
      label="Комментарий"
      :rules="textRules"
      outlined
      clearable
      auto-grow
      rows="3"
      required
      autofocus
    />
    <v-spacer />
    <div class="d-flex justify-end mb-6">
      <v-btn color="grey" @click="$emit('close')" class="mr-3" dark>
        Отмена
      </v-btn>
      <v-btn color="primary" type="submit">Отправить</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

export default Vue.extend({
  name: "HomePage",

  data: () => ({
    comment: {
      id: "",
      username: "",
      email: "",
      text: "",
    },
    nameRules: [
      (v: string) => !!v || "Введите имя",
      (v: string) => (v && v.length <= 50) || "Максимальная длина 50 символов",
    ],
    emailRules: [
      (v: string) => !!v || "Введите Email",
      (v: string) =>
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
          v
        ) || "Некорректный Email",
      (v: string) => (v && v.length <= 50) || "Максимальная длина 50 символов",
    ],
    textRules: [
      (v: string) => !!v || "Введите комментарий",
      (v: string) =>
        (v && v.length <= 255) || "Максимальная длина 255 символов",
    ],
  }),

  methods: {
    saveComment() {
      const valid = (
        this.$refs.commentForm as Vue & { validate: () => boolean }
      ).validate();
      if (valid) {
        this.comment.id = uuidv4();
        this.$emit("save", structuredClone(this.comment));
        this.comment.text = "";
        (
          this.$refs.commentForm as Vue & { resetValidation: () => boolean }
        ).resetValidation();
      }
    },
  },
});
</script>
