export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const loggedInCookie = useCookie<boolean>("loggedIn");
    if (!loggedInCookie.value && to.path !== "/login") {
      return navigateTo("/login");
    }
  }
});
