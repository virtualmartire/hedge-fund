<template>
  <div class="fund-total" v-if="total !== null">
    Fund Total: <span style="margin-left: 0.5em;">{{ total }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const total = ref(null);

async function fetchFundTotal() {
  try {
    // If you want to fetch from backend, change the URL accordingly
    // For now, let's sum up the quota.json values
    const res = await axios.get('/quota.json');
    const quota = res.data.quota || [];
    total.value = quota.reduce((sum, q) => sum + (q.value || 0), 0);
  } catch (e) {
    total.value = 'N/A';
  }
}

onMounted(fetchFundTotal);
</script>

<style scoped>
</style>
