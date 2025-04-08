<template>
  <main class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-2xl mx-auto px-6">
      <!-- Header -->
      <header class="mb-16">
        <h1 class="text-3xl font-semibold text-gray-900">Account Settings</h1>
        <nav class="mt-6">
          <ul class="flex space-x-12 border-b border-gray-200">
            <li>
              <a
                href="#profile"
                class="pb-4 text-[#F97474] border-b-2 border-[#F97474] font-medium"
                >Profile</a
              >
            </li>
            <li>
              <a href="#security" class="pb-4 text-gray-500 hover:text-gray-900"
                >Security</a
              >
            </li>
            <li>
              <a href="#bookings" class="pb-4 text-gray-500 hover:text-gray-900"
                >Bookings</a
              >
            </li>
          </ul>
        </nav>
      </header>

      <!-- Profile Section -->
      <section id="profile" class="space-y-12">
        <!-- Profile Picture -->
        <div class="flex items-center space-x-6">
          <img
            :src="user.profilePicture || '/images/user-avatar.png'"
            alt="Profile picture"
            class="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 class="text-xl font-medium text-gray-900">
              {{ user.firstName }} {{ user.lastName }}
            </h2>
            <p class="text-gray-500">{{ user.email }}</p>
            <button
              @click="changePicture"
              class="mt-2 text-sm text-[#F97474] hover:text-[#f85c5c]"
            >
              Change photo
            </button>
          </div>
        </div>

        <!-- Profile Form -->
        <form class="space-y-8" @submit.prevent="saveChanges">
          <div class="grid gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >First Name</label
              >
              <input
                v-model="user.firstName"
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Last Name</label
              >
              <input
                v-model="user.lastName"
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Location</label
              >
              <input
                v-model="user.location"
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Profession</label
              >
              <input
                v-model="user.profession"
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Bio</label
              >
              <textarea
                v-model="user.bio"
                rows="4"
                class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            class="w-full sm:w-auto px-8 py-3 bg-[#F97474] text-white rounded-lg hover:bg-[#f85c5c] transition-colors"
          >
            Save Changes
          </button>
        </form>
      </section>

      <!-- Password Section -->
      <section id="security" class="hidden mt-12 space-y-8">
        <h2 class="text-xl font-medium text-gray-900">Change Password</h2>
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Current Password</label
            >
            <input
              type="password"
              class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >New Password</label
            >
            <input
              type="password"
              class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Confirm Password</label
            >
            <input
              type="password"
              class="w-full px-4 py-2 rounded-lg bg-white border border-gray-200"
            />
          </div>
          <button
            class="w-full sm:w-auto px-8 py-3 bg-[#F97474] text-white rounded-lg hover:bg-[#f85c5c] transition-colors"
          >
            Update Password
          </button>
        </form>
      </section>

      <!-- Bookings Section -->
      <section id="bookings" class="hidden mt-12">
        <h2 class="text-xl font-medium text-gray-900 mb-6">Your Bookings</h2>
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <p class="text-gray-500">No upcoming bookings at the moment.</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "Ildiko",
        lastName: "Gaspar",
        email: "email@private.com",
        location: "London, UK",
        profession: "UI/UX Designer",
        bio: "Open-Source designer @ UI Design Daily",
        profilePicture: "",
      },
    };
  },
  methods: {
    changePicture() {
      console.log("Change picture");
    },
    deletePicture() {
      console.log("Delete picture");
    },
    saveChanges() {
      console.log("Saving changes", this.user);
    },
  },
};
</script>

<style>
.hidden {
  display: none;
}
</style>
