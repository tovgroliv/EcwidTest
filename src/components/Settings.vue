<template>
  <div class="settings-page cf">
    <div class="settings-page__header">
      <div class="settings-page__titles settings-page__titles--left">
        <h1 class="settings-page__title">{{ title }}</h1>
        <div class="settings-page__subtitle">{{ description }}</div>
      </div>
    </div>
    <div class="settings-page__body">
      <NamedArea title="Turn on/off" description="Enable or disable the component.">
        <label class="checkbox">
          <input type="checkbox" checked="" name="">
          <div data-on="enabled" data-off="disabled">
            <div></div>
          </div>
        </label>
      </NamedArea>
      <NamedArea title="Component settings" description="Some component settings.">
        <Input title="Count of suggestions" placeholder="Count" />
      </NamedArea>
      <NamedArea title="Export" description="Export some products to CSV.">
        <Button>Export to CSV</Button>
        <FlexTable :products="products" />
      </NamedArea>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NamedArea from './NamedArea.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import FlexTable, { IProduct, Product } from './FlexTable.vue';

@Options({
  components: {
    NamedArea,
    Input,
    Button,
    FlexTable,
  },
  props: {
    title: String,
    description: String
  }
})
export default class Settings extends Vue {
  title!: string
  description!: string

  products!: IProduct[]

  created(): void {
    this.getProducts().then(result => {
      console.log("Asd")
      this.products = result.items
      console.log(result)
    })
  }

  getProducts = async function getProducts(): Promise<IResponse> {
    try {
      const response = await fetch('https://app.ecwid.com/api/v3/101560752/products', {
        method: "GET",
        headers: {
          "Authorization": "Bearer public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq"
        }
      })
      return (await response.json()) as IResponse
    } catch (error) {
      console.error('products load error', error);
      return { total: 0, count: 0, items: [] }
    }
  }
}

interface IResponse {
  total: number
  count: number
  items: IProduct[]
}

</script>

<style scoped></style>