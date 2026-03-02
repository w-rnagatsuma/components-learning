<template>
  <UserDetailView
    :user="user"
    :loading="loading"
    :saving="saving"
    :error="error"
    :form="form"
    :form-errors="formErrors"
    @submit="handleSubmit"
    @back="back"
  />
</template>

<script lang="ts" setup>
import UserDetailView from './UserDetailView.vue';
import type { UserId, UserUpdateInput } from '../types/user';
import { useUserDetail } from '../composables/useUserDetail';
import { useToast } from '~/src/shared/composables/useToast';
import { useRecentUsers } from '../composables/useRecentUsers';

const props = defineProps<{
  id: UserId | null;
}>();
const router = useRouter();
const toast = useToast();
const { add } = useRecentUsers();

const isRef = toRef(props, 'id');
const { user, loading, saving, error, fetchDetail, save } = useUserDetail(isRef);

const form = computed<UserUpdateInput>(() => ({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || '',
}));

const formErrors = ref<string[]>([]);

await useAsyncData(`user_detail_${props.id}`, () => fetchDetail());

watch(
  user,
  (newUser) => {
    if (newUser) {
      add(newUser); // CSR onlyでlocalStorageに保存（composable内でclientガード済み）
    }
  },
  { immediate: true },
);

const handleSubmit = async (input: UserUpdateInput) => {
  const result = await save(input);
  formErrors.value = result.errors;
  if (result.ok) toast.push('ユーザーを保存しました', 'success');
  else toast.push('ユーザーの保存に失敗しました', 'error');
};

const back = () => {
  router.back();
};
</script>

<style scoped></style>
