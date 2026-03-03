# Nuxt機能　利用状況チェック表

### プロジェクト基本情報

- リポジトリ：`components-learning`
- Nuxtバージョン：`3.33.1`
- Nodeバージョン：`v20.19.0`
- パッケージマネージャー：`npm`
- 主要モジュール：
  - `@nuxt/eslint`
  - `prettier`
- デプロイ形式：未設定（ローカル学習用）

## 1. ルーティング / ページ

| 分類 | 項目                               | 使用 | メモ                                                    |
| ---- | ---------------------------------- | ---- | ------------------------------------------------------- |
| Nuxt | `pages/`ファイルベースルーティング | ✅   | `src/pages/users/index.vue`, `src/pages/users/[id].vue` |
| Nuxt | 動的ルート（`[id].vue`）           | ✅   | `src/pages/users/[id].vue`                              |
| Nuxt | catch-all（`[...slug.vue]`）       | ❌   | 該当ファイルなし                                        |
| Nuxt | `<NuxtLink>`                       | ❌   | 使用せず、`<a>` + `router.push()`で遷移                 |
| Nuxt | `navigateTo()`                     | ❌   | 使用なし                                                |
| Vue  | `useRoute()`                       | ✅   | `src/pages/users/[id].vue` で `route.params.id` 参照    |
| Vue  | `useRouter()`                      | ✅   | `UserListContainer.vue`, `UserDetailContainer.vue`      |
| Nuxt | `definePageMeta()`                 | ❌   | 使用なし                                                |
| Nuxt | 404NotFound ハンドリング           | ❌   | `error.vue` / 404専用ページ未実装                       |

## 2. レイアウト / app.vue

| 分類 | 項目                         | 使用 | メモ                                    |
| ---- | ---------------------------- | ---- | --------------------------------------- |
| Nuxt | `layout/default.vue`         | ❌   | `layout/` ディレクトリなし              |
| Nuxt | 複数レイアウト               | ❌   | レイアウト機能未使用                    |
| Nuxt | `definePageMeta({ layout })` | ❌   | 使用なし                                |
| Nuxt | `app.vue` 利用               | ✅   | `NuxtRouteAnnouncer`, `NuxtPage` を配置 |
| Nuxt | `error.vue` （グローバル）   | ❌   | ファイル未作成                          |

## 3. データ取得（SSR/CSR）

| 分類 | 項目                        | 使用 | メモ                                                            |
| ---- | --------------------------- | ---- | --------------------------------------------------------------- |
| Nuxt | `useFetch()`                | ❌   | 使用なし                                                        |
| Nuxt | `useAsyncData()`            | ✅   | `UserListContainer.vue`, `UserDetailContainer.vue`              |
| Nuxt | `$fetch` （直接呼び）       | ❌   | 使用なし（ダミーRepository呼び出し）                            |
| Nuxt | `refresh()` （再取得）      | ❌   | 使用なし                                                        |
| Vue  | `pending/error`をUIに反映   | ✅   | `loading`, `error` を `UserListView/UserDetailView` に受け渡し  |
| Nuxt | `server: false` （CSR限定） | ❌   | `useAsyncData` オプション未使用                                 |
| Nuxt | `lazy: true` （遅延取得）   | ❌   | `useAsyncData` オプション未使用                                 |
| Nuxt | key指定                     | ✅   | `user_list`, `user_detail_${props.id}`                          |
| Vue  | キャッシュ/再利用戦略       | ✅   | `useAsyncData` の key で再利用、`useRecentUsers` で最近閲覧保持 |

## 4. 状態管理

| 分類 | 項目                       | 使用 | メモ                                            |
| ---- | -------------------------- | ---- | ----------------------------------------------- |
| Nuxt | `useState()`               | ❌   | 使用なし                                        |
| 外部 | Pinia導入（`@pinia/nuxt`） | ❌   | `package.json` に依存なし                       |
| 外部 | `stores/`配下のstore定義   | ❌   | `stores/` ディレクトリなし                      |
| 外部 | storeのaction / getter利用 | ❌   | store自体未導入                                 |
| 外部 | 永続化（localStorage等）   | ✅   | `useRecentUsers.ts` で `localStorage` 利用      |
| Vue  | SSR意識した初期化          | ✅   | `import.meta.client` ガードと `onMounted(load)` |

## 5. Composables / Utils

| 分類 | 項目                      | 使用 | メモ                                                  |
| ---- | ------------------------- | ---- | ----------------------------------------------------- |
| Nuxt | `composables/` 自動import | ❌   | `src/.../composables` は手動importで利用              |
| Vue  | 共通APIクライアント       | ❌   | `userRepository.ts`（ダミーDB）を直接呼び出し         |
| Vue  | フォーマッター            | ✅   | `domain/user.ts` の `normalizeName`, `normalizeEmail` |
| Vue  | 権限チェック              | ❌   | 実装なし                                              |
| Vue  | utils/helpers方針         | ✅   | 汎用処理を `src/shared/utils/sleep.ts` に分離         |

## 6. Plugins / Inject

| 分類 | 項目                 | 使用 | メモ                        |
| ---- | -------------------- | ---- | --------------------------- |
| Nuxt | `plugins/\*.ts`      | ❌   | `plugins/` ディレクトリなし |
| Nuxt | `defineNuxtPlugin()` | ❌   | 使用なし                    |
| Nuxt | `useNuxtApp()`       | ❌   | 使用なし                    |
| Nuxt | client only plugin   | ❌   | 使用なし                    |
| Nuxt | `$xxx`注入           | ❌   | 使用なし                    |

## 7. サーバー機能（Nitro）

| 分類 | 項目                        | 使用 | メモ                                  |
| ---- | --------------------------- | ---- | ------------------------------------- |
| Nuxt | `server/api/*.ts`           | ❌   | `server/` 配下は `tsconfig.json` のみ |
| Nuxt | `defineEventHandler()`      | ❌   | 使用なし                              |
| Nuxt | `getQuery()` / `readBody()` | ❌   | 使用なし                              |
| Nuxt | cookie操作                  | ❌   | 使用なし                              |
| Nuxt | `server/middleware`         | ❌   | ディレクトリ未作成                    |
| 外部 | 外部APIプロキシ             | ❌   | 実装なし                              |

## 8. ミドルウェア

| 分類 | 項目                        | 使用 | メモ                           |
| ---- | --------------------------- | ---- | ------------------------------ |
| Nuxt | middleware/\*.ts            | ❌   | `middleware/` ディレクトリなし |
| Nuxt | defineNuxtRouteMiddleware() | ❌   | 使用なし                       |
| Nuxt | 認証ガード                  | ❌   | 実装なし                       |
| Nuxt | 権限ガード                  | ❌   | 実装なし                       |

## 9. 設定 / 環境変数

| 分類 | 項目                 | 使用 | メモ                                              |
| ---- | -------------------- | ---- | ------------------------------------------------- |
| Nuxt | `nuxt.config.ts`     | ✅   | `modules`, `dir.pages`, `devtools` を設定         |
| Nuxt | `runtimeConfig`      | ❌   | 設定なし                                          |
| Nuxt | `useRuntimeConfig()` | ❌   | 使用なし                                          |
| 外部 | env切替              | ❌   | `.env` / 環境別設定なし                           |
| Nuxt | alias等              | ✅   | `~` エイリアス利用、`dir.pages` で pages 位置変更 |

## 10. SEO / Head

| 分類 | 項目               | 使用 | メモ                                          |
| ---- | ------------------ | ---- | --------------------------------------------- |
| Nuxt | `useHead()`        | ❌   | 使用なし                                      |
| Nuxt | `useSeoMeta`       | ✅   | `src/pages/users/index.vue`                   |
| Nuxt | 動的OGP            | ❌   | 実装なし                                      |
| Nuxt | canonical / robots | ✅   | `public/robots.txt` を配置（canonical未設定） |

## 11. コンポーネント運用

| 分類 | 項目                     | 使用 | メモ                                                             |
| ---- | ------------------------ | ---- | ---------------------------------------------------------------- |
| Nuxt | `components/` 自動import | ❌   | すべて明示import（`~/src/...`）                                  |
| Vue  | Base/Feature分離         | ✅   | `src/shared/components` と `src/features/user/components` を分離 |
| Vue  | 命名規則（multi-word）   | ✅   | `BaseButton`, `UserDetailContainer` 等で統一                     |
| 外部 | UIライブラリ利用         | ❌   | 外部UIライブラリ未導入                                           |

## 12. スタイリング / アセット

| 分類 | 項目             | 使用 | メモ                                      |
| ---- | ---------------- | ---- | ----------------------------------------- |
| Nuxt | `assets` 利用    | ❌   | `assets/` ディレクトリなし                |
| Nuxt | `public` 利用    | ✅   | `public/robots.txt`, `public/favicon.ico` |
| 外部 | Tailwind         | ❌   | 導入なし                                  |
| Vue  | デザイントークン | ❌   | 共通トークン設計なし                      |
| Vue  | ダークモード     | ❌   | 実装なし                                  |

## 13. エラーハンドリング

| 分類 | 項目                  | 使用 | メモ                                        |
| ---- | --------------------- | ---- | ------------------------------------------- |
| Nuxt | `createError()`       | ❌   | 使用なし                                    |
| Nuxt | `showError()`         | ❌   | 使用なし                                    |
| Nuxt | `error.vue`           | ❌   | ファイル未作成                              |
| Vue  | 共通処理（toaster等） | ✅   | `src/shared/composables/useToast.ts` を利用 |

## 14. ビルド / デプロイ

| 分類 | 項目                 | 使用 | メモ                                             |
| ---- | -------------------- | ---- | ------------------------------------------------ |
| Nuxt | SSR                  | ✅   | Nuxtデフォルト（`ssr: false` 指定なし）          |
| Nuxt | SSG（generate）      | ✅   | `package.json` に `nuxt generate` スクリプトあり |
| Nuxt | Hybrid（routeRules） | ❌   | `routeRules` 未設定                              |
| Nuxt | `routeRules`         | ❌   | `nuxt.config.ts` に記述なし                      |
| 外部 | ホスティング         | ❌   | 設定・記載なし                                   |

## 15. 品質

| 分類 | 項目              | 使用 | メモ                                     |
| ---- | ----------------- | ---- | ---------------------------------------- |
| 外部 | ESLint            | ✅   | `@nuxt/eslint` 導入、`npm run lint` あり |
| 外部 | Prettier          | ✅   | `prettier` と `.prettierrc.cjs` あり     |
| 外部 | TypeScript        | ✅   | `tsconfig.json` と `lang="ts"` 利用      |
| 外部 | Vitest            | ❌   | 依存・設定なし                           |
| 外部 | E2E               | ❌   | 設定なし                                 |
| 外部 | Husky/lint-staged | ❌   | 設定なし                                 |
| 外部 | CI                | ❌   | `.github/workflows` 等なし               |
