export const getTestData = () => {
  return useShuttlerTwAPI.get<{
    message: string;
    success: string;
  }>("/getTestData");
};

export const testLogin = (loginData: { email: string; password: string }) => {
  return useShuttlerTwAPI.post("/testLogin", loginData, { watch: false });
};
