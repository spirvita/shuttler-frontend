export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),

  actions: {
    setToken(token: string) {
      const cookie = useCookie("token")
      this.token = token;
      cookie.value = token;
    },

    async clearToken() {
      const { clear, fetch } = useUserSession();
      this.token = null;
      this.user = null;
      await clear();
      await fetch();
      const cookie = useCookie("token")
      cookie.value = null;
      navigateTo("/");
    },

    initializeToken() {
      const cookie = useCookie("token")
      const token = cookie.value;
      if (token) {
        this.token = token;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
