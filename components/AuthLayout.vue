<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const isRegisterPage = ref(false);
const route = useRoute();

onMounted(() => {
  isRegisterPage.value = route.path === "/register";
});

watch(
  () => route.path,
  (newPath) => {
    isRegisterPage.value = newPath === "/register";
  }
);

const getBackgroundClass = () => {
  return [
    "w-2/5 h-screen bg-[url('~/assets/images/loginregister-bg.png')] bg-cover relative flex flex-col justify-center items-center transition-all duration-700 ease-in-out",
    isRegisterPage.value
      ? "order-2 rounded-l-[270px]"
      : "order-1 rounded-r-[270px]",
  ];
};

const getContentClass = () => {
  return [
    "w-3/5 flex flex-col justify-center items-center space-y-4 transition-all duration-700 ease-in-out",
    isRegisterPage.value ? "order-1" : "order-2",
  ];
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div :class="getContentClass()">
      <slot name="form"></slot>
    </div>

    <div :class="getBackgroundClass()">
      <slot name="background-content"></slot>
    </div>
  </div>
</template>

<style scoped>
.order-1 {
  animation: slideFromLeft 0.7s forwards;
}

.order-2 {
  animation: slideFromRight 0.7s forwards;
}

@keyframes slideFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
