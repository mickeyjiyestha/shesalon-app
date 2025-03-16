<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const isMenuOpen = ref(false);
const user = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const isBookingModalOpen = ref(false);

const menuItems = ["Home", "Order", "Blog", "About", "Contact Us"];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const handleMenuClick = (item) => {
  console.log(`Clicked: ${item}`);
  toggleMenu();
};

const openBookingModal = () => {
  isBookingModalOpen.value = true;
};

const closeBookingModal = () => {
  isBookingModalOpen.value = false;
};

const fetchUser = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(
      "https://b05a-182-253-98-194.ngrok-free.app/api/auth/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const result = await response.json();
    console.log("Response API:", result);

    user.value = result.user;
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Fetch user error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUser();

  document.documentElement.style.scrollBehavior = "smooth";

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const createObserver = (className, delay = 0) => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, delay * index);
        }
      });
    }, observerOptions);
  };

  const fadeObserver = createObserver("fade-in", 100);
  const slideObserver = createObserver("slide-in", 150);
  const scaleObserver = createObserver("scale-in", 200);

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => fadeObserver.observe(el));
  document
    .querySelectorAll(".slide-in")
    .forEach((el) => slideObserver.observe(el));
  document
    .querySelectorAll(".scale-in")
    .forEach((el) => scaleObserver.observe(el));
});
</script>

<template>
  <div class="scroll-smooth">
    <header
      class="w-full h-screen mb-20 md:mb-40 relative bg-cover bg-center bg-no-repeat bg-[url('~/assets/images/base-bg.png')] transition-all duration-700 ease-out"
    >
      <nav
        class="absolute top-0 left-0 w-full px-4 md:px-20 py-4 md:py-6 transition-all duration-300"
      >
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="logo scale-in z-30">
            <img
              class="w-10 md:w-16 transform hover:scale-110 transition-transform duration-300 ease-out"
              src="~/assets/images/shesalon-logo.png"
              alt="She Salon"
            />
          </div>

          <button @click="toggleMenu" class="md:hidden z-30 p-2 text-white">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            class="hidden md:flex text-white font-semibold text-lg space-x-8"
          >
            <p
              v-for="(item, index) in menuItems"
              :key="index"
              class="hover:text-[#F97474] cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-2px]"
            >
              {{ item }}
            </p>
          </div>

          <div
            :class="[
              'fixed inset-0 bg-black/95 z-20 transition-all duration-300 md:hidden',
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
            ]"
          >
            <div
              class="flex flex-col items-center justify-center h-full space-y-8 text-white font-semibold text-xl"
            >
              <p
                v-for="(item, index) in menuItems"
                :key="index"
                @click="handleMenuClick(item)"
                class="hover:text-[#F97474] cursor-pointer transition-all duration-300"
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div
        class="absolute top-[45%] md:top-1/3 left-4 md:left-20 text-white -mt-10 px-4 md:px-0"
      >
        <p class="text-xl md:text-3xl slide-in from-left">
          Hello {{ user?.username }}, Welcome To She Salon
        </p>
        <h1
          class="text-4xl md:text-7xl font-extrabold mt-4 leading-tight slide-in from-left delay-200"
        >
          Discover Your Perfect <br class="hidden md:block" />
          Look with She Salon
        </h1>
        <p
          class="text-lg md:text-2xl mt-4 max-w-full md:max-w-4xl font-light mb-6 md:mb-10 slide-in from-left delay-400"
        >
          Professional hair, skin, and beauty treatments tailored just for you.
          <br class="hidden md:block" />
          Feel confident and radiant every day!
        </p>

        <div class="mt-6 flex space-x-4 slide-in from-left delay-600">
          <button
            v-if="!user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
            @click="router.push('/login')"
          >
            Login
          </button>
          <button
            v-if="!user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Register
          </button>

          <button
            v-if="user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Booking
          </button>
          <button
            v-if="user"
            class="px-4 md:px-6 py-2 md:py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 text-sm md:text-base"
          >
            Our Services
          </button>
        </div>
      </div>
    </header>

    <div class="text-center mb-20 md:mb-30 fade-in px-4 md:px-0">
      <p class="text-xl md:text-2xl text-[#696984]">
        Top Beauty Brands for a Luxurious Experience
      </p>
      <div class="max-w-5xl mx-auto overflow-hidden relative">
        <div class="flex animate-scroll space-x-8 py-8">
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/lancome-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/makarizo-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/matrix-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/msglow-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/cosrx-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/cerave-logo.png"
            alt=""
          />

          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/lancome-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/makarizo-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/matrix-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/msglow-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/cosrx-logo.png"
            alt=""
          />
          <img
            class="w-24 md:w-40 h-24 md:h-40 object-contain transform hover:scale-110 transition-all duration-300 ease-out hover:shadow-lg"
            src="~/assets/images/cerave-logo.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center slide-in from-bottom px-4 md:px-0">
      <p class="text-3xl md:text-4xl font-semibold mb-10">
        What is
        <span
          class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
          >She Salon?</span
        >
      </p>
    </div>
    <div
      class="flex justify-center mb-20 md:mb-30 items-center text-center fade-in px-4 md:px-0"
    >
      <p class="text-lg md:text-xl font-regular max-w-4xl text-[#696984]">
        She Salon is a beauty studio that offers professional hair, skin, and
        nail services whereby clients can enjoy expert styling, receive
        personalized treatments, relax in a luxurious space, and indulge in
        premium care all in one place.
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row items-center justify-center mb-40 md:mb-60 px-4 md:px-0"
    >
      <div class="mx-0 md:mx-55 scale-in mb-8 md:mb-0">
        <img
          src="~/assets/images/owner.png"
          alt=""
          class="transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl rounded-lg"
        />
        <p class="text-center md:text-left md:ml-10 mt-5 text-[#696984]">
          Ibu Henry
        </p>
      </div>
      <div class="slide-in from-right px-4 md:px-0">
        <p class="text-lg md:text-xl font-regular max-w-xl text-[#696984]">
          She Salon was born from a deep passion for beauty, self-care, and
          helping others feel their best. As a solo beauty professional, I
          created this space to provide high-quality, personalized services in a
          comfortable and welcoming environment. With years of experience and a
          dedication to continuous learning, I strive to offer expert care
          tailored to each client's unique needs.
        </p>
      </div>
    </div>

    <div class="flex justify-center slide-in from-bottom px-4 md:px-0">
      <p class="text-3xl md:text-4xl font-semibold mb-20 md:mb-30">
        Our
        <span
          class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
          >Services</span
        >
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row justify-center mb-20 md:mb-50 px-4 md:px-0"
    >
      <div class="slide-in from-left mb-8 md:mb-0">
        <img
          class="w-full md:w-120 md:mr-45 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl"
          src="~/assets/images/haircut.jpg"
          alt=""
        />
      </div>
      <div class="slide-in from-right">
        <p class="text-3xl md:text-4xl font-semibold max-w-xl px-2">
          Precision
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Haircut</span
          >
          & Personalized
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Styling</span
          >
        </p>
        <p
          class="text-lg md:text-xl font-regular max-w-md px-3 mt-6 md:mt-10 text-[#696984]"
        >
          Get a perfectly tailored haircut and style that complements your face
          shape and personality. Our expert stylists ensure a clean, precise
          finish, leaving your hair looking fresh, stylish, and easy to manage.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col-reverse md:flex-row justify-center mb-20 md:mb-30 px-4 md:px-0"
    >
      <div class="slide-in from-left mt-8 md:mt-0">
        <p class="text-3xl md:text-4xl font-semibold max-w-xl px-2 md:px-20">
          Vibrant hair
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Coloring</span
          >
          &
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Highlights</span
          >
        </p>
        <p
          class="text-lg md:text-xl font-regular max-w-xl px-2 md:px-20 mt-6 md:mt-10 text-[#696984]"
        >
          Enhance your hair with stunning color transformations. From subtle
          highlights to full-color makeovers, we use high-quality products to
          create rich, long-lasting shades that bring out the best in your hair.
        </p>
      </div>
      <div class="slide-in from-right">
        <img
          class="w-full md:w-120 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl"
          src="~/assets/images/haircut.jpg"
          alt=""
        />
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-center mb-20 md:mb-50 px-4 md:px-0"
    >
      <div class="slide-in from-left mb-8 md:mb-0">
        <img
          class="w-full md:w-120 md:mr-45 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl"
          src="~/assets/images/haircut.jpg"
          alt=""
        />
      </div>
      <div class="slide-in from-right">
        <p class="text-3xl md:text-4xl font-semibold max-w-xl px-2">
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Smoothing</span
          >
          & Hair
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Repair</span
          >
          Treatments
        </p>
        <p
          class="text-lg md:text-xl font-regular max-w-md px-3 mt-6 md:mt-10 text-[#696984]"
        >
          Say goodbye to frizz and dryness with our premium smoothing
          treatments. Whether it's Keratin Smoothing, Collagen Smoothing, or a
          Keratin Treatment, we nourish and strengthen your hair, leaving it
          silky, healthy, and easy to manage.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col-reverse md:flex-row justify-center mb-20 md:mb-30 px-4 md:px-0"
    >
      <div class="slide-in from-left mt-8 md:mt-0">
        <p class="text-3xl md:text-4xl font-semibold max-w-xl px-2 md:px-20">
          Flawless
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Makeup</span
          >
          for Special
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Occasions</span
          >
        </p>
        <p
          class="text-lg md:text-xl font-regular max-w-xl px-2 md:px-20 mt-6 md:mt-10 text-[#696984]"
        >
          Look radiant for your big day with our professional makeup services.
          Whether it's for a graduation ceremony or a glamorous party, we craft
          stunning, long-lasting looks that enhance your natural beauty.
        </p>
      </div>
      <div class="slide-in from-right">
        <img
          class="w-full md:w-120 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl"
          src="~/assets/images/haircut.jpg"
          alt=""
        />
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-center mb-20 md:mb-50 px-4 md:px-0"
    >
      <div class="slide-in from-left mb-8 md:mb-0">
        <img
          class="w-full md:w-120 md:mr-45 rounded-2xl transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-2xl"
          src="~/assets/images/haircut.jpg"
          alt=""
        />
      </div>
      <div class="slide-in from-right">
        <p class="text-3xl md:text-4xl font-semibold max-w-xl px-2">
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Relaxing</span
          >
          &
          <span
            class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
            >Rejuvenating</span
          >
          Facial Treatments
        </p>
        <p
          class="text-lg md:text-xl font-regular max-w-md px-3 mt-6 md:mt-10 text-[#696984]"
        >
          Pamper your skin with our customized facial treatments. From a
          refreshing Basic Facial to a luxurious Premium Facial, we deeply
          cleanse, hydrate, and revitalize your skin for a glowing, youthful
          complexion.
        </p>
      </div>
    </div>

    <div
      class="flex items-center justify-center -mt-10 md:-mt-20 mb-40 md:mb-60 px-4 md:px-0"
    >
      <button
        class="flex justify-center items-center rounded-xl bg-[#F97474] hover:bg-[#ff5757] px-20 md:px-50 py-3 mt-7 text-white transition-all duration-300 ease-out hover:shadow-lg hover:scale-105 transform"
        @click="openBookingModal"
      >
        Book Now
      </button>
    </div>

    <BookingModal
      :is-open="isBookingModalOpen"
      @close="closeBookingModal"
      @submit="handleBookingSubmit"
    />

    <div
      class="flex items-center justify-center mb-6 md:mb-10 slide-in from-bottom px-4 md:px-0"
    >
      <p class="text-3xl md:text-4xl font-semibold">
        Why is
        <span
          class="text-[#F97474] hover:text-[#ff5757] transition-colors duration-300"
          >Choosing Us</span
        >
      </p>
    </div>

    <div
      class="flex justify-center mb-20 md:mb-30 items-center text-center fade-in px-4 md:px-0"
    >
      <p class="text-lg md:text-xl font-regular max-w-2xl text-[#696984]">
        At She Salon, we prioritize quality, expertise, and comfort to give you
        the best beauty experience
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row items-center justify-center mb-40 md:mb-60 relative px-4 md:px-0 space-y-8 md:space-y-0 md:space-x-4"
    >
      <div
        class="shadow-xl p-5 py-18 rounded-3xl text-center relative bg-white z-10 w-full md:w-auto hover:shadow-2xl transition-all duration-500 ease-out hover:translate-y-[-10px] scale-in"
      >
        <div
          class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F97474] rounded-full z-20 p-3 hover:bg-[#ff5757] transition-colors duration-300"
        >
          <img
            src="~/assets/images/barbershop.png"
            alt=""
            class="transform hover:rotate-12 transition-transform duration-300"
          />
        </div>
        <div class="text-xl max-w-60 mx-auto mb-5 mt-10">
          <p>Professional & Experienced Stylists</p>
        </div>
        <div class="max-w-80 mx-auto">
          <p class="text-md text-[#696984]">
            Our team consists of highly skilled and trained professionals
            dedicated to bringing out your best look.
          </p>
        </div>
      </div>

      <div
        class="shadow-xl p-5 py-15 rounded-3xl text-center relative bg-white z-10 w-full md:w-auto hover:shadow-2xl transition-all duration-500 ease-out hover:translate-y-[-10px] scale-in delay-200"
      >
        <div
          class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F97474] rounded-full z-20 p-3 hover:bg-[#ff5757] transition-colors duration-300"
        >
          <img
            src="~/assets/images/barbershop.png"
            alt=""
            class="transform hover:rotate-12 transition-transform duration-300"
          />
        </div>
        <div class="text-xl max-w-60 mx-auto mb-5 mt-10">
          <p>Premium Products & Personalized Care</p>
        </div>
        <div class="max-w-80 mx-auto">
          <p class="text-md text-[#696984]">
            We use only high-quality, salon grade products to ensure you get the
            best results for your hair, skin, beauty and wellness.
          </p>
        </div>
      </div>

      <div
        class="shadow-xl p-5 py-15 rounded-3xl text-center relative bg-white z-10 w-full md:w-auto hover:shadow-2xl transition-all duration-500 ease-out hover:translate-y-[-10px] scale-in delay-400"
      >
        <div
          class="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F97474] rounded-full z-20 p-3 hover:bg-[#ff5757] transition-colors duration-300"
        >
          <img
            src="~/assets/images/barbershop.png"
            alt=""
            class="transform hover:rotate-12 transition-transform duration-300"
          />
        </div>
        <div class="text-xl max-w-60 mx-auto mb-5 mt-10">
          <p>Relaxing & Luxurious Atmosphere</p>
        </div>
        <div class="max-w-80 mx-auto">
          <p class="text-md text-[#696984]">
            Our team consists of highly skilled and trained professionals
            dedicated to bringing out your best look, style, and confidence.
          </p>
        </div>
      </div>
    </div>

    <div class="mb-20 md:mb-40">
      <Testimonial />
    </div>

    <footer class="bg-gray-100 py-10">
      <div class="container mx-auto px-4 md:px-8">
        <div class="w-full mb-10 fade-in">
          <h3 class="text-[#F97474] font-semibold text-center mb-6">
            Visit Us
          </h3>
          <div
            class="block w-full h-[300px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <GoogleMap />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div class="fade-in">
            <h2 class="text-lg font-bold">She Salon</h2>
            <p class="text-gray-600 mt-2">
              Beauty, expertise, quality service, relaxation, confidence, style,
              care, elegance, perfection, trust.
            </p>
            <p class="text-gray-500 text-sm mt-4">Copyright © 2025</p>
            <div class="mt-4 text-gray-600">
              <a
                href="https://maps.app.goo.gl/2g4WapZUU1irp3dR8"
                target="_blank"
                rel="noopener noreferrer"
                class="block group hover:text-[#F97474] transition-colors duration-300"
              >
                <div class="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 group-hover:text-[#F97474] transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Our Location:</span>
                </div>
                <p
                  class="text-sm mt-2 pl-7 group-hover:text-[#F97474] transition-colors duration-300"
                >
                  Jl. Pratama No.95B, Benoa, Kec. Kuta Sel., Kabupaten Badung,
                  Bali
                </p>
              </a>
            </div>
          </div>

          <div class="fade-in delay-200">
            <h3 class="text-[#F97474] font-semibold">Services</h3>
            <ul class="mt-2 space-y-2 text-gray-700">
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Smoothing
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Massage
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Pedicure
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Haircut
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Hair Coloring
              </li>
            </ul>
          </div>

          <div class="fade-in delay-400">
            <h3 class="text-[#F97474] font-semibold">Quick Links</h3>
            <ul class="mt-2 space-y-2 text-gray-700">
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Home
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                About Us
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Services
              </li>
              <li
                class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                Booking
              </li>
            </ul>
          </div>

          <div class="fade-in delay-600">
            <h3 class="text-[#F97474] font-semibold">Follow Us</h3>
            <ul class="mt-2 space-y-2 text-gray-700">
              <li
                class="flex items-center space-x-2 hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                <i class="fab fa-facebook"></i>
                <span>Facebook</span>
              </li>
              <li
                class="flex items-center space-x-2 hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                <i class="fab fa-twitter"></i>
                <span>Twitter</span>
              </li>
              <li
                class="flex items-center space-x-2 hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-x-2 cursor-pointer"
              >
                <i class="fab fa-instagram"></i>
                <span>Instagram</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center text-gray-500 text-sm">
        <span
          class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-y-[-2px] cursor-pointer"
        >
          Terms & Conditions
        </span>
        |
        <span
          class="hover:text-[#F97474] transition-all duration-300 ease-out hover:translate-y-[-2px] cursor-pointer"
        >
          Privacy Policy
        </span>
      </div>
    </footer>
  </div>
</template>

<style>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in.show {
  opacity: 1;
  transform: translateY(0);
}

.slide-in {
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in.from-left {
  transform: translateX(-100px);
}

.slide-in.from-right {
  transform: translateX(100px);
}

.slide-in.from-bottom {
  transform: translateY(50px);
}

.slide-in.show {
  opacity: 1;
  transform: translate(0);
}

.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-in.show {
  opacity: 1;
  transform: scale(1);
}

.delay-200 {
  transition-delay: 200ms;
}

.delay-400 {
  transition-delay: 400ms;
}

.delay-600 {
  transition-delay: 600ms;
}

html {
  scroll-behavior: smooth;
}

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.parallax-header {
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .parallax-header {
    background-attachment: scroll;
  }
}
</style>
