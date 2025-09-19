<template>
  <div
    class="flex"
    :class="{ 'justify-end': !props.ai, 'justify-start': props.ai }"
  >
    <div
      class="max-w-sm lg:max-w-md p-4 rounded-2xl break-words shadow-lg"
      :class="{
        'bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-tl-sm':
          props.ai,
        'bg-white border border-gray-200 text-gray-800 rounded-tr-sm':
          !props.ai,
      }"
    >
      <!-- Message Header -->
      <div v-if="props.ai" class="flex items-center gap-2 mb-2">
        <Icon name="i-lucide-bot" class="w-4 h-4" />
        <span class="text-xs font-medium opacity-90">AI Assistant</span>
      </div>
      <div v-else class="flex items-center gap-2 mb-2 justify-end">
        <span class="text-xs font-medium text-gray-500">You</span>
        <Icon name="i-lucide-user" class="w-4 h-4 text-gray-500" />
      </div>

      <!-- Message Content -->
      <div
        v-if="props.ai"
        v-html="formatAiText(props.text)"
        class="prose prose-sm prose-invert max-w-none"
      />
      <p v-else>{{ props.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  ai: boolean;
}>();

const formatAiText = (text: string) => {
  // Simple formatting for AI responses
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/\n/g, "<br>") // Line breaks
    .replace(/(\d+\.)\s/g, "<br>$1 "); // Numbered lists
};
</script>
