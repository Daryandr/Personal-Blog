import Vue from "vue";
import Vuex from "vuex";
import { Comment, Post } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [] as Post[],
  },
  getters: {
    getPostById: (state) => (id: string) => {
      return state.posts.find((post: Post) => post.id === id);
    },
  },
  mutations: {
    setPosts(state, posts: Post[]) {
      state.posts = posts;
    },
    delPost(state, id: string) {
      const index = state.posts.findIndex((post: Post) => post.id === id);
      state.posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    addPost(state, post: Post) {
      state.posts.unshift(post);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    editPost(state, post) {
      const index = state.posts.findIndex((p: Post) => p.id === post.id);
      state.posts.splice(index, 1, post);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    delComment(state, payload) {
      const index = state.posts.findIndex(
        (post: Post) => post.id === payload.id
      );
      const comIndex = state.posts[index].comments.findIndex(
        (comment: Comment) => comment.id === payload.comment.id
      );
      state.posts[index].comments.splice(comIndex, 1);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    addComment(state, payload) {
      const index = state.posts.findIndex(
        (post: Post) => post.id === payload.id
      );
      state.posts[index].comments.unshift(payload.comment);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },
  actions: {
    getPosts({ commit }) {
      const posts = localStorage.getItem("posts");
      if (posts != null) {
        commit("setPosts", JSON.parse(posts));
      }
    },
  },
});
