# CLAUDE.md

OHAMACHI DICE は NKODICE をリスペクトして作られたサイコロゲーム。Next.js + TypeScript + MUI の静的サイトで、GitHub Pages で公開している。

人間が手で行う作業（Node.js の用意、draw.io での素材編集、GitHub Pages の設定）は [DEVELOPMENT.md](./DEVELOPMENT.md) にまとめてある。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm ci` | 依存関係のインストール（`package-lock.json` どおり） |
| `npm run dev` | 開発サーバー起動（<http://localhost:11451>） |
| `npm run lint` | ESLint（`eslint-config-next` ベース） |
| `npm run build` | `next build && next export -o docs`。静的ファイルを `docs/` に出力 |

Node.js は 16.14.0（`package.json` の `volta` で固定）。

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
public/            画像素材（.drawio が原本、.svg が書き出し）
docs/              ビルド成果物（GitHub Pages の公開ディレクトリ。手で編集しない）
```

- コンポーネントを追加するときは Atomic Design の粒度に合わせて `atoms` / `molecules` / `organisms` に置く。
- `public/*.svg` は `@svgr/webpack` により React コンポーネントとして import される。SVG そのものは編集せず、`.drawio` からの書き出しを前提にする。
- `docs/` はビルド成果物なので、ここへの直接の変更は次のビルドで失われる。

## コードスタイル

`.editorconfig` に従う（UTF-8 / LF / スペース 2 つ / 末尾の空白を削除）。

## デプロイ手順

GitHub Pages（`main` ブランチの `/docs` ディレクトリ）で配信している。CI はなく、ビルド成果物をリポジトリにコミットする運用。

1. `npm run build` を実行する。
   `.env.production` の `URL_PREFIX=ohamachidice` が読み込まれ、`next.config.js` で `basePath` / `assetPrefix` が `/ohamachidice` になる（プロジェクトページが `https://yue-fukahi.github.io/ohamachidice/` 配下で配信されるため）。
2. `docs/.nojekyll` が残っているか確認する。GitHub Pages の Jekyll がアンダースコア始まりの `docs/_next/` を無視してしまうため必須。消えていたら `git checkout docs/.nojekyll` で復元する。
3. `git add docs` してコミットし、`main` に push する。

### リリース時

1. `package.json` の `version` を更新する
2. `npm run build` でビルドする
3. ソース変更とビルド成果物をまとめて `📦 vX.Y.Z` としてコミットする

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
