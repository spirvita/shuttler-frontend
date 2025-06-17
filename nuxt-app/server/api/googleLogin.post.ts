export default defineEventHandler(async (event) => {
  interface LoginResponse {
    message: string;
    data: {
      token: string;
      user: {
        id: string;
        name: string;
        points: number;
      };
    };
  }

  try {
    const { data, message } = await $fetch<LoginResponse>(
      "https://dev-api.spirvita.tw/api/v1/auth/google",
      {
        method: "POST"
      }
    );
    const { token, user } = data;
    await setUserSession(event, {
      user
    });
    return {
      message,
      token
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 400,
      message: "登入失敗"
    });
  }
});
