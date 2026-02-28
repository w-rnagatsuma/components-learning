import { userRepository } from '../api/userRepository';
import type { User } from '../types/user';

export const useUserList = () => {
  const keyword = ref('');
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchList = async () => {
    loading.value = true;
    error.value = null;
    try {
      users.value = await userRepository.list({ keyword: keyword.value });
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
    } finally {
      loading.value = false;
    }
  };

  // 入力のたびに叩かない最小デバウンス（連続で発生する処理を最後の一回だけ実行する）
  let t: number | undefined;
  watch(keyword, () => {
    if (t) window.clearTimeout(t);
    if (!import.meta.client) return; // サーバーサイドでは即時に実行
    t = window.setTimeout(() => void fetchList(), 250); // 250msのデバウンス
  });

  return { keyword, users, loading, error, fetchList };
};
