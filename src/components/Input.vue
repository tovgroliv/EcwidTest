<template>
  <div class="fieldset">
    <div class="fieldset__title">{{ title }}</div>
    <div class="field field--medium">
      <span class="fieldset__svg-icon"></span>
      <label class="field__label">{{ placeholder }}</label>
      <input type="number" min="0" class="field__input" tabindex="4" maxlength="64" @input="handleInput" @focus="handleFocus"
        @blur="handleBlur">
      <div class="field__placeholder">{{ placeholder }}</div>
      <span class="field-state--success"><svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px"
          viewBox="0 0 26 26" focusable="false">
          <path
            d="M5 12l5.02 4.9L21.15 4c.65-.66 1.71-.66 2.36 0 .65.67.65 1.74 0 2.4l-12.3 14.1c-.33.33-.76.5-1.18.5-.43 0-.86-.17-1.18-.5l-6.21-6.1c-.65-.66-.65-1.74 0-2.41.65-.65 1.71-.65 2.36.01z">
          </path>
        </svg></span>
      <span class="field-state--close"><svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16"
          enable-background="new 0 0 16 16" xml:space="preserve" focusable="false">
          <path
            d="M15.6,15.5c-0.53,0.53-1.38,0.53-1.91,0L8.05,9.87L2.31,15.6c-0.53,0.53-1.38,0.53-1.91,0c-0.53-0.53-0.53-1.38,0-1.9l5.65-5.64L0.4,2.4c-0.53-0.53-0.53-1.38,0-1.91c0.53-0.53,1.38-0.53,1.91,0l5.64,5.63l5.74-5.73c0.53-0.53,1.38-0.53,1.91,0c0.53,0.53,0.53,1.38,0,1.91L9.94,7.94l5.66,5.65C16.12,14.12,16.12,14.97,15.6,15.5z">
          </path>
        </svg></span>
    </div>
    <div class="field__error" aria-hidden="true" style="display: none;"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: String,
    placeholder: String,
  }
})
export default class Input extends Vue {
  title!: string
  placeholder!: string

  handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      (input.parentNode as HTMLElement)?.classList.add('field--filled');
    } else {
      (input.parentNode as HTMLElement)?.classList.remove('field--filled');
    }
  };

  handleFocus = (event: Event) => {
    const input = event.target as HTMLInputElement;
    (input.parentNode as HTMLElement)?.classList.add('field--focus');
  };

  handleBlur = (event: Event) => {
    const input = event.target as HTMLInputElement;
    (input.parentNode as HTMLElement)?.classList.remove('field--focus');
  };
}

</script>

<style scoped></style>