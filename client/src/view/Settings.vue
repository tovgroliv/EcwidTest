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
        <Toggle @change="() => viewModel.TurnOnOff()" :defaultValue="enabled" v-model="viewModel.settings.enabled" />
      </NamedArea>
      <NamedArea title="Component settings" description="Some component settings.">
        <Input title="Count of suggestions" placeholder="Count" :defaultValue="suggestionCount" v-model="viewModel.settings.suggestionCount" />
        <div style="height: 10px"></div>
        <Button @click="() => viewModel.UpdateSuggestionCount()">Save</Button>
      </NamedArea>
      <NamedArea title="Export" description="Export some products to CSV.">
        <Button @click="() => viewModel.ExportCsv()">Export selected products ({{ selected }})</Button>
        <div style="height: 10px"></div>
        <FlexTable :products="products" @change="(product, checked) => OnChange(product, checked)" />
      </NamedArea>
    </div>
  </div>
</template>

<script setup lang="ts">

import { watchEffect, ref } from 'vue';
import NamedArea from '@/components/NamedArea.vue';
import Toggle from '@/components/Toggle.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import FlexTable from '@/components/FlexTable.vue';
import SettingsViewModel from '@/viewmodel/SettingsViewModel';
import { IProduct } from '@/model/IProduct';

const props = defineProps({
  title: String,
  description: String,
});

const viewModel = new SettingsViewModel()
const products = ref<Array<IProduct>>([])
const selected = ref<number>(0)
const enabled = ref<boolean>(false)
const suggestionCount = ref<number>(0)

watchEffect(() => {
  viewModel?.response?.then(response => products.value = response.items)
  viewModel?.settingsResponse?.then(response => {
    enabled.value = response.enabled
    suggestionCount.value = response.suggestionCount
  })
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