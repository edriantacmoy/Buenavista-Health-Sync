<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="red-darken-4">
        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
          elevation="5"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container> <slot name="content"></slot></v-container>
      </v-main>
      <v-footer border app color="red-darken-4" elevation="24">2025 - BHC Tracker </v-footer>
    </v-app>
  </v-responsive>
</template>
