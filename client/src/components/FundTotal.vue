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
.fund-total {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fffbe6;
  color: #8a6d3b;
  border: 2px solid #e2c785;
  border-radius: 12px;
  font-size: 1.4rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin-bottom: 28px;
  padding: 18px 0;
  box-shadow: 0 2px 12px 0 rgba(138,109,59,0.06);
  letter-spacing: 0.5px;
}
</style>
