<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    ptype: String,
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

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-md">
    <label class="block text-2xl font-medium text-black mt-5">{{
      label
    }}</label>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      class="block w-full border border-gray-300 rounded-xl py-3 mt-3 text-sm px-3"
    />
  </div>
</template>
