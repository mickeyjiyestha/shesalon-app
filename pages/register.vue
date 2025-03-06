<script setup>
const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
</script>

<template>
  <AuthLayout>
    <template #form>
      <p class="text-5xl font-semibold text-[#F97474] mb-20">Register</p>
      <input-box
        label="Full name"
        :inputValue="name"
        :type="'text'"
        :placeholder="'Enter your full name'"
        style="width: 50%"
      ></input-box>

      <div class="flex w-[50%] gap-x-4">
        <input-box
          label="Username"
          :inputValue="username"
          :type="'text'"
          :placeholder="'Enter your username'"
          class="w-1/2"
        ></input-box>
        <input-box
          label="Email"
          :inputValue="email"
          :type="'email'"
          :placeholder="'Enter your email'"
          class="w-1/2"
        ></input-box>
      </div>

      <input-box
        label="Password"
        :inputValue="password"
        :type="'password'"
        :placeholder="'Enter your password'"
        style="width: 50%"
      ></input-box>

      <input-box
        label="Confirm Password"
        :inputValue="password"
        :type="'password'"
        :placeholder="'Enter your password confirmation'"
        style="width: 50%"
      ></input-box>

      <Button buttonText="Register" style="width: 50%"> </Button>

      <p class="mt-5">
        Already have an account?
        <NuxtLink to="/login">
          <span class="text-[#F97474]">Login</span>
        </NuxtLink>
      </p>
    </template>

    <template #background-content>
      <img
        class="w-40 absolute top-5 left-145"
        src="~/assets/images/shesalon-logo.png"
        alt="She Salon Logo"
      />
      <p class="text-center text-6xl font-bold text-white">Hello, Welcome</p>
      <p class="text-xl text-white mt-5 -ml-33">
        Enter your Personal information to <br />
        create your account
      </p>
    </template>
  </AuthLayout>
</template>
