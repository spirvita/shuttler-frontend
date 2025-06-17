export default defineEventHandler(async (event) => {
  interface LoginResponse {
    data: {
      member: {
        token: string;
        user: {
          name: string;
          email: string;
        };
      };
    };
  }

  try {
    const response = await $fetch<LoginResponse>(
      "https://dev-api.spirvita.tw/api/v1/auth/google"
    );
    const { token, user } = response.data.member;
    await setUserSession(event, {
      user
    });
    return {
      token
    };
  } catch {
    throw createError({
      statusCode: 400,
      message: "登入失敗"
    });
  }
});
