<template>
  <div class="custom-checkbox">
    <label>
      <input type="checkbox" @change="() => OnChange()" :checked="checked" tabindex="0"
        class="custom-checkbox__input">
      <span class="custom-checkbox__label"></span>
      <span class="custom-checkbox__text">{{ description }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  description: String
});

let checked = false
const emit = defineEmits(['change'])

function OnChange() {
  checked = !checked
  emit('change', checked)
}

</script>

<style scoped></style>