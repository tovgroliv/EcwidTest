<template>
  <div :class="'grid-product grid-product--id-'+product.id">
    <div class="grid-product__wrap" :data-product-id=product.id>
      <div :class="'grid-product__scroller grid-product__scroller--id-'+product.id"></div>
      <div class="grid-product__wrap-inner"><a :href=product.url class="grid-product__image" :title=product.name
          :data-product-id=product.id>
          <div class="grid-product__spacer">
            <div class="grid-product__spacer-inner"></div>
          </div>
          <div class="grid-product__bg" style="background-color: rgb(219, 217, 219);"></div>
          <div class="grid-product__image-wrap">
            <img :src=product.thumbnailUrl
              :srcset="product.thumbnailUrl+' 1x, '+product.thumbnailUrl+' 2x'"
              :alt=product.name :title=product.name style="width: 100%; height: 100%;" width="1000" height="1500" loading="lazy"
              class="grid-product__picture">
          </div>
          <div class="grid-product__shadow ec-text-muted">
            <div class="grid-product__shadow-inner">{{ product.name }}</div>
          </div>
          <div class="grid__clearfix"></div>
          <div class="grid-product__hover-wrap"></div>
        </a><a :href="product.url" class="grid-product__title" :title=product.name :data-product-id=product.id>
          <div class="grid-product__title-inner">{{ product.name }}</div>
        </a>
        <div class="grid-product__price">
          <div class="grid-product__price-amount">
            <div class="grid-product__price-value ec-price-item">{{ product.defaultDisplayedPriceFormatted }}</div>
          </div>
        </div>


        <BuyNowButton @click="() => emit('buyclick', product)">BUY NOW</BuyNowButton>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IProduct } from '../model/IProduct';
import BuyNowButton from './BuyNowButton.vue';

const emit = defineEmits(['buyclick'])

const props = defineProps<{
  product: IProduct,
}>()

</script>