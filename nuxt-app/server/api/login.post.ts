export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  interface LoginResponse {
    message: string;
    data: {
      token: string;
      user: Record<string, any>;
    };
  }

  try {
    const { data, message } = await $fetch<LoginResponse>("https://dev-api.shuttler.tw/api/v1/auth/login", {
      method: "POST",
      body: {
        email,
        password
      }
    });
    const { token, user } = data;
      await setUserSession(event, {
        user,
      });
    return {
      message,
      token,
    }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 401,
      message: error as string,
    });
  }
});
