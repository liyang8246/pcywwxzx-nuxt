<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text text-xs">{{ label }}</span>
    </div>
    <input type="text" class="input" v-model="data" />
    <div class="label">
      <span class="label-text-alt">{{ altLabel }}</span>
    </div>
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  altLabel: {
    type: String,
    default: '',
  },
});

const dateModel = defineModel();
const data = ref('');
watch(data, (newValue) => {
  dateModel.value = newValue;
});

watch(dateModel, (newValue) => {
  data.value = newValue || '';
}, { immediate: true });
</script>
