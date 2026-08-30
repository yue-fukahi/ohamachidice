# CLAUDE.md

OHAMACHI DICE は NKODICE をリスペクトして作られたサイコロゲーム。Next.js + TypeScript + MUI の静的サイトで、GitHub Pages で公開している。

人間が手で行う作業（Node.js の用意、draw.io での素材編集、GitHub Pages の設定）は [DEVELOPMENT.md](./DEVELOPMENT.md) にまとめてある。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm ci` | 依存関係のインストール（`package-lock.json` どおり） |
| `npm run dev` | 開発サーバー起動（<http://localhost:11451>） |
| `npm run lint` | ESLint（Flat Config / `eslint-config-next` ベース） |
| `npm run build` | `next build`。`output: "export"` により静的ファイルを `out/` に出力 |

Node.js は 24.19.0（`package.json` の `volta` で固定）。ビルドは Turbopack（Next.js 16 の既定）。

## バージョンを上げるときの注意

最新版にできない依存がある。理由なしに上げないこと。

- **TypeScript は 6 系に固定**（7 系は不可）。`typescript-eslint` が TS 7.0 API に未対応で、`npm run lint` が起動時に失敗する。
- **ESLint は 9 系に固定**（10 系は不可）。`eslint-config-next` が同梱する `typescript-eslint` 8 系のスコープマネージャが ESLint 10 と非互換で、`scopeManager.addGlobals is not a function` になる。

## ディレクトリ構成

```
src/
├── pages/         Next.js のページ（_app.tsx, index.tsx）
├── components/    Atomic Design 構成
│   ├── atoms/       faceImage, title, ohamachiButton
│   ├── molecules/   dice
│   └── organisms/   playField
├── hooks/         useDiceMaker, useDiceBox, useRoleCalculation
├── models/        diceBox, hand
├── constants/     face, handList, handName
└── styles/        MUI のテーマ定義
styles/            グローバル CSS / CSS Modules
assets/            画像素材の原本（.drawio。サイトには配信しない）
public/            そのまま配信される静的ファイル（.svg / .png / favicon）
out/               ビルド成果物（gitignore 済み。手で編集しない）
.github/workflows/ GitHub Pages へのデプロイ
```

- コンポーネントを追加するときは Atomic Design の粒度に合わせて `atoms` / `molecules` / `organisms` に置く。
- `public/*.svg` は `@svgr/webpack` により React コンポーネントとして import される。SVG そのものは編集せず、`assets/*.drawio` からの書き出しを前提にする。
- `.drawio` は原本であってサイトに配信する必要がないため、`public/` ではなく `assets/` に置く。
- `out/` はビルド成果物なので、ここへの直接の変更は次のビルドで失われる。リポジトリにはコミットしない。
- SVG は Turbopack の `turbopack.rules`（`next.config.js`）で `@svgr/webpack` に流している。

## コードスタイル

`.editorconfig` に従う（UTF-8 / LF / スペース 2 つ / 末尾の空白を削除）。

## デプロイ

`main` に push すると `.github/workflows/deploy.yml` が走り、ビルドして GitHub Pages に配信する。**手動のビルドや成果物のコミットは不要。**

ワークフローの中身: `npm ci` → `npm run lint` → `npm run build` → `actions/upload-pages-artifact`（`out/`）→ `actions/deploy-pages`。

`next.config.js` では、本番ビルド（`NODE_ENV=production`）のときだけ `basePath` / `assetPrefix` を `/ohamachidice` にしている。GitHub Pages のプロジェクトページが `https://yue-fukahi.github.io/ohamachidice/` 配下で配信されるため。開発サーバーはルート直下で動く。

### リリース時

1. `package.json` の `version` を更新する
2. `📦 vX.Y.Z` としてコミットして push する（デプロイは Actions がやる）

## コミットメッセージ

先頭に絵文字を付けて種別を表す。

| 絵文字 | 用途 |
| --- | --- |
| ✨ | 機能追加・仕様変更 |
| 🧹 | リファクタリング・整理 |
| 🔧 | 設定変更・依存パッケージの更新 |
| 📝 | ドキュメントの追加・更新 |
| 📦 | バージョンリリース |

作業途中のコミットには `[WIP]` を付ける。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
