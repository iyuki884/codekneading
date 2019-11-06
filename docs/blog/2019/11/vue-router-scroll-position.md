---
date: 2019-11-06
description: ブラウザバック時の挙動でハマった
category: DEVELOPMENT
image: img/development/vue-router-scroll-sample.jpg
sidebar: auto
---

# Vue Router で画面遷移時のスクロール位置制御

## 概要
- ブラウザバック時にスクロール位置が期待した通りにならなかった
- 公式リファレンスに書いてある内容で解決できた

[スクロールの振る舞い](https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html)

## デフォルトの場合
縦方向に長いページが2つある場合の話です。
例えば、アイテムの一覧画面`/list`と各アイテムの詳細画面`/list/:id`みたいな構成としましょう。
一覧画面のリンクから詳細画面へ遷移することができます。

![sample](/img/development/vue-router-scroll-sample.jpg "vue router scroll sample")

一覧画面で下方向にスクロールした状態で画面遷移すると、詳細画面もスクロールされた状態で表示されます。
これは、なんか気持ち悪いですね:confused:

詳細画面でスクロールした状態でブラウザバックした場合は、どうでしょう。
この場合は、一覧画面が先頭位置で表示されます。

## 画面遷移後は先頭位置で表示してほしい
一覧画面から詳細画面へ遷移した場合は、先頭位置で表示してほしいです。
そんな時は`scrollBehavior()`の出番です。
以下のようにすると画面遷移時は常に先頭位置で表示するようになります。

``` js
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

## 一覧画面に戻ったときは位置を覚えていてほしい
でも、一覧画面へブラウザバックした場合は、前回の表示位置に戻ってほしいです。
そんな時も`scrollBehavior()`でOKです:ok_hand:

``` js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

これで期待した動きになりました。

## ブラウザバック時に先頭に戻っちゃうんだけど？
と思ったら、なんか上手くいかない場合があるんですけど！

一覧画面に表示する項目もAPIから取得してたりすると、上記処理を入れても先頭位置で表示されてしまう場合があります。
これは、スクロール位置を制御したタイミングで画面描画が終わってないので発生しているっぽいです。

ならば、`created()`の終わりとかでスクロール位置を制御すればいいのでは？
と思ったものの、`scrollBehavior()`で返した`savedPosition`ってページコンポーネント側で受け取れるのかわからない！

じゃあ、storeとかlocalStorageに入れとく？めんどくさいー。どうしようー。
って思いながら公式リファレンス見てたら[非同期なスクローリング](https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html#%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%81%AA%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0)という項目を発見。
`setTimeOut()`で待ち時間を指定することで画面描画が終わってからスクロール位置制御させることができました。

厳密にやるには、ページコンポーネント側でごにょごにょする必要がありそうですが、とりあえずお手軽に解決できたので良しとします！:muscle:

最終的には以下のようにしました。

``` js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeOut(() => {
        resolve(savedPosition)
      })
    })
  } else {
    return { x: 0, y: 0 }
  }
}
```
