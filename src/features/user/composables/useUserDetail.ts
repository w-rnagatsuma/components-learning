import { userRepository } from '../api/userRepository';
import type { User, UserId, UserUpdateInput } from '../types/user';
import { validateUserUpdate, toNormalizedUpdate } from '../domain/user';

export const useUserDetail = (id: Ref<UserId>) => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const saveing = ref(false);
  const error = ref<string | null>(null);

  const fetchDetail = async () => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await userRepository.get(id.value);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  const save = async (input: UserUpdateInput) => {
    const errors = validateUserUpdate(input);
    if (errors.length) return { ok: false as const, errors };

    saveing.value = true;
    error.value = null;
    try {
      const normalized = toNormalizedUpdate(input);
      user.value = await userRepository.update(id.value, normalized);
      return { ok: true as const, errors: [] as string[] };
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      return { ok: false as const, errors: [error.value] };
    } finally {
      saveing.value = false;
    }
  };

  return { user, loading, saveing, error, fetchDetail, save };
};
