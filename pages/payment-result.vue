// pages/payment-result.vue
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = route.query.order_id;
const status = route.query.transaction_status;

// Fetch ke backend untuk update status pembayaran, jika perlu
</script>

<template>
  <div>
    <h1>
      Payment {{ status === "settlement" ? "Success" : "Pending/Failed" }}
    </h1>
    <p>Order ID: {{ orderId }}</p>
  </div>
</template>
