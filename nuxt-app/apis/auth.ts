export const testGetData = () => {
  return useShuttlerTwAPI.get<{
    message: string;
    success: string;
  }>("/testGetData");
};

export const testLogin = async (loginData: {
  email: string;
  password: string;
}) => {
  return useShuttlerTwAPI.post("/testLogin", loginData);
};
