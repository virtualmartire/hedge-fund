<template>
  <form @submit.prevent="login" class="stealth-login-form">
    <div v-if="!loggedIn">
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  loggedIn: Boolean,
  onLoginComplete: Function
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
      if (props.onLoginComplete) {
        props.onLoginComplete();
      }
    } else {
      error.value = res.data.error || 'Login failed';
    }
  } catch (e) {
    error.value = 'Login failed';
  }
}
</script>

<style scoped>
.stealth-login-form {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
}
.stealth-login-form input {
  font-size: 0.95rem;
  padding: 0.35rem 0.7rem;
  margin: 0 0 0.3rem 0;
  border-radius: 5px;
  border: 1px solid #e2c785;
  width: 100%;
  background: #fafbfc;
  box-sizing: border-box;
}
.stealth-login-form button {
  font-size: 0.95rem;
  padding: 0.35rem 1.1rem;
  border-radius: 5px;
  background: #8a6d3b;
  color: #fff;
  border: none;
  margin-top: 0.2rem;
  cursor: pointer;
}
.error {
  color: #e74c3c;
  margin-top: 0.4rem;
}
</style>
