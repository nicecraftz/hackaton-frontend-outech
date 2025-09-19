<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-5">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p class="text-gray-600">
          Please enter your credentials to access your account.
        </p>
      </div>

      <div class="space-y-4">
        <UInput
          v-model="username"
          icon="i-lucide-user"
          placeholder="Enter your username"
          color="neutral"
          size="lg"
          class="w-full"
        />

        <UButton
          :color="error ? 'error' : 'neutral'"
          size="lg"
          icon="i-lucide-log-in"
          class="w-full justify-center"
          label="Sign In"
          :disabled="!username.trim() || pending"
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";

definePageMeta({
  title: "Login",
  layout: "auth",
});

const username = ref("");
const pending = ref(false);
const error = ref();

const login = async () => {
  pending.value = true;
  const {
    data: response,
    pending: fetchPending,
    error: fetchError,
  } = await useFetch<User>(
    "http://protocol.alessandrocalista.it:8080/api/v1/users/login",
    {
      method: "POST",
      body: {
        username: username.value,
      },
    }
  );

  watch(fetchError, (newVal) => {
    error.value = newVal;
  });

  watch(fetchPending, (newVal) => {
    pending.value = newVal;
  });

  if (response.value && import.meta.client) {
    const userCookie = useCookie<User>("user");
    userCookie.value = response.value;
    const loggedIn = useCookie<boolean>("loggedIn");
    loggedIn.value = true;
    await navigateTo({ path: "/" });
  }
};
</script>
