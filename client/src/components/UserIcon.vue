<template>
  <div class="user-icon-wrapper" ref="wrapper" tabindex="0">
    <svg class="user-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="toggleDropdown">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
    <div v-if="dropdownOpen" class="dropdown" @close-dropdown="closeDropdown">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineExpose } from 'vue';
const dropdownOpen = ref(false);
const wrapper = ref(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}
defineExpose({ closeDropdown });

function onDocumentClick(e) {
  if (!wrapper.value) return;
  if (!wrapper.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
}

function onSlotEvent(event) {
  if (event && event.type === 'close-dropdown') {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentClick);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentClick);
});
</script>

<style scoped>
.user-icon-wrapper {
  position: relative;
  z-index: 100;
  cursor: pointer;
  outline: none;
}
.user-icon {
  stroke: var(--text-1);
  transition: box-shadow 0.2s;
  border-radius: 50%;
  background: var(--background-1);
  box-shadow: 0 2px 8px 0 var(--shadow-1);
}
.user-icon-wrapper:focus .user-icon,
.user-icon-wrapper:hover .user-icon {
  box-shadow: 0 4px 18px 0 var(--shadow-1);
}
.dropdown {
  position: absolute;
  right: 0;
  top: 36px;
  min-width: 170px;
  background: var(--background-1);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 var(--shadow-1);
  padding: 16px 20px 14px 20px;
  margin-top: 4px;
  z-index: 101;
  font-size: 1rem;
}
</style>
