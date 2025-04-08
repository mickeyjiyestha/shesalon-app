<template>
  <div class="relative">
    <button
      @click="toggleProfileMenu"
      class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400"
    >
      <img
        src="~/assets/images/user-avatar.png"
        alt="User Avatar"
        class="w-full h-full object-cover rounded-full"
      />
    </button>

    <div
      v-if="isMenuOpen"
      class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
    >
      <div class="p-4 text-gray-700">
        <p class="font-semibold">{{ user?.username }}</p>
        <p class="text-sm text-gray-500">{{ user?.email }}</p>
      </div>
      <div class="border-t border-gray-300">
        <button
          @click="goToUserProfile"
          class="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100"
        >
          View Profile
        </button>
        <button
          @click="logOut"
          class="w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleProfileMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goToUserProfile() {
      this.$router.push("/profile");
    },
    logOut() {
      // Add your logout logic here
      console.log("User logged out");
    },
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f1f1f1;
}
</style>
