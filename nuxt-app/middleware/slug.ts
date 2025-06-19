export default defineNuxtRouteMiddleware(() => {
  const router = useRouter();
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
  return router.push("/");
});
