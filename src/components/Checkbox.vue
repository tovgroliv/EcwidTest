<template>
  <div class="custom-checkbox">
    <label>
      <input type="checkbox" value="on" tabindex="0" class="custom-checkbox__input">
      <span class="custom-checkbox__label"></span>
      <span class="custom-checkbox__text">{{ description }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  description: String
});

</script>

<style scoped></style>