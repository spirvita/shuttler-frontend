export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (email === "777@gmail.com" && password === "123456") {
    const user = {
      name: "Vic"
    };
    await setUserSession(event, {
      user
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    message: "email or password is incorrect"
  });
});
