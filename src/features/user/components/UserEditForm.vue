<template>
  <form class="from">
    <BaseInput v-model="draft.firstName" label="名" />
    <BaseInput v-model="draft.lastName" label="姓" />
    <BaseInput v-model="draft.email" label="メール" />
  </form>

  <ul v-if="props.errors.length" class="errors">
    <li v-for="(e, i) in props.errors" :key="i">{{ e }}</li>
  </ul>

  <div class="actions">
    <BaseButton :loading="props.saving" :disabled="props.saving" @click="$emit('submit', draft)">
      保存
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import BaseInput from '~/src/shared/components/BaseInput.vue';
import BaseButton from '~/src/shared/components/BaseButton.vue';
import type { UserUpdateInput } from '../types/user';

const props = defineProps<{
  modelValue: UserUpdateInput;
  saving: boolean;
  errors: string[];
}>();

defineEmits<{
  (e: 'submit', value: UserUpdateInput): void;
}>();

// フォームはローカル編集状態を持つため、propsからreactiveなdraftを作成する（UI都合のstate）
const draft = reactive<UserUpdateInput>({
  firstName: props.modelValue.firstName,
  lastName: props.modelValue.lastName,
  email: props.modelValue.email,
});

watch(
  () => props.modelValue,
  (newValue) => {
    draft.firstName = newValue.firstName;
    draft.lastName = newValue.lastName;
    draft.email = newValue.email;
  },
  { deep: true },
);
</script>

<style scoped>
.form {
  display: grid;
  gap: 10px;
}

.errors {
  color: #a00;
  margin: 0;
  padding-left: 18px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
