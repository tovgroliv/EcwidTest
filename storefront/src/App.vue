<template>
  <ProductCard />
  <ProductCard />
  <ProductCard />
</template>

<script setup lang="ts">

import ProductCard from './components/ProductCard.vue';
import IProductsResponse from './model/IProductsResponse';

const props = defineProps<{
  products: IProductsResponse,
}>();

</script>
