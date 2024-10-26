<template>
  <button class="btn btn-primary"><slot /></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
  }
})
export default class Button extends Vue {

}

</script>

<style scoped></style>