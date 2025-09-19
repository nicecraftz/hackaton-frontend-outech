<template>
  <div class="relative h-full w-full overflow-hidden cursor-pointer">
    <img
      :src="props.imageUrl"
      alt="Heritage Image"
      class="h-full w-full object-cover transition-transform duration-700 ease-out"
      :class="props.isActive ? 'scale-105' : 'scale-100'"
    />

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
    />

    <!-- Content overlay -->
    <div
      class="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500 ease-out"
      :class="
        props.isActive
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-80'
      "
    >
      <h1
        class="text-3xl font-bold mb-3 transition-all duration-700 ease-out"
        :class="
          props.isActive ? 'transform translate-x-0' : 'transform translate-x-2'
        "
      >
        {{ heritage.name }}
      </h1>
      <p
        class="text-lg opacity-90 line-clamp-3 transition-all duration-700 delay-100 ease-out"
        :class="
          props.isActive ? 'transform translate-x-0' : 'transform translate-x-2'
        "
      >
        {{ getDescription() }}
      </p>

      <!-- Action hint -->
      <div
        class="mt-4 flex items-center gap-2 text-sm opacity-75 transition-all duration-500 delay-200"
        :class="props.isActive ? 'opacity-75' : 'opacity-0'"
      >
        <Icon name="i-lucide-touch" class="w-4 h-4" />
        <span>Tap to explore</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from "~/types/heritage";

const props = defineProps<{
  heritage: Heritage;
  imageUrl: string;
  isActive?: boolean;
}>();

const getDescription = () => {
  const desc = props.heritage.description || "";
  return desc.length > 120 ? desc.substring(0, 120) + "..." : desc;
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
