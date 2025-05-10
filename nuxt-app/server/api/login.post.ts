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
    const { data, message } = await $fetch<LoginResponse>(`${process.env.NUXT_API_BASE_URL}/auth/login`, {
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
    throw createError({
      statusCode: 401,
      message: "帳號或密碼錯誤"
    });
  }
});
