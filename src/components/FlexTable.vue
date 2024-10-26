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
          <Checkbox />
        </div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.id }}</div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.name }}</div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.price }}</div>
        <div class="flex-table__col flex-table__col--align-left">{{ product.thumbnailUrl }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Checkbox from './Checkbox.vue';

@Options({
  components: {
    Checkbox,
  },
  props: {
    products: Array<IProduct>()
  }
})

export default class FlexTable extends Vue {
  products!: IProduct[]
}

export interface IProduct {
  id: number
  name: string
  thumbnailUrl: string
  price: number
}

export class Product implements IProduct {
  id: number
  name: string
  thumbnailUrl: string
  price: number

  constructor(id: number, name: string, thumbnailUrl: string, price: number) {
    this.id = id
    this.name = name
    this.thumbnailUrl = thumbnailUrl
    this.price = price
  }
}

</script>

<style scoped></style>