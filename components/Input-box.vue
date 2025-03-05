<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  inputValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="w-md">
    <label class="block text-2xl font-medium text-black">{{ label }}</label>
    <input
      :value="inputValue"
      :type="type"
      :placeholder="placeholder"
      class="block w-full border border-gray-300 rounded-xl p-2 mt-3 text-sm px-3"
    />
  </div>
</template>
