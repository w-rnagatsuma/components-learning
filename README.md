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

| 項目                               | 使用 | メモ                                                    |
| ---------------------------------- | ---- | ------------------------------------------------------- |
| `pages/`ファイルベースルーティング | ✅   | `src/pages/users/index.vue`, `src/pages/users/[id].vue` |
| 動的ルート（`[id].vue`）           | ✅   | `src/pages/users/[id].vue`                              |
| catch-all（`[...slug.vue]`）       | ❌   | 該当ファイルなし                                        |
| `<NuxtLink>`                       | ❌   | 使用せず、`<a>` + `router.push()`で遷移                 |
| `navigateTo()`                     | ❌   | 使用なし                                                |
| `useRoute()`                       | ✅   | `src/pages/users/[id].vue` で `route.params.id` 参照    |
| `useRouter()`                      | ✅   | `UserListContainer.vue`, `UserDetailContainer.vue`      |
| `definePageMeta()`                 | ❌   | 使用なし                                                |
| 404NotFound ハンドリング           | ❌   | `error.vue` / 404専用ページ未実装                       |

## 2. レイアウト / app.vue

| 項目                         | 使用 | メモ                                    |
| ---------------------------- | ---- | --------------------------------------- |
| `layout/default.vue`         | ❌   | `layout/` ディレクトリなし              |
| 複数レイアウト               | ❌   | レイアウト機能未使用                    |
| `definePageMeta({ layout })` | ❌   | 使用なし                                |
| `app.vue` 利用               | ✅   | `NuxtRouteAnnouncer`, `NuxtPage` を配置 |
| `error.vue` （グローバル）   | ❌   | ファイル未作成                          |

## 3. データ取得（SSR/CSR）

| 項目                        | 使用 | メモ                                                            |
| --------------------------- | ---- | --------------------------------------------------------------- |
| `useFetch()`                | ❌   | 使用なし                                                        |
| `useAsyncData()`            | ✅   | `UserListContainer.vue`, `UserDetailContainer.vue`              |
| `$fetch` （直接呼び）       | ❌   | 使用なし（ダミーRepository呼び出し）                            |
| `refresh()` （再取得）      | ❌   | 使用なし                                                        |
| `pending/error`をUIに反映   | ✅   | `loading`, `error` を `UserListView/UserDetailView` に受け渡し  |
| `server: false` （CSR限定） | ❌   | `useAsyncData` オプション未使用                                 |
| `lazy: true` （遅延取得）   | ❌   | `useAsyncData` オプション未使用                                 |
| key指定                     | ✅   | `user_list`, `user_detail_${props.id}`                          |
| キャッシュ/再利用戦略       | ✅   | `useAsyncData` の key で再利用、`useRecentUsers` で最近閲覧保持 |

## 4. 状態管理

| 項目                       | 使用 | メモ                                            |
| -------------------------- | ---- | ----------------------------------------------- |
| `useState()`               | ❌   | 使用なし                                        |
| Pinia導入（`@pinia/nuxt`） | ❌   | `package.json` に依存なし                       |
| `stores/`配下のstore定義   | ❌   | `stores/` ディレクトリなし                      |
| storeのaction / getter利用 | ❌   | store自体未導入                                 |
| 永続化（localStorage等）   | ✅   | `useRecentUsers.ts` で `localStorage` 利用      |
| SSR意識した初期化          | ✅   | `import.meta.client` ガードと `onMounted(load)` |

## 5. Composables / Utils

| 項目                      | 使用 | メモ                                                  |
| ------------------------- | ---- | ----------------------------------------------------- |
| `composables/` 自動import | ❌   | `src/.../composables` は手動importで利用              |
| 共通APIクライアント       | ❌   | `userRepository.ts`（ダミーDB）を直接呼び出し         |
| フォーマッター            | ✅   | `domain/user.ts` の `normalizeName`, `normalizeEmail` |
| 権限チェック              | ❌   | 実装なし                                              |
| utils/helpers方針         | ✅   | 汎用処理を `src/shared/utils/sleep.ts` に分離         |

## 6. Plugins / Inject

| 項目                 | 使用 | メモ                        |
| -------------------- | ---- | --------------------------- |
| `plugins/\*.ts`      | ❌   | `plugins/` ディレクトリなし |
| `defineNuxtPlugin()` | ❌   | 使用なし                    |
| `useNuxtApp()`       | ❌   | 使用なし                    |
| client only plugin   | ❌   | 使用なし                    |
| `$xxx`注入           | ❌   | 使用なし                    |

## 7. サーバー機能（Nitro）

| 項目                        | 使用 | メモ                                  |
| --------------------------- | ---- | ------------------------------------- |
| `server/api/*.ts`           | ❌   | `server/` 配下は `tsconfig.json` のみ |
| `defineEventHandler()`      | ❌   | 使用なし                              |
| `getQuery()` / `readBody()` | ❌   | 使用なし                              |
| cookie操作                  | ❌   | 使用なし                              |
| `server/middleware`         | ❌   | ディレクトリ未作成                    |
| 外部APIプロキシ             | ❌   | 実装なし                              |

## 8. ミドルウェア

| 項目                        | 使用 | メモ                           |
| --------------------------- | ---- | ------------------------------ |
| middleware/\*.ts            | ❌   | `middleware/` ディレクトリなし |
| defineNuxtRouteMiddleware() | ❌   | 使用なし                       |
| 認証ガード                  | ❌   | 実装なし                       |
| 権限ガード                  | ❌   | 実装なし                       |

## 9. 設定 / 環境変数

| 項目                 | 使用 | メモ                                              |
| -------------------- | ---- | ------------------------------------------------- |
| `nuxt.config.ts`     | ✅   | `modules`, `dir.pages`, `devtools` を設定         |
| `runtimeConfig`      | ❌   | 設定なし                                          |
| `useRuntimeConfig()` | ❌   | 使用なし                                          |
| env切替              | ❌   | `.env` / 環境別設定なし                           |
| alias等              | ✅   | `~` エイリアス利用、`dir.pages` で pages 位置変更 |

## 10. SEO / Head

| 項目               | 使用 | メモ                                          |
| ------------------ | ---- | --------------------------------------------- |
| `useHead()`        | ❌   | 使用なし                                      |
| `useSeoMeta`       | ✅   | `src/pages/users/index.vue`                   |
| 動的OGP            | ❌   | 実装なし                                      |
| canonical / robots | ✅   | `public/robots.txt` を配置（canonical未設定） |

## 11. コンポーネント運用

| 項目                     | 使用 | メモ                                                             |
| ------------------------ | ---- | ---------------------------------------------------------------- |
| `components/` 自動import | ❌   | すべて明示import（`~/src/...`）                                  |
| Base/Feature分離         | ✅   | `src/shared/components` と `src/features/user/components` を分離 |
| 命名規則（multi-word）   | ✅   | `BaseButton`, `UserDetailContainer` 等で統一                     |
| UIライブラリ利用         | ❌   | 外部UIライブラリ未導入                                           |

## 12. スタイリング / アセット

| 項目             | 使用 | メモ                                      |
| ---------------- | ---- | ----------------------------------------- |
| `assets` 利用    | ❌   | `assets/` ディレクトリなし                |
| `public` 利用    | ✅   | `public/robots.txt`, `public/favicon.ico` |
| Tailwind         | ❌   | 導入なし                                  |
| デザイントークン | ❌   | 共通トークン設計なし                      |
| ダークモード     | ❌   | 実装なし                                  |

## 13. エラーハンドリング

| 項目                  | 使用 | メモ                                        |
| --------------------- | ---- | ------------------------------------------- |
| `createError()`       | ❌   | 使用なし                                    |
| `showError()`         | ❌   | 使用なし                                    |
| `error.vue`           | ❌   | ファイル未作成                              |
| 共通処理（toaster等） | ✅   | `src/shared/composables/useToast.ts` を利用 |

## 14. ビルド / デプロイ

| 項目                 | 使用 | メモ                                             |
| -------------------- | ---- | ------------------------------------------------ |
| SSR                  | ✅   | Nuxtデフォルト（`ssr: false` 指定なし）          |
| SSG（generate）      | ✅   | `package.json` に `nuxt generate` スクリプトあり |
| Hybrid（routeRules） | ❌   | `routeRules` 未設定                              |
| `routeRules`         | ❌   | `nuxt.config.ts` に記述なし                      |
| ホスティング         | ❌   | 設定・記載なし                                   |

## 15. 品質

| 項目              | 使用 | メモ                                     |
| ----------------- | ---- | ---------------------------------------- |
| ESLint            | ✅   | `@nuxt/eslint` 導入、`npm run lint` あり |
| Prettier          | ✅   | `prettier` と `.prettierrc.cjs` あり     |
| TypeScript        | ✅   | `tsconfig.json` と `lang="ts"` 利用      |
| Vitest            | ❌   | 依存・設定なし                           |
| E2E               | ❌   | 設定なし                                 |
| Husky/lint-staged | ❌   | 設定なし                                 |
| CI                | ❌   | `.github/workflows` 等なし               |
