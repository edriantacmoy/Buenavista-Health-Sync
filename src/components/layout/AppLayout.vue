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
      <!-- Reduced height of app bar -->
      <v-app-bar class="px-2" color="red-darken-3" style="height: 60px;">
        <v-img class="mx-auto" max-width="80" src="/public/images/img/BHSlogo.png"></v-img>
        <v-spacer />
        <v-img src="/public/images/img/Blogo.png" max-width="40" alt="Logo" />
      </v-app-bar>
      
      <!-- Smaller container with reduced padding -->
      <v-main>
        <v-container class="pa-5" max-width="800px" style="font-size: 0.85rem;">
          <slot name="content"></slot>
        </v-container>
      </v-main>

      <!-- Reduced height of footer -->
      <v-footer border app color="red-darken-3" elevation="24" style="height: 40px; font-size: 0.75rem;">
        2025 - Barangay Health Care
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.v-main {
  background-color: #EF9A9A;
}

.center {
  text-align: center;
}
</style>
