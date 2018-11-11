---
date: 2018-11-11
description: 記事の下にリンクが表示されるようにしました
category: DEVELOPMENT
image: img/development/prev-next-links.jpg
sidebar: auto
---

# 投稿記事に前後リンクを追加

## Vuepressデフォルトの指定方法
たいていのブログでは各投稿記事に前後リンクがついています。
Vuepressにも前後リンク機能が備わっていますが、デフォルトではfrontmatterで指定するようになっています。

```
---
prev: ./prev-post-path
next: ./next-post-path
---
```
[Prev / Next Links](https://v0.vuepress.vuejs.org/default-theme-config/#prev-next-links)


## 変更した内容
とりあえず投稿順に自動でリンクしてくれればいいので少しいじります。  
と言っても、以下の記事を参考にPage.vueを変更すればほぼ完了です。

[VuePressの使い方！記事一覧と前後投稿リンク付きブログの作成方法](https://techblog.raccoon.ne.jp/archives/1537944919.html)

Page.vueのprev()とNext()関数が変更対象です。blogディレクトリ以下のファイルを対象とし、日付でソートしてリンクを生成していきます。

このままでもOKなのですが、少し自分の要件と合わない箇所があったので手を加えました。

## blog配下のみ前後リンクを表示したい
現状は問題にならないのですが、例えばAboutページなどを追加した場合、そこには前後リンクを表示させたくありません。
上記の変更だけだと、リンク先となる対象はblogディレクトリ以下のページに限定されますが、ほかのディレクトリに作成したページにもリンクが表示されます。これは、Page.vueがすべてのページで共通的に使われるためです。

これを実現するためにnext()関数をちょいといじります。
``` js {7}
    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
        // 最後より一つ前のページまで次へリンクを生成する
      } else if (typeof next === "undefined"
                && this.pageIdx >= 0
                && this.pageIdx < this.sortedPosts.length - 1) {
        const nextPath = this.sortedPosts[this.pageIdx + 1].path
        return resolvePage(this.$site.pages, nextPath, this.$route.path)
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
```

`this.sortedPosts`にはblogディレクトリ配下のページ情報が日付順でソートされています。  
`this.pageIdx`は、その配列における現在のページのインデックスです。  
次ページが存在すればリンクを表示するようになっていましたが、そこに条件式を追加しました。現在のページが`this.sortedPosts`に存在しない場合、`this.pageIdx`は-1となるので、そいつを除外してやります。  
これで、やりたいことが実現できました:tada:

ちなみに、順番はfronatmatterのdateでソートしているため、同じ日付で複数記事を投稿する場合は注意が必要です。dateに時間まで指定するなど、なにかしらの対策が必要でしょう。  
frontmatterでの指定は生きているので、そこで調整するのがお手軽かもしれません。
