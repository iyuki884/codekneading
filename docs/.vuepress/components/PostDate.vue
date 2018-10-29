<template>
  <div class="date">
    <div>作成日:{{ createDate() }}</div>
    <div>更新日:{{ lastUpdate() }}</div>
  </div>
</template>

<script>
import dateFormatter from '../lib/date'

export default {
  name: 'postDate',
  props: {
    create: String,
    update: String
  },
  methods: {
    createDate () {
      return dateFormatter.format(this.create, 'YYYY-MM-DD')
    },
    lastUpdate () {
      const lastUpdate = this.update
      if (!lastUpdate) {
        return this.createDate()
      }
      return dateFormatter.format(lastUpdate, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
.date{
  font-size: 13px;
}
</style>
