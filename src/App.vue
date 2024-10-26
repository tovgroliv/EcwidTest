<template>
  <Settings title="Test component" description="Use for export some product to CSV and for suggestions in order page." />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Settings from './components/Settings.vue';

@Options({
  components: {
    Settings,
  },
})
export default class App extends Vue {}
</script>
