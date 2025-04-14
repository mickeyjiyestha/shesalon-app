<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNuxtApp } from "#app"; // ⬅️ Tambahkan ini

const { $firestore } = useNuxtApp(); // ⬅️ Lalu ini
const isModalOpen = ref(false);
const stream = ref(null);
const videoRef = ref(null);
const canvasRef = ref(null);
const guideCanvasRef = ref(null);
const isLoading = ref(false);
const scanningStatus = ref("");
const recommendations = ref([]); // untuk hasil rekomendasi
let animationFrameId = null;

const drawFaceGuide = (canvas) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Bersihkan canvas
  ctx.clearRect(0, 0, width, height);

  // Set style untuk guide
  ctx.strokeStyle = "rgba(249, 116, 116, 0.5)"; // Warna merah muda transparan
  ctx.lineWidth = 2;

  // Gambar oval wajah
  const centerX = width / 2;
  const centerY = height / 2;
  const faceWidth = width * 0.4;
  const faceHeight = height * 0.6;

  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    faceWidth / 2,
    faceHeight / 2,
    0,
    0,
    2 * Math.PI
  );
  ctx.stroke();

  // Tambahkan teks panduan
  ctx.fillStyle = "rgba(249, 116, 116, 0.7)";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Align your face within the frame", centerX, height - 30);
};

const initializeGuideCanvas = () => {
  if (!videoRef.value || !guideCanvasRef.value) return;

  const video = videoRef.value;
  const guideCanvas = guideCanvasRef.value;

  // Tunggu hingga video memiliki dimensi
  const checkDimensions = setInterval(() => {
    if (video.videoWidth && video.videoHeight) {
      clearInterval(checkDimensions);
      guideCanvas.width = video.videoWidth;
      guideCanvas.height = video.videoHeight;
      drawFaceGuide(guideCanvas);
    }
  }, 100);
};

const openModal = async () => {
  isModalOpen.value = true;
  isLoading.value = true;
  scanningStatus.value = "Initializing camera...";

  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 480,
        facingMode: "user",
      },
    });

    if (videoRef.value) {
      videoRef.value.srcObject = stream.value;
      await videoRef.value.play();
      initializeGuideCanvas(); // Inisialisasi guide canvas setelah video dimulai
    }
  } catch (error) {
    console.error("Error:", error);
    scanningStatus.value = "Error accessing camera. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
};

const drawFaceShape = (ctx, detection) => {
  const { xcenter, ycenter, width, height } = detection;

  ctx.strokeStyle = "#F97474";
  ctx.lineWidth = 2;

  // Draw bounding box
  ctx.beginPath();
  ctx.rect(xcenter - width / 2, ycenter - height / 2, width, height);
  ctx.stroke();

  // Add face shape text
  ctx.fillStyle = "#F97474";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    `Face Shape: ${detection.name} (${Math.round(
      detection.confidence * 100
    )}%)`,
    xcenter,
    ycenter - height / 2 - 10
  );
};

const captureFace = async () => {
  if (!videoRef.value || !canvasRef.value) return;

  const video = videoRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Capture current frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  try {
    isLoading.value = true;
    scanningStatus.value = "Analyzing your face shape...";

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "face.jpg");

    const response = await fetch(
      "https://modeldetection-api-401887634547.asia-southeast2.run.app/detect",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Detection API request failed");
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.detections && result.detections.length > 0) {
      // Sort detections by confidence and get the highest one
      const bestDetection = result.detections.sort(
        (a, b) => b.confidence - a.confidence
      )[0];
      drawFaceShape(ctx, bestDetection);
      scanningStatus.value = `Analysis complete! Your face shape is ${
        bestDetection.name
      } (${Math.round(bestDetection.confidence * 100)}% confidence)`;
      await getRecommendations(bestDetection.name);
    } else {
      scanningStatus.value = "No face detected. Please try again.";
    }
  } catch (error) {
    console.error("Detection error:", error);
    scanningStatus.value = "Error analyzing face. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const startScan = () => {
  captureFace();
};

const getRecommendations = async (faceShape) => {
  try {
    console.log("Detected face shape:", faceShape);

    // Ambil referensi koleksi berdasarkan bentuk wajah
    const shapeCollection = collection($firestore, faceShape.toLowerCase());
    const snapshot = await getDocs(shapeCollection);

    const styles = [];
    snapshot.forEach((doc) => {
      styles.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    recommendations.value = styles;
    console.log("Recommendations:", recommendations.value);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

// Helper function to get all subcollections of a document
const getSubcollections = async (docRef) => {
  const subcollections = [];
  const colRefs = await docRef.listCollections(); // Get subcollections
  for (const colRef of colRefs) {
    const snapshot = await getDocs(colRef); // Get all documents in each subcollection
    snapshot.forEach((doc) => {
      subcollections.push(doc.data()); // Collect data from each subdocument
    });
  }
  return subcollections;
};
</script>

<template>
  <div class="face-scanner">
    <button
      @click="openModal"
      class="scan-button group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#F97474] to-[#ff5757] text-white rounded-full hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:from-[#ff5757] hover:to-[#F97474] w-auto"
    >
      <span class="text-lg font-semibold whitespace-nowrap"
        >Try Our AI Hair Stylist</span
      >
    </button>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
      >
        <div
          class="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3
                class="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F97474] to-[#ff5757] bg-clip-text text-transparent"
              >
                AI Hair Style Recommendation
              </h3>
              <p class="text-sm md:text-base text-gray-600 mt-1">
                Position your face within the frame
              </p>
            </div>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <span class="material-icons">close</span>
            </button>
          </div>

          <div
            class="relative mb-6 rounded-xl overflow-hidden shadow-lg bg-gray-100"
          >
            <div class="relative" style="aspect-ratio: 4/3">
              <video
                ref="videoRef"
                autoplay
                playsinline
                class="absolute inset-0 w-full h-full object-cover"
              ></video>
              <canvas
                ref="guideCanvasRef"
                class="absolute inset-0 w-full h-full pointer-events-none z-10"
              ></canvas>
              <canvas
                ref="canvasRef"
                class="absolute inset-0 w-full h-full"
              ></canvas>

              <div
                v-if="isLoading"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div class="text-center text-white">
                  <div
                    class="animate-spin rounded-full h-12 w-12 border-4 border-t-[#F97474] border-white mb-4"
                  ></div>
                  <p class="text-lg">{{ scanningStatus }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center space-y-4">
            <p v-if="scanningStatus" class="text-gray-600 text-sm md:text-base">
              {{ scanningStatus }}
            </p>
            <button
              @click="startScan"
              class="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#F97474] to-[#ff5757] text-white rounded-full font-semibold hover:shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-[#ff5757] hover:to-[#F97474]"
            >
              <span class="flex items-center justify-center space-x-2">
                <i class="fa-solid fa-camera"></i>
                <span>Analyze My Face Shape</span>
              </span>
            </button>
            <!-- Bagian hasil rekomendasi -->
            <!-- Hasil Rekomendasi -->
            <div v-if="recommendations.length" class="mt-8">
              <h4 class="text-xl font-semibold text-center mb-4 text-[#F97474]">
                Recommended Hairstyles for You
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="style in recommendations"
                  :key="style.id"
                  class="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    :src="style.image"
                    alt="Recommended style"
                    class="w-full h-56 object-cover"
                  />
                  <div class="p-4 space-y-2">
                    <h5 class="text-lg font-semibold text-[#ff5757]">
                      {{ style.name }}
                    </h5>
                    <p class="text-gray-600 text-sm">
                      {{ style.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.face-scanner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scan-button {
  min-width: 200px;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

@media (max-width: 640px) {
  .material-icons {
    font-size: 20px;
  }
}
</style>
