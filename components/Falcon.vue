<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="bg-[#F97474] hover:bg-[#ff5757] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
    >
      <svg
        v-if="!isChatOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
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
        class="h-6 w-6"
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
      class="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl transform transition-all duration-300"
      :class="isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Chat Header -->
      <div class="bg-[#F97474] p-4 rounded-t-lg">
        <div class="flex items-center space-x-4">
          <div
            class="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            <img
              src="~/assets/images/falconLogo.jpg"
              alt="Falcon"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-white font-semibold">Falcon Assistant</h3>
            <p class="text-white text-sm opacity-90">{{ onlineStatus }}</p>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="h-96 overflow-y-auto p-4 space-y-4" ref="messageContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'max-w-[80%] rounded-lg p-3 animate-fade-in',
            message.type === 'user'
              ? 'bg-gray-100 ml-auto'
              : 'bg-[#F97474] text-white',
          ]"
        >
          {{ message.text }}
          <div
            class="text-xs text-right text-gray-400 mt-1"
            v-if="message.time"
          >
            {{ message.time }}
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div v-if="quickReplies.length > 0" class="px-4 py-2 border-t">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(reply, index) in quickReplies"
            :key="index"
            @click="handleQuickReply(reply)"
            class="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-sm transition-colors duration-200"
          >
            {{ reply }}
          </button>
        </div>
      </div>

      <!-- Bot Typing Indicator -->
      <div v-if="isBotTyping" class="px-4 py-2 text-sm text-gray-500 italic">
        <div class="flex items-center space-x-2">
          <span>Falcon is typing</span>
          <span class="typing-dots">...</span>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <div class="relative flex-1">
            <input
              v-model="newMessage"
              type="text"
              :placeholder="inputPlaceholder"
              :disabled="isBotTyping"
              ref="messageInput"
              @keydown.enter="sendMessage"
              class="w-full border rounded-full px-4 py-2 pr-12 focus:outline-none focus:border-[#F97474]"
              :class="{ 'bg-gray-100': isBotTyping }"
            />
            <!-- Emoji Picker Trigger -->
            <button
              type="button"
              @click="toggleEmojiPicker"
              class="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              😊
            </button>
            <!-- Voice Input Button -->
            <button
              type="button"
              @click="toggleVoiceInput"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              :class="{ 'text-red-500': isRecording }"
            >
              🎤
            </button>
          </div>
          <button
            type="submit"
            :disabled="isBotTyping || !newMessage.trim()"
            class="bg-[#F97474] hover:bg-[#ff5757] text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const isChatOpen = ref(false);
const isBotTyping = ref(false);
const newMessage = ref("");
const messageInput = ref(null);
const messageContainer = ref(null);
const isRecording = ref(false);
const onlineStatus = ref("Online");

// Quick replies based on common queries
const quickReplies = ref([
  "Book Appointment",
  "Services & Prices",
  "Opening Hours",
  "Contact Info",
]);

// Get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const messages = ref([
  {
    type: "bot",
    text: `${getGreeting()}! I'm Falcon, your beauty assistant. How can I help you today?`,
  },
]);

// Computed placeholder text
const inputPlaceholder = computed(() => {
  if (isBotTyping.value) return "Please wait for Falcon to respond...";
  return "Type your message...";
});

// Toggle chat and focus input
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value) {
    // Focus input after chat opens and animation completes
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

// Voice input handling
const toggleVoiceInput = () => {
  if (!isRecording.value) {
    startVoiceRecording();
  } else {
    stopVoiceRecording();
  }
};

const startVoiceRecording = () => {
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording.value = true;
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      newMessage.value = transcript;
    };

    recognition.onend = () => {
      isRecording.value = false;
    };

    recognition.start();
  } else {
    alert("Voice input is not supported in your browser.");
  }
};

const stopVoiceRecording = () => {
  isRecording.value = false;
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const userText = newMessage.value;

  // Add user message
  messages.value.push({
    type: "user",
    text: userText,
    time: getCurrentTime(),
  });

  newMessage.value = "";
  messageInput.value?.focus();

  isBotTyping.value = true;

  const botReply = await fetchBotResponse(userText);

  isBotTyping.value = false;

  messages.value.push({
    type: "bot",
    text: botReply,
    time: getCurrentTime(),
  });
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
    setTimeout(() => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    }, 100);
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

.typing-dots {
  animation: typingDots 1.4s infinite;
}

@keyframes typingDots {
  0%,
  20% {
    content: ".";
  }
  40% {
    content: "..";
  }
  60% {
    content: "...";
  }
  80%,
  100% {
    content: "";
  }
}
</style>
