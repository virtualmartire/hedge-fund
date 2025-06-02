<template>
  <div class="container">
    <UserIcon ref="userIcon" @close-dropdown="closeUserDropdown">
      <template v-if="!loggedIn">
        <LoginSection @login-success="onLoginSuccess" :logged-in="loggedIn" :onLoginComplete="closeUserDropdown" />
      </template>
      <template v-else>
        <a href="#" @click.prevent="handleLogoutClick" class="stealth-logout">Logout</a>
      </template>
    </UserIcon>
    <h1>Martire's Hedge Fund</h1>
    <div v-if="loggedIn">
      <FundTotal />
    </div>
    <div class="charts-row">
      <div class="chart-container">
        <PieChart :quota="quota" />
      </div>
      <div class="chart-container timeseries-container">
        <TimeSeriesChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import LoginSection from './components/LoginSection.vue';
import PieChart from './components/PieChart.vue';
import TimeSeriesChart from './components/TimeSeriesChart.vue';
import FundTotal from './components/FundTotal.vue';
import UserIcon from './components/UserIcon.vue';

const loggedIn = ref(false);
const quota = ref([]);

async function fetchQuota() {
  try {
    const res = await axios.get('/api/quota', { withCredentials: true });
    quota.value = res.data.quota || [];
  } catch (e) {
    quota.value = [];
  }
}

async function checkSession() {
  try {
    const res = await axios.get('/check', { withCredentials: true });
    loggedIn.value = !!res.data.logged_in;
  } catch (e) {
    loggedIn.value = false;
  }
}

onMounted(() => {
  fetchQuota();
  checkSession();
});

async function onLoginSuccess() {
  await checkSession();
}

async function logout() {
  await axios.post('/logout', {}, { withCredentials: true });
  loggedIn.value = false;
}

function closeUserDropdown() {
  if (userIcon.value && userIcon.value.closeDropdown) {
    userIcon.value.closeDropdown();
  }
}

function handleLogoutClick() {
  // closeUserDropdown();
  logout();
}
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
}
h1 {
    margin-bottom: 40px;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding-bottom: 15px;
}
.charts-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2rem;
}
.chart-container {
    flex: 1 1 350px;
    min-width: 320px;
    max-width: 480px;
    min-height: 420px;
    background: #fafbfc;
    border-radius: 10px;
    padding: 1.5rem 1rem;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.timeseries-container {
    /* Ensures the canvas fills the container */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media (max-width: 900px) {
    .charts-row {
        flex-direction: column;
        gap: 1.5rem;
    }
    .chart-container {
        max-width: 100%;
    }
}
</style>
