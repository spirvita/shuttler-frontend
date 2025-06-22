export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email } = body;

  try {
    await setUserSession(event, {
      user:
        {
          name,
          email
        }
    });
  } catch {
    throw createError({
      statusCode: 400,
      message: "登入失敗"
    });
  }
});
