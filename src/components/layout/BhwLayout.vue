<script setup>
import circLogo from '@/assets/circlogo.png'
import muniLogo from '@/assets/munilogo.png'
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="#561C24" dark elevate-on-scroll flat height="80">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex logo-container">
          <img :src="muniLogo" class=" nav-logo1 ml-4" contain />
        </div>    
        <div class="d-flex logo-container">
          <img :src="circLogo" class=" nav-logo ml-4" contain />
        </div>
        <v-spacer></v-spacer>
        <div class="nav-links">
          <v-btn text to="/">Home</v-btn>
          <v-btn text to="/bhws">BHW's</v-btn>
          <v-btn text to="/records">Records</v-btn>
          <v-btn text to="/calendar">Calendar</v-btn>
          <v-btn text to="/inventory">Inventory</v-btn>
          <v-btn text to="/logout">Log out</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content Slot -->
    <v-main class="bgcon" >
      <slot name="nav" />
    </v-main>

    <!-- Footer -->
    <v-footer
      border
      app
      color="#561C24"
      elevation="24"
      style="height: 40px; font-size: 0.75rem;"
      class="font-weight-bold"
    >
      2025 - Barangay Health Care
    </v-footer>
  </v-app>
</template>
<style scoped>

.bgcon{
  background-color: #d9cab3;
}

.nav-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-top: 25px;
}

.nav-logo1 {

  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-left: 20px;
  
}

.logo-container {
  gap: 10px;
}

</style>
