<template>
  <UserListView
    :query="keyword"
    :users="users"
    :loading="loading"
    :error="error"
    :recent="recent"
    @update:query="(v) => (keyword = v)"
    @user-click="userClick"
  />
</template>

<script lang="ts" setup>
import UserListView from './UserListView.vue';
import { useUserList } from '../composables/useUserList';
import { useRecentUsers } from '../composables/useRecentUsers';

const router = useRouter();
const { keyword, users, loading, error, fetchList } = useUserList();
const { recent } = useRecentUsers();

// 初回レンダリング前にユーザ一覧を取得（SSR/CSRどちらでも取得）
await useAsyncData('user_list', () => fetchList());

const userClick = (id: string) => {
  router.push(`/users/${id}`);
};
</script>

<style scoped></style>
