<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Button'
  },
  onClick: {
    type: Function,
    default: () => {}
  }
})
</script>

<template>
  <button @click="props.onClick">
    {{ props.label }}
  </button>
</template>

<style scoped>
button {
  width: 80%;
  background-color: #007bff;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
