<template>
  <div class="header-container">
    <h1>Martire's Hedge Fund</h1>
    <div class="user-icon-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header-container {
  background: var(--background-1);
  border-radius: 10px;
  padding: 1.5rem 1rem;
  box-shadow: 0 2px 12px 0 var(--shadow-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.user-icon-container {
  display: flex;
  align-items: center;
}
</style>
