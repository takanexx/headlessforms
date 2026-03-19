# HeadlessForms

**UI/UXは完全に自由。アンケート設計・収集・分析APIプラットフォーム**

HeadlessFormsは、フォーム/アンケートのバックエンドをAPIとして提供するSaaSプラットフォームです。フロントエンドのUI/UXは開発者が自由に設計でき、データの保存・バリデーション・収集はHeadlessFormsが担います。Web/iOS/Android向けSDKも計画中です。

---

## 主な機能

- **ビジュアルフォームビルダー** — ドラッグ＆追加でフォームフィールドを構築。text / email / number / date / select / checkbox / radio / textarea に対応
- **JSONスキーマベースのフォーム定義** — フォーム構造をJSON配列で柔軟に管理
- **回答収集 & バリデーション** — サーバーサイドで型・フォーマット検証を実施
- **管理ダッシュボード** — フォーム一覧・回答一覧・使用量グラフをまとめて確認
- **プラン別利用制限** — Free / Pro / Business の3段階プランで作成数・月次回答数を管理
- **Stripe決済連携** — サブスクリプション型の組み込みチェックアウト
- **Google OAuth認証** — NextAuth v5 によるシームレスなログイン

---

## テックスタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript 5 (strict) |
| UI | React 19 + shadcn/ui (Radix UI) |
| スタイリング | Tailwind CSS v4 |
| ORM | Prisma 6 |
| データベース | PostgreSQL |
| 認証 | NextAuth v5 (Google OAuth) |
| フォーム | react-hook-form v7 + Zod v3 |
| 決済 | Stripe |
| テーブル | TanStack React Table v8 |
| チャート | Recharts v2 |
| テーマ | next-themes (ライト/ダーク) |

---

## ページ構成

| パス | 説明 |
|---|---|
| `/` | ランディングページ |
| `/login` | Googleログイン |
| `/pricing` | 料金プラン比較 |
| `/checkout` | Stripe決済ページ |
| `/admin` | ダッシュボード（使用量・グラフ） |
| `/admin/forms` | フォーム一覧 |
| `/admin/forms/create` | フォーム作成（フォームビルダー） |
| `/admin/forms/edit/[formId]` | フォーム編集 |
| `/admin/answers` | 回答一覧（絞り込み・日付フィルター） |
| `/admin/answers/[id]` | 回答詳細 |
| `/admin/account` | アカウント・請求情報 |

---

## API エンドポイント

| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/api/form/create` | POST | フォーム作成（プラン上限あり） |
| `/api/form/list` | GET | フォーム一覧取得 |
| `/api/form/retrieve` | POST | フォーム単体取得 |
| `/api/form/update` | POST | フォーム更新 |
| `/api/form/delete` | POST | フォーム削除 |
| `/api/answer/create` | POST | 回答送信（バリデーション・月次上限あり） |
| `/api/answer/list` | GET | 回答一覧取得 |
| `/api/answer/[id]` | GET | 回答単体取得 |
| `/api/user/update` | POST | ユーザープラン更新 |
| `/api/checkout/create-session` | POST | Stripeチェックアウトセッション作成 |

### プラン別制限

| プラン | 月額 | フォーム数上限 | 月次回答数上限 |
|---|---|---|---|
| Free | 無料 | 3 | 100 |
| Pro | $19 | 10 | 1,000 |
| Business | $99 | 無制限 | 無制限 |

---

## データベーススキーマ

| モデル | 用途 |
|---|---|
| `User` | ユーザー情報・プラン |
| `Form` | フォーム定義（JSONスキーマ） |
| `Answer` | フォーム回答（JSONデータ） |
| `Account` / `Session` / `VerificationToken` | NextAuth 認証関連 |

---

## 環境構築

### 必要な環境変数

```env
# PostgreSQL
POSTGRES_PRISMA_URL=...         # 接続プールURL
POSTGRES_URL_NON_POOLING=...    # 直接接続URL

# NextAuth (Google OAuth)
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...

# Stripe
STRIPE_SECRET=...

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# データベースのマイグレーション
npx prisma migrate dev

# Prismaクライアントの生成
npx prisma generate
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

---

## スクリプト

```bash
npm run dev    # 開発サーバー起動
npm run build  # プロダクションビルド
npm run start  # プロダクションサーバー起動
npm run lint   # ESLint 実行
```

---

## デプロイ

[Vercel](https://vercel.com) へのデプロイを推奨します。環境変数を Vercel ダッシュボードで設定してください。
