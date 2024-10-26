<template>
  <div class="named-area">
    <div class="named-area__header">
      <div class="named-area__titles">
        <div class="named-area__title">{{ title }}</div>
      </div>
      <div class="named-area__description">{{ description }}</div>
    </div>
    <div class="named-area__body">
      <div class="a-card a-card--normal">
        <div class="a-card__paddings">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: String,
    description: String,
  }
})
export default class NamedArea extends Vue {
  title!: string
  description!: string
}
</script>

<style scoped></style>