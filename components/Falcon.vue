<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="bg-[#f6339a] hover:bg-[#db2777] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
    >
      <svg
        v-if="!isChatOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 md:h-6 md:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 md:h-6 md:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Chat Window -->
    <div
      v-show="isChatOpen"
      class="absolute bottom-20 right-0 w-[calc(100vw-2rem)] md:w-96 max-w-[96vw] md:max-w-none bg-white rounded-lg shadow-2xl transform transition-all duration-300"
      :class="isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Chat Header -->
      <div class="bg-[#f6339a] p-2 md:p-3 rounded-t-lg">
        <div class="flex items-center">
          <div class="flex-1">
            <h3 class="text-white text-sm md:text-base font-medium">
              Kripto Maksima Koin
            </h3>
          </div>
          <button @click="toggleChat" class="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div
        class="h-[60vh] md:h-[500px] overflow-y-auto p-2 md:p-3 space-y-2 md:space-y-3 bg-white"
        ref="messageContainer"
      >
        <div v-for="(message, index) in messages" :key="index">
          <!-- Bot Message -->
          <div
            v-if="message.type === 'bot'"
            class="flex items-start mb-2 md:mb-3"
            :class="message.isNew ? 'animate-message-in' : ''"
          >
            <div
              class="w-5 h-5 md:w-6 md:h-6 rounded bg-blue-100 flex-shrink-0 mr-2 flex items-center justify-center"
            >
              <span class="text-sm md:text-base">🤖</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] md:text-xs text-gray-500 mb-1"
                >Maksima's Bot</span
              >
              <div
                class="bg-gray-100 rounded-lg p-2 shadow-sm max-w-[85%] md:max-w-[80%] text-xs md:text-sm"
              >
                {{ message.text }}
              </div>
              <span class="text-[8px] md:text-[10px] text-gray-400 mt-1">{{
                message.time
              }}</span>
            </div>
          </div>

          <!-- User Message -->
          <div
            v-else
            class="flex items-start justify-end mb-2 md:mb-3"
            :class="message.isNew ? 'animate-message-in' : ''"
          >
            <div class="flex flex-col items-end">
              <div
                class="bg-gray-200 text-gray-800 rounded-lg p-2 shadow-sm max-w-[85%] md:max-w-[80%] text-xs md:text-sm"
              >
                {{ message.text }}
              </div>
              <span class="text-[8px] md:text-[10px] text-gray-400 mt-1">{{
                message.time
              }}</span>
            </div>
          </div>
        </div>

        <!-- Bot Typing Indicator -->
        <div
          v-if="isBotTyping"
          class="flex items-start mb-2 md:mb-3 animate-message-in"
        >
          <div
            class="w-5 h-5 md:w-6 md:h-6 rounded bg-blue-100 flex-shrink-0 mr-2 flex items-center justify-center"
          >
            <span class="text-sm md:text-base">🤖</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] md:text-xs text-gray-500 mb-1"
              >Maksima's Bot</span
            >
            <div class="bg-gray-100 rounded-lg p-2 shadow-sm">
              <div class="flex space-x-1">
                <div class="typing-dot"></div>
                <div class="typing-dot animation-delay-200"></div>
                <div class="typing-dot animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div
        v-if="quickReplies.length > 0"
        class="px-2 md:px-3 py-2 border-t bg-white"
      >
        <div class="flex flex-wrap gap-1.5 md:gap-2">
          <button
            v-for="(reply, index) in quickReplies"
            :key="index"
            @click="handleQuickReply(reply)"
            class="border border-[#f6339a] text-[#f6339a] rounded-full px-2 md:px-3 py-0.5 text-[10px] md:text-xs hover:bg-[#f6339a] hover:text-white transition-colors duration-200"
          >
            {{ reply }}
          </button>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-2 md:p-3 bg-white border-t">
        <form @submit.prevent="sendMessage" class="flex items-center">
          <div class="relative flex-1">
            <input
              v-model="newMessage"
              type="text"
              :placeholder="inputPlaceholder"
              :disabled="isBotTyping"
              ref="messageInput"
              @keydown.enter="sendMessage"
              class="w-full border border-gray-300 rounded-full px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm focus:outline-none focus:border-[#f6339a]"
              :class="{ 'bg-gray-100': isBotTyping }"
            />
            <button
              type="button"
              class="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs md:text-sm"
            >
              📎
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, nextTick } from "vue";

const isChatOpen = ref(false);
const isBotTyping = ref(false);
const newMessage = ref("");
const messageInput = ref(null);
const messageContainer = ref(null);
const isRecording = ref(false);
const onlineStatus = ref("Online");

// Quick replies based on common queries
const quickReplies = ref(["FAQ", "Tanya hal lain"]);

// Get greeting based on time of day
const getGreeting = () => {
  return "Halo ada yang bisa saya bantu?\nAnda bisa tanyakan apa saja, saya akan bantu cari jawaban 😊\n\nAtau ada hal lain yang ingin Anda ketahui?";
};

const messages = ref([
  {
    type: "bot",
    text: getGreeting(),
    time: "7:14 PM",
    isNew: false,
  },
]);

// Remove isNew flag after animation completes
const removeNewFlag = (message) => {
  setTimeout(() => {
    message.isNew = false;
  }, 1000); // Match this with your animation duration
};

// Computed placeholder text
const inputPlaceholder = computed(() => {
  return "Type a message...";
});

// Toggle chat and focus input
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value) {
    setTimeout(() => {
      messageInput.value?.focus();
    }, 300);
  }
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Handle quick replies
const handleQuickReply = (reply) => {
  newMessage.value = reply;
  sendMessage();
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userText = newMessage.value;

  // Add user message with animation flag
  const userMessage = {
    type: "user",
    text: userText,
    time: getCurrentTime(),
    isNew: true,
  };

  messages.value.push(userMessage);
  removeNewFlag(userMessage);

  newMessage.value = "";
  messageInput.value?.focus();

  // Show typing indicator before fetching response
  isBotTyping.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay for typing animation

  const botReply = await fetchBotResponse(userText);

  isBotTyping.value = false;

  // Add bot message with animation flag
  const botMessage = {
    type: "bot",
    text: botReply,
    time: getCurrentTime(),
    isNew: true,
  };

  messages.value.push(botMessage);
  removeNewFlag(botMessage);
};

const fetchBotResponse = async (message) => {
  try {
    const response = await fetch(
      "https://shesalon-chatbot-401887634547.asia-southeast2.run.app/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();
    return data.response || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Oops! Something went wrong. Please try again later.";
  }
};

// Auto scroll to bottom when new messages arrive
watch(
  messages,
  () => {
    nextTick(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    });
  },
  { deep: true }
);

// Keyboard shortcuts
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    // Alt + C to toggle chat
    if (e.altKey && e.key === "c") {
      toggleChat();
    }
  });
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-message-in {
  animation: messageIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typing-dot {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #9ca3af;
  border-radius: 9999px;
  animation: typing 1s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
