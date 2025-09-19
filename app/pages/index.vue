<template>
  <div>
    <div v-if="pending" class="h-screen flex items-center justify-center">
      <div class="text-xl text-gray-500">Loading...</div>
    </div>
    <div v-else-if="error" class="h-screen flex items-center justify-center">
      <div class="text-xl text-red-500">Error: {{ error }}</div>
    </div>
    <div
      v-else
      class="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      @scroll="handleScroll"
    >
      <div
        v-for="(heritage, index) in heritages"
        :key="index"
        class="h-screen snap-start flex-shrink-0 relative transition-all duration-500 ease-out"
        :class="getPostClass(index)"
        @click="() => openArticle(heritage.id)"
      >
        <Post
          :heritage="heritage"
          :image-url="getHeritageImage(heritage)"
          :is-active="currentIndex === index"
        />

        <!-- Scroll indicator -->
        <div
          v-if="heritages"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-1"
        >
          <div
            v-for="(_, i) in Math.min(heritages.length, 5)"
            :key="i"
            class="w-1 h-8 rounded-full transition-all duration-300"
            :class="i === currentIndex % 5 ? 'bg-white' : 'bg-white/30'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from "~/types/heritage";

const currentIndex = ref(0);
const isScrolling = ref(false);

const openArticle = async (id: number) => {
  await navigateTo({
    path: "/heritage",
    query: { id: id },
  });
};

const getHeritageImage = (heritage: Heritage) => {
  return (
    "http://protocol.alessandrocalista.it:8080/images/" +
    heritage.images[0].filePath
  );
};

const getPostClass = (index: number) => {
  const diff = Math.abs(index - currentIndex.value);
  if (diff === 0) return "scale-100 opacity-100";
  if (diff === 1) return "scale-95 opacity-80";
  return "scale-90 opacity-60";
};

let scrollTimeout: number;

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const scrollTop = target.scrollTop;
  const windowHeight = window.innerHeight;

  // Calculate current index based on scroll position
  const newIndex = Math.round(scrollTop / windowHeight);

  if (newIndex !== currentIndex.value) {
    currentIndex.value = newIndex;
  }

  // Add scrolling state
  isScrolling.value = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false;
  }, 150);
};

const {
  data: heritages,
  pending,
  error,
} = await useFetch<Heritage[]>(
  "http://protocol.alessandrocalista.it:8080/api/v1/heritage/"
);
</script>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
