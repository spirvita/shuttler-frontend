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

export const nuxtEmailLogin = (loginData: { name: string; email: string }) => {
  return useFetch("/api/login", {
    method: "POST",
    body: loginData,
    watch: false
  });
};

export const nuxtGoogleLogin = (loginData: {
  token: string;
  name: string;
  email: string;
}) => {
  return useFetch("/api/googleLogin", {
    method: "POST",
    body: loginData,
    watch: false
  });
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
  newPassword: string;
  checkNewPassword: string;
}) => {
  return useShuttlerTwAPI.post(
    "/auth/reset-password",
    { ...resetPwPayload },
    { watch: false }
  );
};

export const forgotPassword = (email: string) => {
  return useShuttlerTwAPI.post(
    "/auth/forgot-password",
    { email },
    { watch: false }
  );
};

export const verifyResetToken = (token: string) => {
  return useShuttlerTwAPI.get<{ valid: boolean }>(
    `/auth/verify-reset-token/${token}`,
    { watch: false }
  );
};

export const resetPasswordWithToken = (resetData: {
  token: string;
  newPassword: string;
  checkNewPassword: string;
}) => {
  return useShuttlerTwAPI.post(
    "/auth/reset-pwd-with-token",
    { ...resetData },
    { watch: false }
  );
};

export const logout = () => {
  return useShuttlerTwAPI.post("/auth/logout", {}, { watch: false });
};
