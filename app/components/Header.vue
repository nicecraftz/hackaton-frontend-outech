<template>
  <div
    class="bg-gradient-to-r from-emerald-800/90 to-green-700/90 backdrop-blur-md rounded-b-xl shadow-lg border-b border-emerald-600/30"
  >
    <div class="p-3 flex justify-evenly">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-50 font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95"
        active-class="bg-white/25 text-white shadow-md"
      >
        <Icon :name="route.icon" class="w-5 h-5" />
        <span>{{ route.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const routes = ref([
  { name: "Home", path: "/", icon: "i-lucide-home" },
  { name: "Play", path: "/play", icon: "i-lucide-gamepad-2" },
  { name: "Profile", path: "/profile", icon: "i-lucide-user" },
]);
</script>
