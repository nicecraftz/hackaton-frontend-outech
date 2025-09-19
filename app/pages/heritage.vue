<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center text-emerald-600">
        <Icon
          name="i-lucide-loader-2"
          class="w-8 h-8 animate-spin mx-auto mb-2"
        />
        <p>Loading heritage details...</p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center text-red-600">
        <Icon name="i-lucide-alert-circle" class="w-8 h-8 mx-auto mb-2" />
        <p>Error: {{ error }}</p>
      </div>
    </div>

    <div v-else class="pb-20">
      <!-- Hero Section -->
      <div class="relative h-96 overflow-hidden">
        <img
          :src="
            heritage
              ? 'http://protocol.alessandrocalista.it:8080/images/' +
                heritage.images[0].filePath
              : ''
          "
          alt="Heritage Image"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        ></div>

        <!-- Title Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6">
          <div class="max-w-4xl mx-auto">
            <h1
              class="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
            >
              {{ heritage?.name }}
            </h1>
            <div class="flex items-center gap-2 text-white/90">
              <Icon name="i-lucide-calendar" class="w-4 h-4" />
              <span class="text-sm"
                >Inscribed: {{ heritage?.inscribedDate }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-4xl mx-auto px-6 py-8">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200/50 p-8"
        >
          <!-- Quick Facts -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div
              class="text-center p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border border-emerald-200/50"
            >
              <Icon
                name="i-lucide-map-pin"
                class="w-6 h-6 mx-auto text-emerald-600 mb-2"
              />
              <p class="text-sm font-medium text-emerald-800">UNESCO Site</p>
              <p class="text-xs text-emerald-600">World Heritage</p>
            </div>

            <div
              class="text-center p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border border-blue-200/50"
            >
              <Icon
                name="i-lucide-clock"
                class="w-6 h-6 mx-auto text-blue-600 mb-2"
              />
              <p class="text-sm font-medium text-blue-800">Inscribed</p>
              <p class="text-xs text-blue-600">{{ heritage?.inscribedDate }}</p>
            </div>

            <div
              class="text-center p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl border border-purple-200/50"
            >
              <Icon
                name="i-lucide-star"
                class="w-6 h-6 mx-auto text-purple-600 mb-2"
              />
              <p class="text-sm font-medium text-purple-800">Heritage</p>
              <p class="text-xs text-purple-600">Cultural Site</p>
            </div>
          </div>

          <!-- Description -->
          <div class="prose prose-lg max-w-none">
            <h2 class="text-2xl font-bold text-emerald-900 mb-4">
              About This Heritage Site
            </h2>
            <div
              class="text-gray-700 leading-relaxed"
              v-html="heritage?.description"
            ></div>
          </div>

          <!-- Image Gallery Preview -->
          <div
            v-if="heritage?.images && heritage.images.length > 1"
            class="mt-8"
          >
            <h3 class="text-xl font-semibold text-emerald-900 mb-4">Gallery</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img
                v-for="(image, index) in heritage.images.slice(0, 6)"
                :key="index"
                :src="
                  'http://protocol.alessandrocalista.it:8080/images/' +
                  image.filePath
                "
                :alt="`Heritage image ${index + 1}`"
                class="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Floating AI Button -->
      <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <UButton
          color="primary"
          size="lg"
          icon="i-lucide-sparkles"
          class="shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          @click="openAiPage"
        >
          Ask AI Assistant
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from "~/types/heritage";

const route = useRoute();
const heritageId = route.query.id as string;

const {
  data: heritage,
  pending,
  error,
} = await useFetch<Heritage>(
  `http://protocol.alessandrocalista.it:8080/api/v1/heritage/${heritageId}`
);

const openAiPage = async () => {
  if (heritage.value) {
    await navigateTo({
      path: "/ai",
      query: { heritage: heritage.value.name },
    });
  }
};
</script>
