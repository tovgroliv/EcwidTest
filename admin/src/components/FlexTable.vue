<template>
  <div class="flex-table">
    <div class="flex-table__head">
      <div class="flex-table__col flex-table__col--align-left">Select</div>
      <div class="flex-table__col flex-table__col--align-left">Id</div>
      <div class="flex-table__col flex-table__col--align-left">Name</div>
      <div class="flex-table__col flex-table__col--align-left">Price</div>
      <div class="flex-table__col flex-table__col--align-left">Image</div>
    </div>
    <div v-for="product in products">
      <div class="flex-table__row">
        <div class="flex-table__col flex-table__col--align-left">
          <Checkbox @change="(checked) => OnChecked(product, checked)" :checked="false" />
        </div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.id }}</div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.name }}</div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.price }}</div>
        <div class="flex-table__col flex-table__col--align-left"><img :src="product.imageUrl" width="100" /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IProduct } from '@/model/IProduct';
import Checkbox from './Checkbox.vue';

const props = defineProps(['products'])
const emit = defineEmits(['change'])

function OnChecked(product: IProduct, checked: boolean) {
  emit('change', product, checked)
}

</script>

<style scoped></style>