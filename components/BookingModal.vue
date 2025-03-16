<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>

      <!-- Modal -->
      <div
        class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10"
      >
        <h2 class="text-2xl font-semibold mb-6">Book Your Appointment</h2>

        <!-- Date Picker -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            v-model="bookingDate"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97474]"
            :min="minDate"
          />
        </div>

        <!-- Time Picker -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Time</label>
          <select
            v-model="bookingTime"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97474]"
          >
            <option value="">Select time</option>
            <option v-for="time in availableTimes" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </div>

        <!-- Service Selection -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Service</label
          >
          <select
            v-model="selectedService"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97474]"
          >
            <option value="">Select service</option>
            <option
              v-for="service in services"
              :key="service.id"
              :value="service.id"
            >
              {{ service.name }} - Rp{{ service.price.toLocaleString() }}
            </option>
          </select>
        </div>

        <!-- Payment Method -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Payment Method</label
          >
          <select
            v-model="paymentMethod"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97474]"
          >
            <option value="">Select payment method</option>
            <option value="cash">Cash</option>
            <option value="transfer">Bank Transfer</option>
            <option value="qris">QRIS</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-3">
          <button
            @click="close"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            @click="submitBooking"
            class="px-4 py-2 bg-[#F97474] text-white rounded-lg hover:bg-[#ff5757] transition-colors duration-300"
            :disabled="!isFormValid"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

// Form data
const bookingDate = ref("");
const bookingTime = ref("");
const selectedService = ref("");
const paymentMethod = ref("");

// Available times (9 AM to 7 PM)
const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

// Services list
const services = [
  { id: 1, name: "Haircut", price: 50000 },
  { id: 2, name: "Hair Coloring", price: 350000 },
  { id: 3, name: "Smoothing", price: 500000 },
  { id: 4, name: "Basic Facial", price: 150000 },
  { id: 5, name: "Premium Facial", price: 250000 },
  { id: 6, name: "Makeup", price: 200000 },
];

// Minimum date (today)
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// Form validation
const isFormValid = computed(() => {
  return (
    bookingDate.value &&
    bookingTime.value &&
    selectedService.value &&
    paymentMethod.value
  );
});

// Methods
const close = () => {
  emit("close");
  resetForm();
};

const submitBooking = () => {
  if (!isFormValid.value) return;

  const bookingData = {
    date: bookingDate.value,
    time: bookingTime.value,
    serviceId: selectedService.value,
    paymentMethod: paymentMethod.value,
  };

  emit("submit", bookingData);
  close();
};

const resetForm = () => {
  bookingDate.value = "";
  bookingTime.value = "";
  selectedService.value = "";
  paymentMethod.value = "";
};
</script>
