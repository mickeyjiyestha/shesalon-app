<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// State untuk input
const fullname = ref("");
const username = ref("");
const email = ref("");
const phone_number = ref("");
const address = ref("");
const password = ref("");
const confirmPassword = ref("");

// State untuk feedback
const errorMessage = ref("");
const successMessage = ref("");

const registerUser = async () => {
  // Validasi sederhana
  if (
    !fullname.value ||
    !username.value ||
    !email.value ||
    !phone_number.value ||
    !address.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = "Semua field harus diisi!";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password dan konfirmasi password tidak cocok!";
    return;
  }

  try {
    const response = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullname.value,
          email: email.value,
          phone_number: phone_number.value,
          username: username.value,
          password: password.value,
          confirmation_password: confirmPassword.value, // Tambahkan ini
          address: address.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal");
    }

    successMessage.value = "Registrasi berhasil! Silakan login.";
    errorMessage.value = "";

    // Redirect ke login setelah 2 detik
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <AuthLayout>
    <template #form>
      <div class="w-full px-4 md:px-0 max-w-xl mx-auto">
        <p
          class="text-4xl md:text-5xl font-semibold text-[#F97474] mb-8 md:mb-20"
        >
          Register
        </p>

        <!-- Feedback messages -->
        <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 mb-4">
          {{ successMessage }}
        </p>

        <input-box
          label="Full Name"
          v-model="fullname"
          type="text"
          placeholder="Enter your full name"
          class="w-full md:w-[50%]"
        ></input-box>

        <div
          class="flex flex-col md:flex-row w-full md:w-[50%] gap-y-4 md:gap-y-0 md:gap-x-4"
        >
          <input-box
            label="Username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full md:w-1/2"
          ></input-box>
          <input-box
            label="Email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full md:w-1/2"
          ></input-box>
        </div>

        <input-box
          label="Phone Number"
          v-model="phone_number"
          type="text"
          placeholder="Enter your phone number"
          class="w-full md:w-[50%]"
        ></input-box>
        <input-box
          label="Address"
          v-model="address"
          type="text"
          placeholder="Enter your address"
          class="w-full md:w-[50%]"
        ></input-box>

        <input-box
          label="Password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full md:w-[50%]"
        ></input-box>
        <input-box
          label="Confirm Password"
          v-model="confirmPassword"
          type="password"
          placeholder="Enter your password confirmation"
          class="w-full md:w-[50%]"
        ></input-box>

        <button
          @click="registerUser"
          class="w-full md:w-[50%] bg-[#F97474] text-white py-2 rounded-lg mt-5 hover:bg-red-600 transition"
        >
          Register
        </button>

        <p class="mt-5 text-sm md:text-base text-center">
          Already have an account?
          <NuxtLink to="/login">
            <span class="text-[#F97474]">Login</span>
          </NuxtLink>
        </p>
      </div>
    </template>

    <template #background-content>
      <img
        class="w-24 md:w-40 absolute top-5 left-5"
        src="~/assets/images/shesalon-logo.png"
        alt="She Salon Logo"
      />
      <div class="px-4 md:px-0">
        <p class="text-center text-4xl md:text-6xl font-bold text-white">
          Hello, Welcome
        </p>
        <p class="text-lg md:text-xl text-white text-center mt-3 md:mt-5">
          Enter your Personal information to <br />
          create your account
        </p>
      </div>
    </template>
  </AuthLayout>
</template>
