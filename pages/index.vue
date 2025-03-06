<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const showScrollButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 500;

  const reveals = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
  );
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <button
      @click="scrollToTop"
      class="scroll-to-top-btn"
      :class="{ show: showScrollButton }"
    >
      ↑
    </button>

    <header
      class="w-full h-screen mb-40 relative bg-cover bg-center bg-no-repeat bg-[url('~/assets/images/base-bg.png')] fade-in-down"
    >
      <nav
        class="absolute top-0 left-0 w-full flex px-20 py-6 items-center justify-between slide-in"
      >
        <div class="logo hover-scale">
          <img
            class="w-16"
            src="~/assets/images/shesalon-logo.png"
            alt="She Salon"
          />
        </div>
        <div class="flex text-white font-semibold text-lg space-x-8">
          <p class="nav-link" @click="scrollToSection('home')">Home</p>
          <p class="nav-link" @click="scrollToSection('brands')">Brands</p>
          <p class="nav-link" @click="scrollToSection('about')">About</p>
          <p class="nav-link" @click="scrollToSection('services')">Services</p>
          <p class="nav-link">Contact Us</p>
        </div>
      </nav>

      <div id="home" class="absolute top-1/3 left-20 text-white -mt-10">
        <p class="text-3xl fade-in-up delay-300">Hello, Welcome To She Salon</p>
        <h1
          class="text-7xl font-extrabold mt-4 leading-tight fade-in-up delay-600"
        >
          Discover Your Perfect <br />
          Look with She Salon
        </h1>
        <p
          class="text-2xl mt-4 max-w-4xl font-light mb-10 fade-in-up delay-900"
        >
          Professional hair, skin, and beauty treatments tailored just for you.
          <br />
          Feel confident and radiant every day!
        </p>

        <div class="mt-6 flex space-x-4 fade-in-up delay-1200">
          <button class="action-button">Login</button>
          <button class="action-button">Register</button>
        </div>
      </div>
    </header>

    <div id="brands" class="text-center mb-30 scroll-reveal">
      <p class="text-[#696984] text-2xl">
        Top Beauty Brands for a Luxurious Experience
      </p>
      <div class="flex items-center justify-center">
        <img class="brand-logo" src="~/assets/images/lancome-logo.png" alt="" />
        <img
          class="brand-logo"
          src="~/assets/images/makarizo-logo.png"
          alt=""
        />
        <img class="brand-logo" src="~/assets/images/matrix-logo.png" alt="" />
        <img class="brand-logo" src="~/assets/images/msglow-logo.png" alt="" />
        <img class="brand-logo" src="~/assets/images/cosrx-logo.png" alt="" />
        <img class="brand-logo" src="~/assets/images/cerave-logo.png" alt="" />
      </div>
    </div>

    <div id="about" class="flex justify-center scroll-reveal">
      <p class="text-4xl font-semibold mb-10">
        What is <span class="text-[#F97474]">She Salon?</span>
      </p>
    </div>
    <div
      class="flex justify-center mb-30 items-center text-center scroll-reveal"
    >
      <p class="text-xl font-regular max-w-4xl text-[#696984]">
        She Salon is a beauty studio that offers professional hair, skin, and
        nail services whereby clients can enjoy expert styling, receive
        personalized treatments, relax in a luxurious space, and indulge in
        premium care all in one place.
      </p>
    </div>

    <div class="flex items-center justify-center mb-60">
      <div class="mx-55 scroll-reveal-left">
        <img src="~/assets/images/owner.png" alt="" class="hover-scale" />
        <p class="ml-10 mt-5 text-[#696984]">Ibu Henry</p>
      </div>
      <div class="scroll-reveal-right">
        <p class="text-xl font-regular max-w-xl text-[#696984]">
          She Salon was born from a deep passion for beauty, self-care, and
          helping others feel their best. As a solo beauty professional, I
          created this space to provide high-quality, personalized services in a
          comfortable and welcoming environment. With years of experience and a
          dedication to continuous learning, I strive to offer expert care
          tailored to each client's unique needs.
        </p>
      </div>
    </div>

    <div id="services" class="flex justify-center scroll-reveal">
      <p class="text-4xl font-semibold mb-30">
        Our <span class="text-[#F97474]">Services</span>
      </p>
    </div>

    <div class="space-y-20">
      <div
        v-for="(_, index) in 5"
        :key="index"
        class="flex justify-center mb-50 ml-5 service-group scroll-reveal"
        :class="{ 'flex-row-reverse': index % 2 === 1 }"
      >
        <div class="scroll-reveal-left">
          <img
            class="w-120 mr-45 rounded-2xl service-image"
            src="~/assets/images/haircut.jpg"
            alt=""
          />
        </div>
        <div class="scroll-reveal-right">
          <p class="text-4xl font-semibold max-w-xl px-2">
            Precision <span class="text-[#F97474]">Haircut</span> & Personalized
            <span class="text-[#F97474]">Styling</span>
          </p>
          <p class="text-xl font-regular max-w-md px-3 mt-10 text-[#696984]">
            Get a perfectly tailored haircut and style that complements your
            face shape and personality. Our expert stylists ensure a clean,
            precise finish, leaving your hair looking fresh, stylish, and easy
            to manage.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #f97474;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.scroll-to-top-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.scroll-to-top-btn.show {
  opacity: 1;
  visibility: visible;
}

.scroll-reveal,
.scroll-reveal-left,
.scroll-reveal-right {
  opacity: 0;
  transition: all 1s ease;
}

.scroll-reveal {
  transform: translateY(50px);
}

.scroll-reveal-left {
  transform: translateX(-100px);
}

.scroll-reveal-right {
  transform: translateX(100px);
}

.scroll-reveal.active,
.scroll-reveal-left.active,
.scroll-reveal-right.active {
  opacity: 1;
  transform: translate(0);
}

html {
  scroll-behavior: smooth;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-down {
  animation: fadeInDown 0.5s ease-out forwards;
}

.fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.slide-in {
  opacity: 0;
  animation: slideIn 0.5s ease-out forwards;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-600 {
  animation-delay: 0.6s;
}

.delay-900 {
  animation-delay: 0.9s;
}

.delay-1200 {
  animation-delay: 1.2s;
}

.nav-link {
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #f97474;
  transform: scale(1.1);
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: 1px solid white;
  border-radius: 9999px;
  color: white;
  transition: all 0.3s ease;
}

.action-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.05);
}

.brand-logo {
  width: 10rem;
  margin: 0 0.5rem;
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.1);
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.1);
}

.service-group {
  position: relative;
}

.service-image {
  transition: all 0.5s ease;
}

.service-group:hover .service-image {
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
