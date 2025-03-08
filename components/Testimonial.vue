<template>
  <div class="container mx-auto px-50 mb-30">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
      <div class="relative">
        <p class="text-[#696984] tracking-widest uppercase text-sm mb-2">
          Testimonial
        </p>
        <h2 class="text-[40px] font-medium text-[#F97474] mb-4">
          What They Say?
        </h2>
        <p class="text-[#696984] font-normal mb-3 max-w-110 text-xl">
          She Salon has received countless positive reviews from our valued
          clients.
        </p>
        <p class="text-[#696984] font-normal mb-3 max-w-100 text-xl">
          Many have experienced exceptional service, professional care, and
          stunning results.
        </p>
        <p class="text-[#696984] font-normal mb-6 max-w-80 text-xl">
          Have you visited us? Share your experience with us today!
        </p>
        <button
          class="border border-pink-400 text-[#F97474] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-pink-50"
        >
          Write your experience
          <span
            class="bg-[#F97474] text-white w-7 h-7 flex items-center justify-center rounded-full"
            >→</span
          >
        </button>
      </div>

      <!-- Wrapper untuk gambar dan testimoni -->
      <div class="relative flex justify-center pb-10">
        <div class="relative">
          <!-- Gambar -->
          <img
            :src="testimonials[currentIndex].image"
            :alt="testimonials[currentIndex].name"
            class="w-[400px] h-[500px] object-cover rounded-2xl shadow-lg bg-blue-300"
          />

          <!-- Testimoni di bawah gambar -->
          <div
            class="absolute ml-20 -bottom-15 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-xl p-5 w-[350px] z-10"
          >
            <p class="text-gray-700 text-sm italic">
              "{{ testimonials[currentIndex].text }}"
            </p>
            <p class="text-gray-900 font-bold mt-2">
              {{ testimonials[currentIndex].name }}
            </p>
            <div class="flex text-[#F97474] mt-1">
              <span
                v-for="star in testimonials[currentIndex].rating"
                :key="star"
                >★</span
              >
            </div>
          </div>

          <!-- Arrow kanan untuk navigasi -->
          <button
            @click="nextTestimonial"
            class="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-[#F97474] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#e56363]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import testimoniImage from "@/assets/images/testimoni.jpg";
import testimoniImage2 from "@/assets/images/testimoni2.jpg";
import testimoniImage3 from "@/assets/images/testimoni3.jpg";

const testimonials = ref([
  {
    image: testimoniImage,
    text: "I'm truly grateful for the amazing service. It's just what I needed, and the results exceeded my expectations. The experience was effortless and enjoyable.",
    name: "Caca",
    rating: 5,
  },
  {
    image: testimoniImage2,
    text: "This salon provides the best service I've ever had. The staff are professional and very friendly. Highly recommended!",
    name: "Lisa",
    rating: 4,
  },
  {
    image: testimoniImage3,
    text: "The atmosphere is so relaxing, and the results are always perfect. Will definitely come back!",
    name: "Rina",
    rating: 5,
  },
]);

const currentIndex = ref(0);

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};
</script>
