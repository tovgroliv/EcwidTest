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
          <input type="checkbox">
          <div data-on="enabled" data-off="disabled">
            <div></div>
          </div>
        </label>
      </NamedArea>
      <NamedArea title="Component settings" description="Some component settings.">
        <Input title="Count of suggestions" placeholder="Count" v-model="viewModel.settings.suggestionCount" />
        <Button @click="() => viewModel.UpdateSuggestionCount(0)">Save</Button>
      </NamedArea>
      <NamedArea title="Export" description="Export some products to CSV.">
        <Button @click="() => viewModel.ExportCsv()">Export selected products ({{ selected }})</Button>
        <div style="height: 20px"></div>
        <FlexTable :products="products" @change="(product, checked) => OnChange(product, checked)" />
      </NamedArea>
    </div>
  </div>
</template>

<script setup lang="ts">

import { watchEffect, ref } from 'vue';
import NamedArea from './NamedArea.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import FlexTable from './FlexTable.vue';
import SettingsViewModel from '@/viewmodel/SettingsViewModel';
import { IProduct } from '@/model/IProduct';

const props = defineProps({
  title: String,
  description: String,
});

const viewModel = new SettingsViewModel()
let products = ref<Array<IProduct>>([])
let selected = ref<number>(0)

watchEffect(() => {
  viewModel?.response?.then(response => products.value = response.items)
  // viewModel?.settings.suggestionCount = 
})

function OnChange(product: IProduct, checked: Boolean) {
  if (checked) {
    viewModel.selected.add(product)
  }
  if (!checked) {
    viewModel.selected.delete(product)
  }

  selected.value = viewModel?.selected.size ?? 0
}

</script>

<style scoped></style>