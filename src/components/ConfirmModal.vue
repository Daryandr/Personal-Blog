<template>
  <v-dialog v-model="isDialogShown" width="auto" max-width="60vw" persistent>
    <v-card class="pb-2">
      <v-card-title class="grey lighten-3">Подтверждение</v-card-title>

      <v-card-text v-if="message !== ''" class="pa-5 black--text">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" dark @click="cancel">Отмена</v-btn>
        <v-btn color="primary" @click="agree">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmModal",
  data: () => ({
    isDialogShown: false,
    resolve: null as ((value: boolean) => void) | null,
    message: "",
  }),

  methods: {
    open(message: string) {
      this.isDialogShown = true;
      this.message = message;
      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    agree() {
      if (this.resolve) {
        this.resolve(true);
        this.isDialogShown = false;
      }
    },
    cancel() {
      if (this.resolve) {
        this.resolve(false);
        this.isDialogShown = false;
      }
    },
  },
});
</script>
