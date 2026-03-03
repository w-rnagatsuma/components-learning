# Nuxt機能　利用状況チェック表

### プロジェクト基本情報

- リポジトリ：`components-learning`
- Nuxtバージョン：`3.33.1`
- Nodeバージョン：`v20.19.0`
- パッケージマネージャー：`npm`
- 主要モジュール：
  - `@nuxt/eslint`
  - `prettier`
- デプロイ形式：

## 1. ルーティング / ページ

| 項目                               | 使用 | メモ |
| ---------------------------------- | ---- | ---- |
| `pages/`ファイルベースルーティング | ✅   |      |
| 動的ルート（`[id].vue`）           | ✅   |      |
| catch-all（`[...slug.vue]`）       | ❌   |      |
| `<NuxtLink>`                       | ✅   |      |
| `navigateTo()`                     | ❌   |      |
| `useRoute()`                       | ❌   |      |
| `useRouter()`                      | ❌   |      |
| `definePageMeta()`                 | ❌   |      |
| 404NotFound ハンドリング           | ❌   |      |

## 2. レイアウト / app.vue

| 項目                         | 使用 | メモ |
| ---------------------------- | ---- | ---- |
| `layout/default.vue`         | ✅   |
| 複数レイアウト               |      |
| `definePageMeta({ layout })` |      |
| `app.vue` 利用               |      |
| `error.vue` （グローバル）   |      |

## 3. データ取得（SSR/CSR）

| 項目                        | 使用 | メモ |
| --------------------------- | ---- | ---- |
| `useFetch()`                |      |
| `useAsyncData()`            |      |
| `$fetch` （直接呼び）       |      |
| `refresh()` （再取得）      |      |
| `pending/error`をUIに反映   |      |
| `server: false` （CSR限定） |      |
| `lazy: true` （遅延取得）   |      |
| key指定                     |      |
| キャッシュ/再利用戦略       |      |

## 4. 状態管理

| 項目                       | 使用 | メモ |
| -------------------------- | ---- | ---- |
| `useState()`               |      |
| Pinia導入（`@pinia/nuxt`） |      |
| `stores/`配下のstore定義   |      |
| storeのaction / getter利用 |      |
| 永続化（localStorage等）   |      |
| SSR意識した初期化          |      |

## 5. Composables / Utils

| 項目                      | 使用 | メモ |
| ------------------------- | ---- | ---- |
| `composables/` 自動import |      |
| 共通APIクライアント       |      |
| フォーマッター            |      |
| 権限チェック              |      |
| utils/helpers方針         |      |

## 6. Plugins / Inject

| 項目                 | 使用 | メモ |
| -------------------- | ---- | ---- |
| `plugins/\*.ts`      |      |
| `defineNuxtPlugin()` |      |
| `useNuxtApp()`       |      |
| client only plugin   |      |
| `$xxx`注入           |      |

## 7. サーバー機能（Nitro）

| 項目                        | 使用 | メモ |
| --------------------------- | ---- | ---- |
| `server/api/*.ts`           |      |
| `defineEventHandler()`      |      |
| `getQuery()` / `readBody()` |      |
| cookie操作                  |      |
| `server/middleware`         |      |
| 外部APIプロキシ             |      |

## 8. ミドルウェア

| 項目                        | 使用 | メモ |
| --------------------------- | ---- | ---- |
| middleware/\*.ts            |      |
| defineNuxtRouteMiddleware() |      |
| 認証ガード                  |      |
| 権限ガード                  |      |

## 9. 設定 / 環境変数

| 項目               | 使用 | メモ |
| ------------------ | ---- | ---- |
| `nuxt.config.ts`   |      |
| `runtimeConfig     |      |
| useRuntimeConfig() |      |
| env切替            |      |
| alias等            |      |

## 10. SEO / Head

| 項目               | 使用 | メモ |
| ------------------ | ---- | ---- |
| `useHead()`        |      |
| `useSeoMeta`       |      |
| 動的OGP            |      |
| canonical / robots |      |

## 11. コンポーネント運用

| 項目                     | 使用 | メモ |
| ------------------------ | ---- | ---- |
| `components/` 自動import |      |
| Base/Feature分離         |      |
| 命名規則（multi-word）   |      |
| UIライブラリ利用         |      |

## 12. スタイリング / アセット

| 項目             | 使用 | メモ |
| ---------------- | ---- | ---- |
| `assets` 利用    |      |
| `public` 利用    |      |
| Tailwind         |      |
| デザイントークン |      |
| ダークモード     |      |

## 13. エラーハンドリング

| 項目                  | 使用 | メモ |
| --------------------- | ---- | ---- |
| `createError()`       |      |
| `showError()`         |      |
| `error.vue`           |      |
| 共通処理（toaster等） |      |

## 14. ビルド / デプロイ

| 項目                 | 使用 | メモ |
| -------------------- | ---- | ---- |
| SSR                  |      |
| SSG（generate）      |      |
| Hybrid（routeRules） |      |
| `routeRules`         |      |
| ホスティング         |      |

## 15. 品質

| 項目              | 使用 | メモ |
| ----------------- | ---- | ---- |
| ESLint            |      |
| Prettier          |      |
| TypeScript        |      |
| Vitest            |      |
| E2E               |      |
| Husky/lint-staged |      |
| CI                |      |
