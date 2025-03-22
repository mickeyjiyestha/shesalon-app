<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-6">
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm"
        @click="close"
      ></div>

      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10 z-10"
      >
        <h2 class="text-3xl font-bold mb-8 text-gray-800">
          Book Your Appointment
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Booking Form - Left Side -->
          <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2"
                >Pick a Date</label
              >
              <div class="calendar-wrapper bg-white rounded-xl">
                <ClientOnly>
                  <Calendar
                    v-model="bookingDate"
                    :min-date="new Date()"
                    :attributes="attributes"
                    class="custom-calendar"
                    is-expanded
                    borderless
                  />
                </ClientOnly>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Choose Time</label
                >
                <div class="relative">
                  <select
                    v-model="bookingTime"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select available time</option>
                    <option
                      v-for="time in availableTimes"
                      :key="time"
                      :value="time"
                    >
                      {{ time }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Select Service</label
                >
                <div class="relative">
                  <select
                    v-model="selectedService"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choose a service</option>
                    <option
                      v-for="service in services"
                      :key="service.id"
                      :value="service.id"
                    >
                      {{ service.name }} - Rp{{
                        service.price.toLocaleString()
                      }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Hair Color Selection -->
              <div v-if="selectedService === 2">
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Select Hair Color</label
                >
                <div class="relative">
                  <select
                    v-model="selectedHairColor"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choose a hair color</option>
                    <option
                      v-for="color in hairColors"
                      :key="color.id"
                      :value="color.id"
                    >
                      {{ color.name }}
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2"
                  >Payment Method</label
                >
                <div class="relative">
                  <select
                    v-model="paymentMethod"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select payment option</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="qris">QRIS</option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Summary - Right Side -->
          <div class="md:col-span-1">
            <div class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Payment Summary
              </h3>

              <div v-if="selectedService" class="space-y-4">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium text-gray-800">
                      {{ getSelectedService?.name }}
                    </p>
                    <p
                      v-if="selectedHairColor && selectedService === 2"
                      class="text-sm text-gray-600"
                    >
                      Color: {{ getSelectedHairColor?.name }}
                    </p>
                  </div>
                  <p class="font-medium text-gray-800">
                    Rp{{ getSelectedService?.price.toLocaleString() }}
                  </p>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="font-semibold text-gray-800">Total</p>
                    <p class="font-semibold text-gray-800">
                      Rp{{ getSelectedService?.price.toLocaleString() }}
                    </p>
                  </div>
                </div>

                <div class="pt-4">
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Date:</span>
                    {{ bookingDate ? formatDate(bookingDate) : "---" }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Time:</span>
                    {{ bookingTime || "---" }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Payment:</span>
                    {{ formatPaymentMethod }}
                  </p>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <p class="text-gray-500">Select a service to see the summary</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-8">
          <button
            @click="close"
            class="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="submitBooking"
            class="px-6 py-3 bg-[#F97474] text-white rounded-xl font-medium hover:bg-[#ff5757] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
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
import { Calendar } from "v-calendar";
import "v-calendar/style.css";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

// Form data
const bookingDate = ref(new Date());
const bookingTime = ref("");
const selectedService = ref("");
const selectedHairColor = ref("");
const paymentMethod = ref("");

// Calendar attributes
const attributes = [
  {
    key: "selected",
    dot: true,
    dates: new Date(),
    customData: "selected",
  },
];

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

// Hair colors
const hairColors = [
  { id: 1, name: "Black" },
  { id: 2, name: "Brown" },
  { id: 3, name: "Blonde" },
  { id: 4, name: "Red" },
  { id: 5, name: "Silver" },
  { id: 6, name: "Blue" },
  { id: 7, name: "Purple" },
  { id: 8, name: "Pink" },
];

// Computed properties
const getSelectedService = computed(() => {
  return services.find((service) => service.id === selectedService.value);
});

const getSelectedHairColor = computed(() => {
  return hairColors.find((color) => color.id === selectedHairColor.value);
});

const formatPaymentMethod = computed(() => {
  if (!paymentMethod.value) return "---";
  return {
    cash: "Cash",
    transfer: "Bank Transfer",
    qris: "QRIS",
  }[paymentMethod.value];
});

// Form validation
const isFormValid = computed(() => {
  if (selectedService.value === 2) {
    return (
      bookingDate.value &&
      bookingTime.value &&
      selectedService.value &&
      selectedHairColor.value &&
      paymentMethod.value
    );
  }
  return (
    bookingDate.value &&
    bookingTime.value &&
    selectedService.value &&
    paymentMethod.value
  );
});

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
    hairColor: selectedService.value === 2 ? selectedHairColor.value : null,
    paymentMethod: paymentMethod.value,
  };

  emit("submit", bookingData);
  close();
};

const resetForm = () => {
  bookingDate.value = new Date();
  bookingTime.value = "";
  selectedService.value = "";
  selectedHairColor.value = "";
  paymentMethod.value = "";
};
</script>

<style>
.calendar-wrapper {
  position: relative;
  min-height: 400px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  overflow: visible !important;
}

.custom-calendar {
  width: 100%;
  height: 100%;
}

.vc-container {
  --vc-color-white: #ffffff;
  --vc-font-family: inherit;
  --vc-rounded-lg: 1rem;
  --vc-header-padding: 20px 16px;
  --vc-header-title-color: #1f2937;
  --vc-color-gray-900: #1f2937;
  --vc-color-gray-700: #374151;
  --vc-color-gray-600: #4b5563;
  --vc-color-gray-400: #9ca3af;
  --vc-color-gray-300: #d1d5db;
  --vc-color-gray-100: #f3f4f6;
  border: none !important;
  border-radius: 1rem;
  overflow: visible !important;
}

.vc-pane-container {
  overflow: visible !important;
}

.vc-popover-content-wrapper {
  z-index: 50 !important;
  overflow: visible !important;
}

.vc-highlight {
  background-color: #f97474 !important;
}

.vc-day:hover {
  background-color: rgba(249, 116, 116, 0.1) !important;
}

.vc-day.is-today {
  background-color: rgba(249, 116, 116, 0.1) !important;
  font-weight: bold;
}

.vc-day.is-selected {
  background-color: #f97474 !important;
  color: white !important;
  font-weight: bold;
}

.vc-header {
  padding: 20px 16px !important;
  background-color: transparent !important;
  z-index: 10 !important;
}

.vc-title {
  color: var(--vc-header-title-color) !important;
  font-weight: 600 !important;
  position: relative !important;
  z-index: 10 !important;
}

.vc-weeks {
  padding: 12px !important;
}

.vc-day {
  height: 40px !important;
  border-radius: 0.75rem !important;
  transition: all 0.2s ease;
}
</style>
