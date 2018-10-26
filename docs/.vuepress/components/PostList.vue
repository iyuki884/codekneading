<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md4 sm6 xs12 v-for="post in posts" :key="post.path">
        <PostCard :post="post" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'postList',
  computed: {
    posts() {
      return this.$site.pages
        // blogディレクトリ以下を投稿記事一覧表示の対象とする
        .filter(post => post.path.startsWith('/blog/'))
        // dateに設定した日付の降順にソートする
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    }
  }
}
</script>
