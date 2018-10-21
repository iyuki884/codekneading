<template>
  <div>
    <v-btn color="blue">Color</v-btn>
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>

    <v-alert
      :value="true"
      type="success"
    >
      This is a success alert.
    </v-alert>

    <v-alert
      :value="true"
      type="info"
    >
      This is a info alert.
    </v-alert>

    <v-alert
      :value="true"
      type="warning"
    >
      This is a warning alert.
    </v-alert>

    <v-alert
      :value="true"
      type="error"
    >
      This is a error alert.
    </v-alert>

  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-slider
          v-model="slider"
          :min="16"
          :max="256"
          label="Size"
          thumb-label
        ></v-slider>

        <v-switch
          v-model="tile"
          label="Tile"
        ></v-switch>
      </v-flex>

      <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-xs-center
      >
        <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img src="/img/favicon.png" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      slider: 56,
      tile: false
    }),

    computed: {
      avatarSize () {
        return `${this.slider}px`
      }
    }
  }
</script>
