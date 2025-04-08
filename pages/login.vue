<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import js-cookie

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    console.log("Login Data:", {
      username: username.value,
      password: password.value,
    });

    const response = await fetch(
      "https://42e4-182-253-51-55.ngrok-free.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }
    );

    const result = await response.json();
    console.log("Response API:", result);

    if (!response.ok) {
      throw new Error(result.message || "Login failed!");
    }
    Cookies.set("token", result.token, { expires: 1 });
    alert("Login successful!");
    router.push("/");
  } catch (error) {
    console.error("Error login:", error);
    alert(error.message || "An error occurred while login");
  }
};
</script>

<template>
  <AuthLayout>
    <template #form>
      <p class="text-5xl font-semibold text-[#F97474] mb-20">Login</p>
      <input-box
        label="Username"
        v-model="username"
        :type="'text'"
        :placeholder="'Enter your username'"
      ></input-box>

      <input-box
        label="Password"
        v-model="password"
        :type="'password'"
        :placeholder="'Enter your password'"
      ></input-box>

      <Button class="cursor-pointer" buttonText="Login" @click="login">
      </Button>
      <p class="mt-5">
        Don't have an account?
        <NuxtLink to="/register">
          <span class="text-[#F97474]">Sign Up</span>
        </NuxtLink>
      </p>
    </template>

    <template #background-content>
      <img
        class="w-40 absolute top-5 left-5"
        src="~/assets/images/shesalon-logo.png"
        alt="She Salon Logo"
      />
      <p class="text-center text-6xl font-bold text-white">Welcome Back!</p>
      <p class="text-xl text-white -ml-40 mt-5">
        Enter your credentials to access <br />
        your account
      </p>
    </template>
  </AuthLayout>
</template>
