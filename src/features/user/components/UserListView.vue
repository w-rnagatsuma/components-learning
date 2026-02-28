<template>
  <section>
    <header>
      <h2>ユーザ一覧</h2>
      <span>loading...</span>
    </header>

    <BaseInput v-model="qProxy" label="検索" placeholder="検索ワードを入力してください" />

    <p>{{ error }}</p>

    <ul>
      <li>
        <a>dummy</a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import BaseInput from '~/src/shared/components/BaseInput.vue';

const qProxy = ref('');
const error = ref('');
</script>

<style scoped></style>
