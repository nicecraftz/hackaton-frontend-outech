<template>
  <div
    class="h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col"
  >
    <!-- Header -->
    <div
      class="bg-white/80 backdrop-blur-sm border-b border-emerald-200/50 p-4"
    >
      <div class="max-w-4xl mx-auto flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center"
        >
          <Icon name="i-lucide-sparkles" class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="font-semibold text-emerald-900">AI Heritage Assistant</h1>
          <p class="text-sm text-emerald-600">
            {{ heritage.heritage || "Ready to help" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="max-w-4xl mx-auto space-y-4">
        <!-- Welcome Message -->
        <div class="flex justify-start">
          <div
            class="max-w-sm bg-gradient-to-br from-emerald-600 to-green-700 text-white p-4 rounded-2xl rounded-tl-sm shadow-lg"
          >
            <div class="flex items-center gap-2 mb-2">
              <Icon name="i-lucide-bot" class="w-4 h-4" />
              <span class="text-xs font-medium opacity-90">AI Assistant</span>
            </div>
            <p>
              Hello! I'm your AI heritage assistant. I can help you learn more
              about {{ heritage.heritage || "UNESCO World Heritage sites" }}.
              What would you like to know?
            </p>
          </div>
        </div>

        <!-- Chat Messages -->
        <Message
          v-for="(msg, index) in messageHistory.messages"
          :key="index"
          :ai="msg.ai"
          :text="msg.text"
        />

        <!-- Loading Message -->
        <div v-if="pending" class="flex justify-start">
          <div
            class="max-w-sm bg-gradient-to-br from-emerald-600 to-green-700 text-white p-4 rounded-2xl rounded-tl-sm shadow-lg"
          >
            <div class="flex items-center gap-2 mb-2">
              <Icon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
              <span class="text-xs font-medium opacity-90">AI Assistant</span>
            </div>
            <p class="italic">{{ getRandomLoadingMessage() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div
      class="bg-white/80 backdrop-blur-sm border-t border-emerald-200/50 p-4"
    >
      <div class="max-w-4xl mx-auto">
        <p class="text-xs text-emerald-600 text-center mb-3">
          AI responses should be fact-checked. Ask me anything about heritage
          sites!
        </p>

        <div class="flex gap-3">
          <UInput
            v-model="message"
            placeholder="Ask about history, architecture, significance..."
            color="neutral"
            size="lg"
            class="flex-1"
            @keydown.enter="sendMessage"
          />
          <UButton
            color="primary"
            size="lg"
            icon="i-lucide-send"
            :disabled="pending || message.trim() === ''"
            :loading="pending"
            @click="sendMessage"
          >
            Send
          </UButton>
        </div>

        <!-- Quick Questions -->
        <div class="mt-3 flex flex-wrap gap-2 justify-center">
          <button
            v-for="question in quickQuestions"
            :key="question"
            @click="askQuickQuestion(question)"
            :disabled="pending"
            class="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs rounded-full transition-colors duration-200 disabled:opacity-50"
          >
            {{ question }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { History, Message, Response } from "~/types/chat";

definePageMeta({
  title: "AI Heritage Assistant",
});

const loadingMessages = [
  "Analyzing heritage information...",
  "Consulting historical databases...",
  "Gathering cultural insights...",
  "Processing your question...",
];

const quickQuestions = ref([
  "Tell me about its history",
  "What makes it special?",
  "When was it built?",
  "Why is it important?",
]);

const getRandomLoadingMessage = () => {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  return loadingMessages[randomIndex];
};

const route = useRoute();
const heritage = computed(() => ({
  heritage: route.query.heritage as string,
}));

const pending = ref(false);
const message = ref("");
const messageHistory = ref<History>({
  messages: [],
});

const pushMessage = (msg: Message) => {
  messageHistory.value.messages.push(msg);
};

const askAi = async (msg: Message) => {
  pending.value = true;

  try {
    const response = await $fetch<Response>(
      "http://protocol.alessandrocalista.it:8080/api/v1/chatbot/ask",
      {
        method: "POST",
        body: {
          heritageName: heritage.value.heritage,
          content: msg.text,
        },
      }
    );

    if (response) {
      const aiMessage: Message = {
        ai: true,
        text: response.text,
      };
      pushMessage(aiMessage);
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage: Message = {
      ai: true,
      text: "I'm having trouble connecting right now. Please try asking your question again in a moment.",
    };
    pushMessage(errorMessage);
  } finally {
    pending.value = false;
  }
};

const sendMessage = async () => {
  if (!message.value.trim() || pending.value) return;

  const userMessage: Message = { ai: false, text: message.value };
  pushMessage(userMessage);
  message.value = "";
  await askAi(userMessage);
};

const askQuickQuestion = async (question: string) => {
  if (pending.value) return;

  message.value = question;
  await sendMessage();
};
</script>
