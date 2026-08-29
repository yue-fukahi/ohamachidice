# 開発ガイド

個人開発のためのメモ。**自分が手を動かす必要のある作業**だけをまとめている。
コマンドやディレクトリ構成、ビルド・デプロイの実行手順、コミットの規約は Claude 向けの [CLAUDE.md](./CLAUDE.md) に書いてある。

## 環境の用意（新しいマシンでの初回のみ）

Node.js 16.14.0 が必要。バージョンは `package.json` の `volta` フィールドで固定している。

```bash
curl https://get.volta.sh | bash   # 未インストールなら
git clone https://github.com/yue-fukahi/ohamachidice.git
cd ohamachidice
npm ci
```

Volta を入れておけばリポジトリに入った時点で自動的に 16.14.0 へ切り替わる。使わない場合は手動で同じバージョンを用意する。

## 動作確認

```bash
npm run dev
```

<http://localhost:11451> をブラウザで開く。ダイスの見た目や当たり判定、レスポンシブの挙動は実際に触らないと分からないので、変更後はここで確認する。

開発サーバーでは `URL_PREFIX` が未設定なので `basePath` が空になり、ルート直下で動く。本番（`https://yue-fukahi.github.io/ohamachidice/`）とはパスが違うため、リンクや画像パスの問題は本番でしか出ないことがある。

## 出目の絵柄を変更する

`public/` の SVG は [draw.io](https://app.diagrams.net/) で作成している。

1. `public/*.drawio` を draw.io で開いて編集する
2. 同名の `.svg` として同じ場所に書き出す

`.svg` を直接編集すると次に `.drawio` から書き出したときに上書きされるので、必ず原本の `.drawio` を直す。

## GitHub Pages の設定

リポジトリの Settings → Pages で以下の設定になっていることが前提。変更していなければ触る必要はない。

- Source: Deploy from a branch
- Branch: `main` / `/docs`

push 後、数十秒〜数分で <https://yue-fukahi.github.io/ohamachidice/> に反映される。反映されない、あるいは CSS が当たっていない場合は `docs/.nojekyll` が消えていないかを疑う。
