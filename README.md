# Prime Factor Heroes (素因数分解ゲーム)

Prime Factor Heroesは、素因数分解を楽しく学べる教育的なWebゲームです。プレイヤーは与えられた数を順番に素因数分解していき、数学的思考力を養うことができます。

![ゲーム画面のスクリーンショット]

## 特徴

- RPG風の進行システム（ステージ制）
- 段階的に難しくなる問題設定
- アニメーション効果
- HP/スコアシステム
- レスポンシブデザイン

## ゲームの遊び方

1. 画面に表示される数（ターゲット数）を確認します
2. その数を割り切れる素数カードを選択します
3. 正しい素数を選ぶと、数が小さくなっていきます
4. 最終的に1まで分解できるとステージクリア！
5. 間違った素数を選ぶと、その数値分のダメージを受けます

## 難易度システム

- **ステージ1-3**: 2〜17の素数から2つを組み合わせた問題
- **ステージ4-6**: 2〜17の素数から3つを組み合わせた問題
- **ステージ7-9**: 7〜23の素数から3つを組み合わせた問題
- **ステージ10-12**: 7〜23の素数から4つを組み合わせた問題
- **ステージ13-15**: 2〜37の素数から4つを組み合わせた問題
- **ステージ16以降**: 2〜37の素数から5つを組み合わせた問題

## 技術スタック

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## プロジェクト構成
prime-factor-heroes/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/        # 再利用可能なUIコンポーネント
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── game/      # ゲーム固有のコンポーネント
│   │       ├── GameBoard.tsx     # メインのゲームボード
│   │       ├── InputArea.tsx     # 素数入力エリア
│   │       ├── NumberDisplay.tsx # 数値表示
│   │       ├── PrimeCard.tsx     # 素数カード
│   │       ├── StatusBar.tsx     # ステータスバー
│   │       └── GameOver.tsx      # ゲームオーバー画面
│   ├── lib/
│   │   ├── gameLogic.ts    # ゲームのコアロジック
│   │   ├── gameQuestions.ts # 問題生成ロジック
│   │   └── utils.ts        # ユーティリティ関数
│   ├── types/
│   │   └── game.ts         # 型定義
│   └── styles/
│       └── globals.css
├── public/
│   └── assets/            # 画像やアイコン
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md

## ローカルでの開発

```bash
# リポジトリのクローン
git clone https://github.com/poposuke18/sosu.git
cd sosu

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

デプロイ
このプロジェクトはVercelにデプロイされています。
プレイはこちら ※デプロイ後にURLを追加
今後の開発予定

 BGMと効果音の追加
 ボス戦の実装
 アイテムシステム（HP回復など）
 ヒント機能
 ハイスコアの保存機能
 モバイル対応の強化

コントリビューション
バグ報告や機能改善の提案は、GitHubのIssueやPull Requestsで受け付けています。
ライセンス
MITライセンス
作者
poposuke18

Made with ♥ by poposuke18