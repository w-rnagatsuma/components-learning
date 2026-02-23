<template>
  <label class="wrap">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      class="input"
      :value="modelValue"
      :placeholder="palaceholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    palaceholder?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    palaceholder: '',
    disabled: false,
  },
);

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
<style scoped>
.wrap {
  display: grid;
  gap: 4px;
}
.label {
  font-size: 14px;
  color: #333;
}
.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
