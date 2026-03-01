<template>
  <section class="card">
    <header class="card__hero">
      <h2>ユーザ一覧</h2>
      <span v-if="loading">loading...</span>
    </header>

    <BaseInput v-model="qProxy" label="検索" placeholder="name/email" />

    <p v-if="error" class="card__error">{{ error }}</p>

    <ul class="card__list">
      <li v-for="v in users" :key="v.id" class="card__list-item">
        <a :href="`/users/${v.id}`" @click.prevent="$emit('user-click', v.id)">
          {{ v.firstName }} {{ v.lastName }} ({{ v.email }})
        </a>
      </li>
    </ul>

    <div v-if="recent && recent.length" class="card__recent">
      <h3>最近見たユーザ</h3>
      <ul class="card__list">
        <li v-for="r in recent" :key="r.id">
          <a :href="`/users/${r.id}`" @click.prevent="$emit('user-click', r.id)">
            {{ r.firstName }} {{ r.lastName }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import BaseInput from '~/src/shared/components/BaseInput.vue';
import type { UserId } from '../types/user';

const props = defineProps<{
  query: string;
  users: { id: UserId; firstName: string; lastName: string; email: string }[];
  loading: boolean;
  error: string | null;
  recent?: { id: UserId; firstName: string; lastName: string }[];
}>();

const emit = defineEmits<{
  (e: 'update:query', value: string): void;
  (e: 'user-click', id: UserId): void;
}>();

const qProxy = computed({
  get: () => props.query,
  set: (v) => emit('update:query', v),
});
</script>

<style scoped>
.card {
  padding: 14px;
  border: 1px solid #bbb;
  border-radius: 14px;
  display: grid;
  gap: 10px;
}

.card__hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__error {
  color: #a00;
}

.card__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card__list-item {
  padding: 8px;
  border-bottom: 1px solid #bbb;
}

.card__recent {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #bbb;
}
</style>
