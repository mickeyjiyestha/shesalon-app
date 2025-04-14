<template>
  <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-8">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <div class="flex-1 space-y-4">
        <h2 class="text-3xl font-bold text-gray-900">
          Discover Your Perfect Hairstyle
        </h2>
        <p class="text-lg text-gray-600">
          Not sure which hairstyle suits you? Try our AI-powered face shape
          analysis and get personalized hairstyle recommendations that match
          your unique features.
        </p>
        <div class="flex gap-4">
          <button
            @click="startAnalysis"
            class="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2"
          >
            <span>Try Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            @click="learnMore"
            class="px-6 py-3 bg-white text-pink-500 rounded-xl hover:bg-gray-50 transition-colors border border-pink-200"
          >
            Learn More
          </button>
        </div>
      </div>
      <div class="w-full md:w-1/3 relative">
        <img
          src="/images/face-detection-demo.png"
          alt="Face Detection Demo"
          class="rounded-xl shadow-lg"
        />
        <div
          class="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-medium transform rotate-12"
        >
          New Feature!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const startAnalysis = () => {
  // Implement face detection analysis logic
  console.log("Starting face analysis...");
};

const learnMore = () => {
  // Navigate to learn more page
  navigateTo("/face-detection-info");
};
</script>
