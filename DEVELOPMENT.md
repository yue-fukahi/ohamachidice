# 開発ガイド

個人開発のためのメモ。**自分が手を動かす必要のある作業**だけをまとめている。
コマンドやディレクトリ構成、デプロイの仕組み、コミットの規約は Claude 向けの [CLAUDE.md](./CLAUDE.md) に書いてある。

## 環境の用意（新しいマシンでの初回のみ）

Node.js 24.19.0 が必要。バージョンは `package.json` の `volta` フィールドで固定している。

```bash
curl https://get.volta.sh | bash   # 未インストールなら
git clone https://github.com/yue-fukahi/ohamachidice.git
cd ohamachidice
npm ci
```

Volta を入れておけばリポジトリに入った時点で自動的に 24.19.0 へ切り替わる。使わない場合は手動で同じバージョンを用意する。

## 動作確認

```bash
npm run dev
```

<http://localhost:11451> をブラウザで開く。ダイスの見た目や当たり判定、レスポンシブの挙動は実際に触らないと分からないので、変更後はここで確認する。

開発サーバーは `basePath` が空でルート直下で動く。本番（`https://yue-fukahi.github.io/ohamachidice/`）とはパスが違うため、リンクや画像パスの問題は本番でしか出ないことがある。本番と同じ条件で確かめたいときは:

```bash
npm run build
npx serve out   # /ohamachidice 付きのパスで配信される点に注意
```

## 出目の絵柄を変更する

`public/` の SVG は [draw.io](https://app.diagrams.net/) で作成している。原本の `.drawio` は `assets/` に置いてある（サイトに配信しないため `public/` から出した）。

1. `assets/*.drawio` を draw.io で開いて編集する
2. 同名の `.svg` として `public/` に書き出す

`.svg` を直接編集すると次に `.drawio` から書き出したときに上書きされるので、必ず原本の `.drawio` を直す。

## デプロイ

`main` に push すれば GitHub Actions がビルドして公開する。手作業は push だけ。

進捗と失敗はリポジトリの **Actions** タブで確認する。反映は push から 1〜2 分程度。

### GitHub Pages の設定

リポジトリの Settings → Pages が以下になっていることが前提。

- **Source: GitHub Actions**

以前の「Deploy from a branch (`main` / `/docs`)」から変更が必要。ビルド成果物 (`docs/`) をコミットする運用はやめたため、この設定のままだとデプロイされない。

## TODO

積み残しは [.todo](./.todo) に書いてある。
