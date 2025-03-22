<template>
  <section class="bg-gray-100 py-16 px-6 md:px-12">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <!-- Info Section -->
      <div class="fade-in">
        <h2 class="text-5xl font-extrabold text-[#F97474] mb-6">
          Get in Touch
        </h2>
        <p class="text-gray-700 text-lg leading-relaxed mb-6">
          We’d love to hear from you! Whether you have a question or just want
          to say hi, feel free to contact us.
        </p>
        <div class="space-y-5">
          <div class="flex items-center space-x-4">
            <i class="fas fa-map-marker-alt text-[#F97474] text-2xl"></i>
            <span class="text-gray-700 text-lg">Jl. Pratama No.95B, Bali</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-phone-alt text-[#F97474] text-2xl"></i>
            <span class="text-gray-700 text-lg">+62 812-3456-7890</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-envelope text-[#F97474] text-2xl"></i>
            <span class="text-gray-700 text-lg">contact@shesalon.com</span>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white p-10 shadow-lg rounded-xl fade-in delay-200">
        <h3 class="text-3xl font-semibold text-gray-800 mb-6">
          Send Us a Message
        </h3>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-gray-800 text-lg font-medium mb-2"
              >Your Name</label
            >
            <input
              type="text"
              v-model="name"
              class="input-field"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label class="block text-gray-800 text-lg font-medium mb-2"
              >Email</label
            >
            <input
              type="email"
              v-model="email"
              class="input-field"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div>
            <label class="block text-gray-800 text-lg font-medium mb-2"
              >Message</label
            >
            <textarea
              v-model="message"
              class="input-field h-32"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-[#F97474] text-white text-lg font-semibold py-3 rounded-lg hover:bg-[#e06464] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const handleSubmit = () => {
  alert("Message sent successfully!");
  name.value = "";
  email.value = "";
  message.value = "";
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}
.input-field:focus {
  border-color: #f97474;
  box-shadow: 0 0 5px rgba(249, 116, 116, 0.3);
}
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards ease-in-out;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
