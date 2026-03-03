<template>
  <main class="page">
    <UserDetailContainer :id="id" />
  </main>
</template>

<script lang="ts" setup>
import UserDetailContainer from '~/src/features/user/components/UserDetailContainer.vue';

const route = useRoute();
const id = computed(() => String(route.params.id));

console.log(route.params);
</script>

<style scoped>
.page {
  padding: 18px;
}
</style>
