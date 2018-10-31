---
title: VuePressにVuetifyを導入
date: 2018-11-01
description: Vuetify導入でハマった点など
category: DEVELOPMENT
image: img/development/vuepress-logo.png
---

## {{ $page.frontmatter.title }}

### やりたかったこと
Vue.js + Vuetify の開発経験があったのでVuePressでもVuetifyを使えるようにしたかった。

### ハマった点
1. 公式リファレンスなどを見て使えるようになったけど`vuepress build`でエラーになる。
2. Markdownのコードブロック表示がおかしい

### 解決方法
1. enhanceApp.jsでimportするときに相対パスでnode_modules内を指定するようにしてやればいい。  
``` js
 // enhanceApp.js
import Vuetify from '../../../node_modules/vuetify'
import '../../../node_modules/vuetify/dist/vuetify.min.css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.css'
```
[参考issue](https://github.com/vuejs/vuepress/issues/451)

2. Vuetifyのcssが影響して表示が崩れていた。  
スタイル設定を上書きして調整してみたが対策不十分:innocent:

---
### 経緯など
Vuetify自体は使ったことあったので、さくっとやろうと考えていたら思いのほか時間を使ってしまいました。  

まずはVuetifyのインストール。
```
npm install --save vuetify
```

で、どうやって使うか調べてたら公式リファレンスに[App Level Enhancements](https://vuepress.vuejs.org/theme/writing-a-theme.html#app-level-enhancements)というのがあったので参考に設定。

``` JavaScript
 // enhanceApp.js
 // これだとbuild時にエラーになります
import Vuetify from 'vuetify'
import 'vuetify.min.css'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(Vuetify)
}
```

それから、Vuetifyを有効にするのは`<v-app>`タグで囲んでやる必要があります。
全体を囲んであげればいいのでLayout.vueに追記してやればいいでしょう。
``` html
<!-- .vuepress/theme/Layout.vue -->
<template>
  <v-app>   <!-- 追加 -->
  <!-- 省略 -->
  </v-app>  <!-- 追加 -->
</template>
```

`vuepress dev`の場合はこれでいけましたが、`vuepress build`してみたらエラーになってしまいました。
調べてみると以下のようなissueを発見。

[Error: Cannot find module #443](https://github.com/vuejs/vuepress/issues/443)

この人はvue-carousel-3dっていうのを使いたかったようだけど現象は同じくbuild時にエラーになるというもの。
どうもimport対象を相対パスで指定すればいけるようなので以下のように変更。

``` js
 // enhanceApp.js
 // こうすればdevもbuildもいけます
import Vuetify from '../../../node_modules/vuetify'
import '../../../node_modules/vuetify/dist/vuetify.min.css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.css'
```

CSSも当てておかないと一部コンポーネントが表示されないです。
``` js
// config.js
module.exports = {
    head: [
      ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
    ],
}
```

というわけで、めでたくVuetifyが使えるようになりました:smiley_cat:

issueのコメントに
> Oh, it's truly an issue, I reproduced it.
>
> For now, you can use relative path to get a quick fix:

とあるので、バージョンが進めば相対パスの指定が必要なくなりそうですね。

### コードブロックの表示が崩れた
これで解決だーと思ってこの記事を書いていたら、なんかコードブロックの表示がおかしいことに気づきました。なんてこったと思い調べてみたらVuetifyのcssが影響していることがわかりました。  
ひとまず一部スタイルを上書きしてパッと見いい感じに調整しましたが、十分ではなさそうです。
わかっている課題としては一行が長くなった時に横スクロールバーが表示されるはずが出てこないです。ほかにもあるかもしれないので調査が必要ですが、とりあえずはこれで公開しときます。

やったこととしては、関連してそうなスタイルをvuetify.cssから抜き出して初期化。
フォントはvuepressのtheme.stylのものを再適用。

``` css
code,
kbd,
pre,
samp {
  font-family: initial;
}

code,
kbd {
  display: initial;
  border-radius: initial;
  /* white-space: initial; */
  font-size: initial;
  font-weight: initial;
}
code:after,
kbd:after,
code:before,
kbd:before {
  content: initial;
  letter-spacing: initial;
}
code {
  background-color: initial;
  color: initial;
  box-shadow: initial;
}
kbd {
  background: initial;
  color: initial;
}

code, kbd, .line-number{
  font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace
}

```

きちんと調べて解決するか、Vuetify導入をやめるか悩みどころです。
