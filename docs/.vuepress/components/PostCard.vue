<template>
  <v-card
    class="post"
    hover
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
      <PostDate class="mb-2"
        :create="post.frontmatter.date"
        :update="post.frontmatter.update"
      />
      <span
        class="category py-1 px-3"
      >
        {{post.frontmatter.category}}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import dateFormatter from '../lib/date'

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
      return dateFormatter.format(this.post.frontmatter.date, 'YYYY-MM-DD')
    },
    lastUpdate () {
      const lastUpdate = this.post.frontmatter.update
      if (!lastUpdate) {
        return this.createDate()
      }
      return dateFormatter.format(lastUpdate, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
.post:hover {
  cursor: default;
}
.category {
  font-size: 13px;
  color: white;
  background: grey;
}
</style>
