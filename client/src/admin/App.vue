<template>
  <Settings title="Test component" description="Use for export some product to CSV and for suggestions in order page." />
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import Settings from '@/admin/view/Settings.vue';
import SettingsViewModel from '@/admin/viewmodel/SettingsViewModel';

export default {
  components: {
    Settings,
  },
}

</script>
