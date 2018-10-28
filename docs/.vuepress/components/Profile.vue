<template>
  <v-container>
    <v-flex xs-12>
      <v-card class="text-xs-center">
        <v-avatar
          size=140px
        >
          <img src="/img/profile_icon.jpg" alt="avatar">
        </v-avatar>
        <v-card-text>
          <div class="name">iyuki</div>
          <div class="sns-link">
            <a href="https://github.com/iyuki884" target="_blank">
              <v-icon color="black" >mdi-github-circle</v-icon>
            </a>
            <a href="https://twitter.com/iyuki884" target="_blank">
              <v-icon color="blue">mdi-twitter-circle</v-icon>
            </a>
          </div>
          <div class="property">
            ソフトウェア開発エンジニア<br/>
            パンとコーヒーのお店を開業するのが目標<br/>
            両立した働き方を実現するために転職活動中<br/>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<style scoped>
.name {
  font-weight: bold;
}

.property {
  font-size: 13px;
}
</style>
