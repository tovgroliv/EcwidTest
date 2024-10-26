<template>
  <div class="custom-checkbox">
    <label>
      <input type="checkbox" value="on" tabindex="0" class="custom-checkbox__input">
      <span class="custom-checkbox__label"></span>
      <span class="custom-checkbox__text">{{ description }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    description: String
  }
})
export default class Checkbox extends Vue {
  description!: String
}

</script>

<style scoped></style>