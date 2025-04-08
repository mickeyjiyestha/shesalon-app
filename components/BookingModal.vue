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
                    v-model="selectedDate"
                    :min-date="new Date()"
                    :attributes="attributes"
                    class="custom-calendar"
                    is-expanded
                    borderless
                    @dayclick="onDateSelect"
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

              <!-- Service Selection -->
              <div v-if="isServicesLoaded">
                <div
                  v-for="(service, index) in selectedServices"
                  :key="index"
                  class="mb-4"
                >
                  <label class="block text-gray-700 text-sm font-medium mb-2">
                    Service {{ index + 1 }}
                  </label>
                  <div class="relative">
                    <select
                      v-model="selectedServices[index]"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97474] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Pilih Service</option>
                      <option
                        v-for="service in services"
                        :key="service.id"
                        :value="service.id"
                      >
                        {{ service.nama }}
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

                <button
                  type="button"
                  @click="addService"
                  class="mt-2 px-4 py-2 bg-[#F97474] text-white rounded-xl hover:bg-[#e65c5c] transition"
                  v-if="selectedServices.length < services.length"
                >
                  + Tambah Service
                </button>
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
                    <option
                      v-for="method in paymentMethods"
                      :key="method.id"
                      :value="method.id"
                    >
                      {{ method.nama }}
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

                <!-- Payment Type Radio Buttons - Only show for Cashless -->
                <div v-if="isCashlessSelected" class="mt-4">
                  <label class="block text-gray-700 text-sm font-medium mb-2"
                    >Payment Type</label
                  >
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentType"
                        value="dp"
                        class="form-radio text-[#F97474] focus:ring-[#F97474]"
                      />
                      <span class="ml-2">DP</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentType"
                        value="lunas"
                        class="form-radio text-[#F97474] focus:ring-[#F97474]"
                      />
                      <span class="ml-2">Lunas</span>
                    </label>
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

              <div class="mb-4">
                <p class="text-gray-600">Selected Date:</p>
                <p class="font-medium">{{ formattedSelectedDate }}</p>
              </div>

              <div class="mb-4">
                <p class="text-gray-600">Selected Time:</p>
                <p class="font-medium">{{ bookingTime || "---" }}</p>
              </div>

              <div v-if="selectedServices.length > 0" class="space-y-4">
                <div
                  v-for="serviceId in selectedServices"
                  :key="serviceId"
                  class="flex justify-between items-start"
                  v-if="serviceId && getServiceById(serviceId)"
                >
                  <div>
                    <p class="font-medium text-gray-800">
                      {{ getServiceById(serviceId)?.nama }}
                    </p>
                  </div>
                  <p class="font-medium text-gray-800">
                    Rp{{
                      Number(getServiceById(serviceId)?.harga).toLocaleString()
                    }}
                  </p>
                </div>

                <div class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="font-semibold text-gray-800">Total</p>
                    <p class="font-semibold text-gray-800">
                      Rp{{ totalPrice.toLocaleString() }}
                    </p>
                  </div>
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
  <div
    v-if="showMidtransModal"
    class="fixed inset-0 z-[60] flex items-center justify-center"
  >
    <div class="fixed inset-0 bg-black/60" @click="closeMidtransModal"></div>
    <div class="relative z-[70] w-full max-w-md">
      <iframe
        :src="midtransUrl"
        class="w-full h-[600px] rounded-lg"
        frameborder="0"
        allow="accelerometer; autoplay; camera; encrypted-media; geolocation; gyroscope; payment"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
import Cookies from "js-cookie";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

// Form data
const selectedDate = ref(new Date());
const bookingTime = ref("");
const selectedServices = ref([""]);
const isServicesLoaded = ref(false);
const paymentMethod = ref("");
const paymentType = ref("");
const services = ref([]);
const paymentMethods = ref([]);
const showMidtransModal = ref(false);
const midtransUrl = ref("");

// Computed property to check if Cashless is selected
const isCashlessSelected = computed(() => {
  const selectedMethod = paymentMethods.value.find(
    (method) => method.id === paymentMethod.value
  );
  return selectedMethod?.nama === "Cashless";
});

// Watch payment method changes
watch(paymentMethod, (newValue) => {
  // Reset payment type when payment method changes
  paymentType.value = "";
});

// Computed property untuk format tanggal
const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return "---";
  return new Date(selectedDate.value).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const addService = () => {
  selectedServices.value.push("");
};

const getServiceById = (id) => services.value.find((s) => s.id === id);

const totalPrice = computed(() => {
  return selectedServices.value.reduce((sum, id) => {
    const service = getServiceById(id);
    return sum + (service ? Number(service.harga) : 0);
  }, 0);
});

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

onMounted(async () => {
  try {
    // Fetch services
    const servicesResponse = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/layanan",
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const servicesResult = await servicesResponse.json();
    services.value = servicesResult;
    isServicesLoaded.value = true;

    // Fetch payment methods
    const paymentMethodsResponse = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/transaksikategori",
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const paymentMethodsResult = await paymentMethodsResponse.json();
    paymentMethods.value = paymentMethodsResult.kategori_transaksi;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
});

// Form validation
const isFormValid = computed(() => {
  return (
    selectedDate.value &&
    bookingTime.value &&
    selectedServices.value.every((service) => service !== "") &&
    paymentMethod.value &&
    (!isCashlessSelected.value || paymentType.value) // Only require payment type for Cashless
  );
});

const onDateSelect = (date) => {
  selectedDate.value = date.date;
};

const close = () => {
  emit("close");
  resetForm();
};

// Format tanggal untuk API (YYYY-MM-DD)
const formatDateForAPI = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Format waktu untuk API (HH:mm:ss)
const formatTimeForAPI = (time) => {
  return `${time}:00`;
};

// Function to create Midtrans transaction
const createMidtransTransaction = async (bookingId) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/transaksi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          kategori_transaksi_id: 2,
          is_dp: paymentType.value === "dp",
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to create transaction");
    }

    return result;
  } catch (error) {
    console.error("Error creating Midtrans transaction:", error);
    throw error;
  }
};

const closeMidtransModal = () => {
  showMidtransModal.value = false;
  midtransUrl.value = "";
  close(); // Close the booking modal as well
};

const submitBooking = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    if (
      !selectedDate.value ||
      !bookingTime.value ||
      selectedServices.value.includes("") ||
      (isCashlessSelected.value && !paymentType.value)
    ) {
      alert("Lengkapi semua data booking.");
      return;
    }

    const bookingPayload = {
      tanggal: formatDateForAPI(selectedDate.value),
      jam_mulai: formatTimeForAPI(bookingTime.value),
      layanan_id: selectedServices.value.filter((id) => id !== ""),
      payment_method: paymentMethod.value,
      payment_type: isCashlessSelected.value ? paymentType.value : null,
      total_harga: totalPrice.value,
    };

    console.log("Sending booking data:", bookingPayload);

    const response = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(bookingPayload),
      }
    );

    const result = await response.json();
    console.log("Booking Response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Gagal melakukan booking.");
    }

    if (isCashlessSelected.value) {
      try {
        const transactionResult = await createMidtransTransaction(
          result.booking_id
        );
        console.log("Transaction created:", transactionResult);

        // Instead of redirecting, show the Midtrans modal
        midtransUrl.value = transactionResult.snap_url;
        showMidtransModal.value = true;
      } catch (error) {
        console.error("Error creating transaction:", error);
        alert("Gagal membuat transaksi pembayaran. Silakan coba lagi.");
      }
    } else {
      alert(`✅ ${result.message} (#${result.booking_number})`);
      close();
    }
  } catch (error) {
    console.error("Error saat booking:", error);
    alert(error.message || "Terjadi kesalahan saat booking.");
  }
};

const resetForm = () => {
  selectedDate.value = new Date();
  bookingTime.value = "";
  selectedServices.value = [""];
  paymentMethod.value = "";
  paymentType.value = "";
};
</script>

<style>
.calendar-wrapper {
  position: relative;
  min-height: 400px;
  padding: 1rem;
  margin-left: -30px;
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
