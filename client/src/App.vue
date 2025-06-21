<template>
  <div class="container">

    <Header>
      <UserIcon ref="userIcon" @close-dropdown="closeUserDropdown">
        <template v-if="!loggedIn">
          <LoginSection @login-success="onLoginSuccess" :logged-in="loggedIn" :onLoginComplete="closeUserDropdown" />
        </template>
        <template v-else>
          <StyledButton @click="handleLogoutClick">Logout</StyledButton>
        </template>
      </UserIcon>
    </Header>

    <div v-if="loggedIn" class="element-container">
      <FundTotal />
    </div>

    <div class="charts-row">
      <div class="element-container chart-container">
        <PieChart :quota="quota" />
      </div>
      <div class="element-container chart-container timeseries-container">
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
import Header from './components/Header.vue';
import StyledButton from './components/StyledButton.vue';

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
    width: 90vw;
    height: 90vh;
    padding: 40px 20px;
    position: relative;
    background: var(--background-1);
    border-radius: 14px;
    color: var(--text-1);
    box-sizing: border-box;
}

.charts-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2rem;
}
.element-container {
    flex: 1 1 350px;
    min-width: 320px;
    background: var(--background-1);
    border-radius: 10px;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px 0 var(--shadow-1);
}

.chart-container {
    min-height: 420px;
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
    .element-container {
        max-width: 100%;
    }
}
</style>
