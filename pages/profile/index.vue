<template>
  <div class="min-h-screen bg-white flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <NuxtLink
        to="/"
        class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600 mb-8"
      >
        ← Back to Home
      </NuxtLink>

      <h2 class="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
      <nav class="space-y-2">
        <NuxtLink
          to="/profile"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{ 'bg-pink-50 text-pink-600': $route.path === '/profile' }"
        >
          Profile
        </NuxtLink>
        <NuxtLink
          to="/profile/change-password"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{
            'bg-pink-50 text-pink-600':
              $route.path === '/profile/change-password',
          }"
        >
          Change Password
        </NuxtLink>
        <NuxtLink
          to="/profile/my-bookings"
          class="block px-4 py-2 rounded-lg text-gray-900 hover:bg-pink-50 hover:text-pink-600"
          :class="{
            'bg-pink-50 text-pink-600': $route.path === '/profile/my-bookings',
          }"
        >
          My Bookings
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <div class="max-w-3xl mx-auto px-4 py-12">
        <h1 class="text-3xl font-medium text-gray-900 mb-8">Profile</h1>

        <div class="bg-gray-50 rounded-2xl p-8">
          <div class="flex items-center gap-8 mb-8">
            <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://via.placeholder.com/96"
                alt="Profile picture"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-xl font-medium text-gray-900">Jane Doe</h2>
              <p class="text-gray-500">Member since 2024</p>
            </div>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Full Name</label
                >
                <input
                  v-model="profile.fullName"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone Number</label
                >
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Address</label
                >
                <input
                  v-model="profile.address"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const profile = ref({
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+62 812 3456 7890",
  address: "Jl. Contoh No. 123, Jakarta",
});

const saveProfile = () => {
  // Implement save profile logic here
  console.log("Saving profile:", profile.value);
};
</script>
