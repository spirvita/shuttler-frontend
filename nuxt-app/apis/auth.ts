export const emailLogin = (loginData: { email: string; password: string }) => {
  return useShuttlerTwAPI.post<{
    data: {
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
      };
    };
    message: string;
  }>("/auth/login", loginData, { watch: false });
};

export const nuxtEmailLogin = (loginData: {
  email: string;
  password: string;
}) => {
  return useFetch("/api/login", {
    method: "POST",
    body: loginData
  });
};

export const nuxtGoogleLogin = () => {
  return useFetch("/api/googleLogin");
};

export const emailSignUp = (signUpData: {
  email: string;
  password: string;
  name: string;
}) => {
  return useShuttlerTwAPI.post<{
    data: {
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
      };
    };
    message: string;
  }>("/auth/signup", signUpData, { watch: false });
};

export const resetPassword = (resetPwPayload: {
  password: string;
  newPassword: string;
  checkNewPassword: string;
}) => {
  return useShuttlerTwAPI.post(
    "/auth/reset-password",
    { ...resetPwPayload },
    { watch: false }
  );
};

export const logout = () => {
  return useShuttlerTwAPI.post("/auth/logout", {}, { watch: false });
};
