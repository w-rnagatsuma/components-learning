import { sleep } from '../../../shared/utils/sleep';
import type { User, UserId, UserUpdateInput } from '../types/user';
import { toNormalizedUpdate } from '../domain/user';

const nowIso = () => new Date().toISOString();

// ダミーDB
const DB: User[] = [
  {
    id: '1',
    firstName: '太郎',
    lastName: '山田',
    email: 'taro.yamada@example.com',
    updatedAt: nowIso(),
  },
  {
    id: '2',
    firstName: '花子',
    lastName: '鈴木',
    email: 'hanako.suzuki@example.com',
    updatedAt: nowIso(),
  },
  {
    id: '3',
    firstName: '次郎',
    lastName: '佐藤',
    email: 'jiro.sato@example.com',
    updatedAt: nowIso(),
  },
  {
    id: '4',
    firstName: '美咲',
    lastName: '高橋',
    email: 'misaki.takahashi@example.com',
    updatedAt: nowIso(),
  },
];

export const userRepository = {
  async list(query: { q?: string }): Promise<User[]> {
    await sleep(250); // 疑似的な遅延
    const q = (query.q ?? '').trim().toLowerCase();
    if (!q) return [...DB];
    return DB.filter((user) => {
      const hay = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      return hay.includes(q);
    });
  },

  async get(id: UserId): Promise<User> {
    await sleep(250); // 疑似的な遅延
    const user = DB.find((u) => u.id === id);
    if (!user) throw new Error('ユーザーが見つかりません');
    return { ...user };
  },

  async update(id: UserId, input: UserUpdateInput): Promise<User> {
    await sleep(250); // 疑似的な遅延
    const idx = DB.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('ユーザーが見つかりません');
    const normalized = toNormalizedUpdate(input);
    DB[idx] = {
      ...DB[idx],
      ...normalized,
      updatedAt: nowIso(),
    };
    return { ...DB[idx] };
  },
};
