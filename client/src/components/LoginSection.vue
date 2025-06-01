<template>
  <form @submit.prevent="login">
    <div v-if="!loggedIn">
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <div v-else>
      <span>Logged in!</span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  loggedIn: Boolean
});
const emit = defineEmits(['login-success']);

const password = ref('');
const error = ref('');

async function login() {
  error.value = '';
  try {
    const res = await axios.post('/login', { password: password.value }, { withCredentials: true });
    if (res.data.success) {
      emit('login-success');
    } else {
      error.value = res.data.error || 'Login failed';
    }
  } catch (e) {
    error.value = 'Login failed';
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
