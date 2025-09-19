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
      <!-- Hero Section with Attribution -->
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

        <!-- Hero Image Attribution Button -->
        <div class="absolute top-4 right-4">
          <button
            @click="showHeroAttribution = !showHeroAttribution"
            class="bg-black/60 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center gap-1"
          >
            <Icon name="i-lucide-info" class="w-3 h-3" />
            Image Credits
          </button>
        </div>

        <!-- Hero Attribution Overlay -->
        <div
          v-if="showHeroAttribution && heritage?.images[0]"
          class="absolute top-16 right-4 bg-black/90 text-white text-xs p-4 rounded-lg max-w-sm backdrop-blur-sm"
        >
          <div class="space-y-2">
            <h4 class="font-medium mb-2">Image Attribution</h4>
            <div v-if="heritage.images[0].author">
              <span class="font-medium">Author:</span>
              {{ heritage.images[0].author }}
            </div>
            <div v-if="heritage.images[0].copyright">
              <span class="font-medium">Copyright:</span>
              {{ heritage.images[0].copyright }}
            </div>
            <div v-if="heritage.images[0].license">
              <span class="font-medium">License:</span>
              {{ heritage.images[0].license }}
            </div>
            <div v-if="heritage.images[0].source">
              <span class="font-medium">Source:</span>
              {{ heritage.images[0].source }}
            </div>
            <div v-if="heritage.images[0].link">
              <a
                :href="heritage.images[0].link"
                target="_blank"
                class="text-blue-300 hover:text-blue-200 underline"
              >
                View Original
              </a>
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

          <!-- Image Gallery with Full Attribution -->
          <div
            v-if="heritage?.images && heritage.images.length > 0"
            class="mt-8"
          >
            <h3 class="text-xl font-semibold text-emerald-900 mb-6">
              Image Gallery
            </h3>
            <div class="space-y-6">
              <div
                v-for="(image, index) in heritage.images"
                :key="index"
                class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <!-- Image -->
                <div class="relative">
                  <img
                    :src="
                      'http://protocol.alessandrocalista.it:8080/images/' +
                      image.filePath
                    "
                    :alt="`Heritage image ${index + 1}`"
                    class="w-full h-64 md:h-80 object-cover"
                  />
                </div>

                <!-- Attribution Section -->
                <div class="p-4 bg-gray-50 border-t">
                  <h4
                    class="font-semibold text-gray-800 mb-3 flex items-center gap-2"
                  >
                    <Icon name="i-lucide-camera" class="w-4 h-4" />
                    Image Attribution
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="space-y-2">
                      <div v-if="image.author">
                        <span class="font-medium text-gray-700">Author:</span>
                        <span class="text-gray-600 ml-1">{{
                          image.author
                        }}</span>
                      </div>

                      <div v-if="image.copyright">
                        <span class="font-medium text-gray-700"
                          >Copyright:</span
                        >
                        <span class="text-gray-600 ml-1">{{
                          image.copyright
                        }}</span>
                      </div>

                      <div v-if="image.license">
                        <span class="font-medium text-gray-700">License:</span>
                        <span class="text-gray-600 ml-1">{{
                          image.license
                        }}</span>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div v-if="image.source">
                        <span class="font-medium text-gray-700">Source:</span>
                        <span class="text-gray-600 ml-1">{{
                          image.source
                        }}</span>
                      </div>

                      <div v-if="image.date">
                        <span class="font-medium text-gray-700">Date:</span>
                        <span class="text-gray-600 ml-1">{{ image.date }}</span>
                      </div>

                      <div v-if="image.dateAccessed">
                        <span class="font-medium text-gray-700">Accessed:</span>
                        <span class="text-gray-600 ml-1">{{
                          image.dateAccessed
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Link to Original -->
                  <div
                    v-if="image.link"
                    class="mt-3 pt-3 border-t border-gray-200"
                  >
                    <a
                      :href="image.link"
                      target="_blank"
                      class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                      <Icon name="i-lucide-external-link" class="w-4 h-4" />
                      View Original Source
                    </a>
                  </div>
                </div>
              </div>
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

const showHeroAttribution = ref(false);

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
