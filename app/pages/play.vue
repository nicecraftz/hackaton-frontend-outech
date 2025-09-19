<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div v-if="pending" class="text-center text-emerald-600 py-12">
        <Icon
          name="i-lucide-loader-2"
          class="w-8 h-8 animate-spin mx-auto mb-2"
        />
        <p>Loading heritage...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-600 py-12">
        <Icon name="i-lucide-alert-circle" class="w-8 h-8 mx-auto mb-2" />
        <p>Error loading heritage: {{ error }}</p>
      </div>

      <div
        v-else
        class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200/50 p-8"
      >
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-emerald-900 mb-3">
            Heritage Quiz
          </h1>
          <p class="text-emerald-700">Test your UNESCO knowledge!</p>
        </div>

        <!-- Score Display -->
        <div class="flex justify-center gap-4 mb-8">
          <div
            class="text-center p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl border border-amber-200/50"
          >
            <Icon
              name="i-lucide-star"
              class="w-5 h-5 mx-auto text-amber-600 mb-1"
            />
            <p class="text-xs text-amber-800 font-medium">Current Points</p>
            <p class="text-lg font-bold text-amber-900">{{ currentPoints }}</p>
          </div>

          <div
            class="text-center p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border border-emerald-200/50"
          >
            <Icon
              name="i-lucide-trophy"
              class="w-5 h-5 mx-auto text-emerald-600 mb-1"
            />
            <p class="text-xs text-emerald-800 font-medium">Total Score</p>
            <p class="text-lg font-bold text-emerald-900">
              {{ userCookie?.score?.points || 0 }}
            </p>
          </div>
        </div>

        <!-- Heritage Image -->
        <div class="text-center mb-8">
          <div class="relative inline-block">
            <img
              v-if="currentHeritage"
              :src="getHeritageImage(currentHeritage)"
              alt="Heritage to guess"
              class="w-full max-w-lg mx-auto rounded-xl shadow-lg border-4 border-white"
            />
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"
            ></div>
          </div>
        </div>

        <!-- Question and Input -->
        <div class="space-y-6">
          <div class="text-center">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">
              When was this heritage inscribed in the UNESCO list?
            </h2>
            <p class="text-sm text-gray-600">
              Enter the year this site became a UNESCO World Heritage Site
            </p>
          </div>

          <div class="flex gap-3">
            <UInput
              v-model="guess"
              :placeholder="getPlaceholder()"
              class="flex-1 text-lg"
              :color="fail ? 'error' : 'neutral'"
              size="lg"
              @keydown.enter="checkGuess"
            />
            <UButton
              color="primary"
              size="lg"
              icon="i-lucide-check"
              :disabled="!guess.trim() || pending"
              :loading="pending"
              @click="checkGuess"
            >
              Submit
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from "~/types/heritage";
import type { User } from "~/types/user";

definePageMeta({
  title: "Heritage Quiz",
});

const guess = ref("");
const currentHeritage = ref<Heritage | null>(null);
const pending = ref(false);
const error = ref<string | null>(null);
const fail = ref(false);
const currentPoints = ref(5);

const userCookie = useCookie<User>("user");
const toast = useToast();

// Load initial heritage
onMounted(() => {
  getRandomHeritage();
});

const getHeritageImage = (heritage: Heritage) => {
  return (
    "http://protocol.alessandrocalista.it:8080/images/" +
    heritage.images[0].filePath
  );
};

const getPlaceholder = () => {
  if (!currentHeritage.value?.inscribedDate) return "e.g., 1987";
  return "Enter year...";
};

const updateUserData = async () => {
  if (!userCookie.value) return;

  try {
    await $fetch(
      `http://protocol.alessandrocalista.it:8080/api/v1/users/points`,
      {
        method: "POST",
        body: {
          username: userCookie.value.username,
          points: userCookie.value.score.points,
          currentStreak: userCookie.value.score.currentStreak,
        },
      }
    );
  } catch (err) {
    console.error("Failed to update user data:", err);
  }
};

const getRandomHeritage = async () => {
  pending.value = true;
  error.value = null;

  try {
    const heritage = await $fetch<Heritage>(
      `http://protocol.alessandrocalista.it:8080/api/v1/heritage/random`
    );

    if (heritage) {
      currentHeritage.value = heritage;
      // Reset points for new question
      currentPoints.value = 5;
    }
  } catch (err) {
    error.value = "Failed to load heritage";
    console.error("Error fetching heritage:", err);
  } finally {
    pending.value = false;
  }
};

const checkGuess = async () => {
  if (!currentHeritage.value || !userCookie.value) return;

  const correct =
    guess.value.trim().toLowerCase() ===
    currentHeritage.value.inscribedDate.toLowerCase();

  guess.value = "";

  if (correct) {
    toast.add({
      color: "success",
      icon: "i-lucide-check-circle",
      title: "Correct!",
      description: `You earned ${currentPoints.value} points! Great job!`,
    });

    userCookie.value.score.points += currentPoints.value;
    userCookie.value.score.currentStreak += 1;

    await getRandomHeritage();
  } else {
    toast.add({
      color: "error",
      icon: "i-lucide-x-circle",
      title: "Incorrect",
      description: `Ooops, you didn't get it right! Streak reset!`,
    });

    userCookie.value.score.currentStreak = 0;
    fail.value = true;
    currentPoints.value = Math.max(1, currentPoints.value - 1);

    setTimeout(() => {
      fail.value = false;
    }, 1000);
  }

  await updateUserData();
};
</script>
