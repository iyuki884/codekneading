---
date: 2018-11-01
update: 2018-12-29
description: Vuetify導入でハマった点など
category: DEVELOPMENT
image: img/development/vuepress-logo.png
sidebar: auto
---

# VuePressにVuetifyを導入

## やりたかったこと
Vue.js + Vuetify の開発経験があったのでVuePressでもVuetifyを使えるようにしたかった。

## ハマった点
1. 公式リファレンスなどを見て使えるようになったけど`vuepress build`でエラーになる。
2. Markdownのコードブロック表示がおかしい

## 解決方法
1. enhanceApp.jsでimportするときに相対パスでnode_modules内を指定するようにしてやればいい。  
``` js
 // enhanceApp.js
import Vuetify from '../../../node_modules/vuetify'
import '../../../node_modules/vuetify/dist/vuetify.min.css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.css'
```
[参考issue](https://github.com/vuejs/vuepress/issues/451)

2. Vuetifyのcssが影響して表示が崩れていた。  
~~スタイル設定を上書きして調整してみたが対策不十分:innocent:~~  
vuetify.cssをdocs内に移動して、不要そうな箇所を削除して使うようにした。これで万事OKかは不明:upside_down_face:

---
## 経緯など
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

## コードブロックの表示が崩れた
これで解決だーと思ってこの記事を書いていたら、なんかコードブロックの表示がおかしいことに気づきました。なんてこったと思い調べてみたらVuetifyのcssが影響していることがわかりました。  
~~ひとまず一部スタイルを上書きしてパッと見いい感じに調整しましたが、十分ではなさそうです。
わかっている課題としては一行が長くなった時に横スクロールバーが表示されるはずが出てこないです。ほかにもあるかもしれないので調査が必要ですが、とりあえずはこれで公開しときます。~~

~~やったこととしては、関連してそうなスタイルをvuetify.cssから抜き出して初期化。
フォントはvuepressのtheme.stylのものを再適用。~~

~~きちんと調べて解決するか、Vuetify導入をやめるか悩みどころです。~~

初期化するとデフォルトになってほしくないスタイルまで解除されているような気がしたので、不要なスタイルは削除するアプローチをとることにしました。  
Vuetifyのフォルダからvuetify.cssをコピーしてきてdocs内へ配置。  
`code`クラスが当たっている箇所が影響していそうなので該当するスタイルをコメントアウト。  
とりあえず横スクロールバー含め表示されるようになりました。

ということで、こんな感じになります。
vuetify.cssの中身は[こんな感じ](https://github.com/iyuki884/codekneading/blob/master/docs/.vuepress/theme/styles/vuetify/vuetify.css#L2242)で、一部コメントアウトしています。
``` js
 // enhanceApp.js
import Vuetify from '../../../node_modules/vuetify'
// import '../../../node_modules/vuetify/dist/vuetify.min.css'
import './styles/vuetify/vuetify.css'
```

ほかのVuetifyのコンポーネントを使用した時に変な影響が出る可能性もあるので、本格的な対策は検討が必要そうです。こういう場合は、どうするのがベストなんだろう。
