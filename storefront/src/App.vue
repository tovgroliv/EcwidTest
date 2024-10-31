<template>
  <div class="grid__wrap">
    <div class="grid__wrap-inner">
      <div
        class="grid__products grid__products--classic grid__products--layout-center grid__products--aspect-ratio-0667 grid__products--large-items"
        data-items="9" data-cols="3" style="max-width: 10000px;">
        <ProductCard :product=product v-for="product in products.items" @buyclick="() => viewModel.addInCart(product)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import ProductCard from './components/ProductCard.vue';
import IProductsResponse from './model/IProductsResponse';
import SettingsViewModel from './viewmodel/SettingsViewModel';

const props = defineProps<{
  viewModel: SettingsViewModel,
  products: IProductsResponse,
}>()

</script>
