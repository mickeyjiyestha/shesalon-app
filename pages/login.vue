<script setup>
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const navigateToHome = () => {
  router.push("/");
};
</script>

<template>
  <AuthLayout>
    <template #form>
      <p class="text-5xl font-semibold text-[#F97474] mb-20">Login</p>
      <input-box
        label="Email or Username"
        :inputValue="email"
        :type="'email'"
        :placeholder="'Enter your email'"
      ></input-box>
      <input-box
        label="Password"
        :inputValue="password"
        :type="'password'"
        :placeholder="'Enter your email'"
      ></input-box>
      <Button class="cursor-pointer" buttonText="Login" @click="navigateToHome">
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
