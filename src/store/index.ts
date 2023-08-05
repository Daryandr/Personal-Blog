import Vue from "vue";
import Vuex from "vuex";
import { Post } from "@/types";

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
    },
    addPost(state, post: Post) {
      state.posts.unshift(post);
    },
    editPost(state, post) {
      const index = state.posts.findIndex((p: Post) => p.id === post.id);
      state.posts.splice(index, 1, post);
    },
  },
  actions: {
    getPosts({ commit }) {
      const posts = localStorage.getItem("posts");
      if (posts != null) {
        commit("setPosts", JSON.parse(posts));
      }
    },
    delPost({ commit }, payload) {
      commit("delPost", payload);
      localStorage.setItem("posts", JSON.stringify(this.state.posts));
    },
    addPost({ commit }, payload) {
      commit("addPost", payload);
      localStorage.setItem("posts", JSON.stringify(this.state.posts));
    },
    editPost({ commit }, payload) {
      commit("editPost", payload);
      localStorage.setItem("posts", JSON.stringify(this.state.posts));
    },
  },
});
