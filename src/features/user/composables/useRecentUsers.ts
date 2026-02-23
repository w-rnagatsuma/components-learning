import type { User } from '../types/user';

const KEY = 'recent_user_v1';

type Recent = Pick<User, 'id' | 'firstName' | 'lastName' | 'updatedAt'>;

export const useRecentUsers = () => {
  const recent = ref<Recent[]>([]);

  const load = () => {
    if (!import.meta.client) return;
    try {
      const row = localStorage.getItem(KEY);
      recent.value = row ? (JSON.parse(row) as Recent[]) : [];
    } catch {
      recent.value = [];
    }
  };

  const save = () => {
    if (!import.meta.client) return;
    localStorage.setItem(KEY, JSON.stringify(recent.value));
  };

  const add = (user: User) => {
    const item: Recent = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
    };
    recent.value = [item, ...recent.value.filter((x) => x.id !== user.id)].slice(0, 5);
    save();
  };

  onMounted(load);

  return { recent, add };
};
