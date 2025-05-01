<script setup>
import buenalogo from '@/assets/buenalogo.png'
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="#561C24" dark flat>
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo -->
        <div class="d-flex align-center">
          <v-img :src="buenalogo" height="40" width="40" class="mr-2" />
        </div>

        <!-- Navigation -->
        <div>
          <v-btn text :to="'/dashboard'">Home</v-btn>
          <v-btn text :to="'/bhws'">BHW's</v-btn>
          <v-btn text :to="'/records'">Records</v-btn>
          <v-btn text :to="'/calendar'">Calendar</v-btn>
          <v-btn text :to="'/inventory'">Inventory</v-btn>
          <v-btn text :to="'/'">Log out</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content Slot -->
    <v-main class="bgcon">
      <slot name="nav" />
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      color="#561C24"
      elevation="24"
      style="height: 40px; font-size: 0.75rem"
      class="font-weight-bold"
    >
      2025 - Barangay Health Care
    </v-footer>
  </v-app>
</template>

<style scoped>
.bgcon {
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
