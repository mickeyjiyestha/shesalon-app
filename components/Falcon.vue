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
            <p class="text-white text-sm opacity-90">Online</p>
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
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#F97474]"
          />
          <button
            type="submit"
            class="bg-[#F97474] hover:bg-[#ff5757] text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
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
import { ref, watch } from "vue";

const isChatOpen = ref(false);
const newMessage = ref("");
const messages = ref([
  {
    type: "bot",
    text: "Hi! I'm Falcon, your beauty assistant. How can I help you today?",
  },
]);
const messageContainer = ref(null);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  // Add user message
  messages.value.push({
    type: "user",
    text: newMessage.value,
  });

  // Simulate bot response
  setTimeout(() => {
    messages.value.push({
      type: "bot",
      text: getBotResponse(newMessage.value),
    });
  }, 1000);

  newMessage.value = "";
};

const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("book") || lowerMessage.includes("appointment")) {
    return "I can help you book an appointment! Please visit our booking page or call us at (123) 456-7890.";
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return "Our prices vary depending on the service. Would you like to see our full price list?";
  }
  if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
    return "We are located at Jl. Pratama No.95B, Benoa, Kec. Kuta Sel., Kabupaten Badung, Bali.";
  }
  return "Thank you for your message! How else can I assist you with our salon services?";
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
</style>
