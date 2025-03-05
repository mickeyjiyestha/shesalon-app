<script setup></script>

<template>
  <div class="flex">
    <div
      class="w-2/5 h-screen bg-[url('~/assets/images/loginregister-bg.png')] bg-cover rounded-r-[270px] relative flex flex-col justify-center items-center"
    >
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
    </div>

    <div class="w-3/5 flex flex-col justify-center items-center space-y-4">
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
    </div>
  </div>
</template>
