# 横綱への道（仮）

相撲部屋を経営し、弟子を育成して横綱を目指すブラウザゲームのプロトタイプです。

公開版: https://yokozuna-no-michi-game.basehika.workers.dev

## ローカル起動

静的サイトなので、`index.html` をブラウザで開くか、任意の静的HTTPサーバーでこのフォルダを配信してください。

## レビュー時の着眼点

- 参考画像に対するレトロゲーム／ドット絵表現の差
- スマホ縦持ち・横持ちでの操作性と可読性
- `game.js` と追加スクリプト群の状態管理、イベント処理、保守性
- 稽古・本場所・スカウト・巡業のゲームループ
- Cloudflare Workers Static Assetsへのデプロイ構成

## 主な構成

- `index.html`: 画面構造
- `game.js`, `season-loop.js`: 育成・本場所のゲームロジック
- `pixel-game.js`, `pixel-game.css`: 固定ゲーム画面
- `assets/`: 稽古場・本場所・タイトル画面の背景素材
- `wrangler.jsonc`: Cloudflare公開設定
