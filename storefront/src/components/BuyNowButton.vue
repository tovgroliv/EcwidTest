<template>
  <div
    :class="{ 'form-control--done': animated, 'form-control form-control--button form-control--large form-control--primary form-control--flexible form-control--animated ec-cart__button ec-cart__button--checkout buy_now_button': true }">
    <button class="form-control__button form-control__button--icon-center" type="button" @click="onClick">
      <div class="form-control__loader"></div>
      <span class="form-control__button-text">
        <slot />
      </span>
      <span class="form-control__button-svg"><span class="svg-icon"><svg width="27" height="23" viewBox="0 0 27 23"
            xmlns="http://www.w3.org/2000/svg">
            <path class="svg-line-check" d="M1.97 11.94L10.03 20 25.217 2" fill="none" fill-rule="evenodd"
              stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
          </svg></span></span>
    </button>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

let animated = ref(true)
const emit = defineEmits(['click'])

function onClick() {
  emit('click')
  animated.value = false
  setTimeout(() => {
    animated.value = true
  }, 500);
}

</script>

<style scoped></style>