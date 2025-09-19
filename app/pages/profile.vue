<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
    <div
      class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200/50 p-8 max-w-2xl mx-auto"
    >
      <!-- Profile Header -->
      <div class="text-center mb-8">
        <div
          class="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
        >
          <Icon name="i-lucide-user" class="w-12 h-12 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-emerald-900 mb-2">
          {{ user?.username || "Unknown User" }}
        </h1>
        <p class="text-emerald-600 font-medium">Heritage Explorer</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl border border-yellow-200/50 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Icon
            name="i-lucide-star"
            class="w-8 h-8 mx-auto mb-3 text-amber-600"
          />
          <p class="text-sm font-medium text-amber-800 mb-1">Points</p>
          <p class="text-2xl font-bold text-amber-900">
            {{ user?.score?.points || 0 }}
          </p>
        </div>

        <div
          class="text-center p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl border border-orange-200/50 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Icon
            name="i-lucide-flame"
            class="w-8 h-8 mx-auto mb-3 text-orange-600"
          />
          <p class="text-sm font-medium text-orange-800 mb-1">Streak</p>
          <p class="text-2xl font-bold text-orange-900">
            {{ user?.score?.currentStreak || 0 }}
          </p>
          <p class="text-xs text-orange-600 mt-1">quizzes</p>
        </div>

        <div
          class="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Icon
            name="i-lucide-trophy"
            class="w-8 h-8 mx-auto mb-3 text-purple-600"
          />
          <p class="text-sm font-medium text-purple-800 mb-1">Level</p>
          <p class="text-2xl font-bold text-purple-900">
            {{ Math.floor((user?.score?.points || 0) / 100) + 1 }}
          </p>
          <p class="text-xs text-purple-600 mt-1">explorer</p>
        </div>
      </div>

      <!-- Progress Section -->
      <div
        class="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50"
      >
        <h3 class="text-lg font-semibold text-emerald-900 mb-4">
          Level Progress
        </h3>
        <div class="flex justify-between text-sm text-emerald-700 mb-2">
          <span>Next Level</span>
          <span>{{ (user?.score?.points || 0) % 100 }}/100 XP</span>
        </div>
        <div class="w-full bg-emerald-200 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
            :style="{ width: `${(user?.score?.points || 0) % 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types/user";

definePageMeta({
  title: "Profile",
});

const user = useCookie<User>("user");
</script>
