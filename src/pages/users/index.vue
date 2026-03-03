<template>
  <main>
    <h1>ユーザー一覧</h1>
    <UserListContainer />
  </main>
</template>

<script lang="ts" setup>
import UserListContainer from '~/src/features/user/components/UserListContainer.vue';

useSeoMeta({
  title: 'Users',
  description: 'User list (demo)',
});
</script>

<style scoped></style>
