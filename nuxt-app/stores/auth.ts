export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      // 存储到 localStorage
      localStorage.setItem("token", token);
    },

    clearToken() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },

    initializeToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
