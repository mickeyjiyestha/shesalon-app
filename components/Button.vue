<script setup>
import { defineProps } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="flex justify-center items-center rounded-xl bg-[#F97474] px-50 py-3 mt-7 text-white"
  >
    {{ buttonText }}
  </button>
</template>
