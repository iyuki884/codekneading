<template>
  <v-card
    hover
    class="post"
  >
    <v-card-title>
      <div>
        <router-link :to="post.path">
          <h3 class="headline">{{ post.title }}</h3>
        </router-link>
        <div>{{ post.frontmatter.description }}</div>
      </div>
    </v-card-title>

    <v-img
      :src="eyeCatch()"
      height="125px"
    >
    </v-img>

    <v-card-text>
      <div class="date">
        <div>作成日:{{ createDate() }}</div>
        <div>更新日:{{ lastUpdate() }}</div>
      </div>
      <v-btn
        class="category"
        small
        dark
        color="blue-grey lighten-2"
      >
        {{post.frontmatter.category}}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'postCard',
  props: { post: Object },
  methods: {
    eyeCatch () {
      let img = this.post.frontmatter.image
      if (!img) {
        // default
        img = "/img/no-image.jpg"
      }
      return img
    },
    createDate () {
      return this.post.frontmatter.date
    },
    lastUpdate () {
      let date = this.post.frontmatter.update
      if (!date) {
        date = this.createDate()
      }
      return date
    }
  }
}
</script>

<style scoped>
.post:hover{
  cursor: default;
}

.date{
  font-size: 13px;
}
</style>
