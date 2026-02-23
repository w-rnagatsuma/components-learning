<template>
  <button
    class="btn"
    :data-variant="variant"
    :data-size="size"
    :disabled="disabled || loading"
    type="button"
    @click="$emit('click')"
  >
    <span v-if="loading">Loading...</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    // propsの型を定義
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    // propsのデフォルト値を定義
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
  },
);

defineEmits<{
  // emitの型を定義
  (e: 'click'): void;
}>();
</script>

<style scoped>
.btn {
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn[data-variant='primary'] {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
.btn[data-variant='secondary'] {
  background: #6c757d;
  color: #fff;
  border-color: #6c757d;
}
.btn[data-variant='danger'] {
  background: #dc3545;
  color: #fff;
  border-color: #dc3545;
}
.btn[data-size='small'] {
  padding: 4px 8px;
  font-size: 12px;
}
.btn[data-size='medium'] {
  padding: 8px 12px;
  font-size: 14px;
}
.btn[data-size='large'] {
  padding: 12px 16px;
  font-size: 16px;
}
</style>
