<template>
  <label class="checkbox">
    <input type="checkbox" v-model="model" @change="handleChange">
    <div data-on="enabled" data-off="disabled">
      <div></div>
    </div>
  </label>
</template>

<script setup lang="ts">

const model = defineModel<boolean>()
const emit = defineEmits(['change'])

const props = defineProps({
  defaultValue: Boolean,
})

const handleChange = (event: Event) => {
  model.value = (event.target as HTMLInputElement).checked
  emit('change')
}

</script>

<style scoped></style>