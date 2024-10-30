<template>
  <button @click="() => emit('click')" class="btn btn-primary"><slot /></button>
</template>

<script setup lang="ts">

const emit = defineEmits(['click'])

</script>

<style scoped></style>