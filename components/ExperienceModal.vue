<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" @click="closeModal"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl"
            >
              <DialogTitle class="text-xl font-semibold text-[#F97474] mb-4">
                Write Your Experience
              </DialogTitle>

              <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700"
                    >Name</label
                  >
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-[#F97474] focus:border-[#F97474]"
                  />
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700"
                    >Your Experience</label
                  >
                  <textarea
                    v-model="formData.description"
                    rows="4"
                    required
                    class="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-[#F97474] focus:border-[#F97474]"
                  ></textarea>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700"
                    >Upload Image</label
                  >

                  <div
                    class="relative mt-2 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#F97474] hover:bg-gray-100"
                  >
                    <input
                      type="file"
                      @change="handleImageChange"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      v-if="!imagePreview"
                      class="flex flex-col items-center"
                    >
                      <svg
                        class="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16l-4-4m0 0l4-4m-4 4h16"
                        ></path>
                      </svg>
                      <span class="text-sm text-gray-500"
                        >Click to upload image</span
                      >
                    </div>
                    <img
                      v-if="imagePreview"
                      :src="imagePreview"
                      alt="Preview"
                      class="mt-2 w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <button
                    v-if="imagePreview"
                    @click="removeImage"
                    class="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                  >
                    Remove Image
                  </button>
                </div>

                <div class="flex justify-end mt-4">
                  <button
                    type="button"
                    @click="closeModal"
                    class="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 bg-[#F97474] text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const formData = ref({
  name: "",
  description: "",
  image: null,
});

const imagePreview = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  formData.value.image = null;
  imagePreview.value = null;
};

const handleSubmit = () => {
  emit("submit", formData.value);
  resetForm();
  closeModal();
};

const closeModal = () => {
  emit("close");
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: "",
    description: "",
    image: null,
  };
  imagePreview.value = null;
};
</script>
