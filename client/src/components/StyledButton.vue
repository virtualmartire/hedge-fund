<template>
  <button class="styled-button">
    <slot></slot>
  </button>
</template>

<script setup>
</script>

<style scoped>
.styled-button {
  font-size: 0.95rem;
  padding: 0.35rem 1.1rem;
  margin: 0;
  border-radius: 5px;
  border: 1px solid var(--text-1);
  background: var(--background-1);
  color: var(--text-1);
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

.styled-button:disabled {
  background: var(--background-1);
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
