<template>
  <section class="card">
    <header class="card__hero">
      <h2>{{ title }}</h2>
      <BaseButton variant="secondary" size="small" @click="$emit('back')">戻る</BaseButton>
    </header>

    <p v-if="props.loading">loading...</p>
    <p v-else-if="props.error" class="card__error">{{ props.error }}</p>

    <template v-else>
      <p class="card__meta">id: {{ props.user!.id }} / updated: {{ props.user!.updatedAt }}</p>

      <UserEditForm
        :model-value="props.form"
        :saving="props.saving"
        :errors="props.formErrors"
        @submit="$emit('submit', $event)"
      />
    </template>
  </section>
</template>

<script lang="ts" setup>
import BaseButton from '~/src/shared/components/BaseButton.vue';
import UserEditForm from './UserEditForm.vue';
import type { User, UserUpdateInput } from '../types/user';
import { getDisplayName } from '../domain/user';

const props = defineProps<{
  user: User | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  form: UserUpdateInput;
  formErrors: string[];
}>();

defineEmits<{
  (e: 'submit', payload: UserUpdateInput): void;
  (e: 'back'): void;
}>();

const title = computed(() => (props.user ? getDisplayName(props.user) : 'ユーザー詳細'));
</script>

<style scoped>
.card {
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 14px;
  display: grid;
  gap: 10px;
}

.card__hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__meta {
  color: #666;
  font-size: 12px;
}

.card__error {
  color: #a00;
}
</style>
