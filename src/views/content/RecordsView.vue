<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCreateOptions = ref()

const toggleOptions = () => {
  showCreateOptions.value = !showCreateOptions.value
}

const openFolder = () => {
  router.push('/records/household')
}
</script>

<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar color="#561C24" dark flat>
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-img src="/images/img/buenalogo.png" height="40" width="40" class="mr-2" />
          <v-img src="/images/img/brgylogo.png" height="40" width="40" />
        </div>
        <div>
          <v-btn text to="/dashboard">Home</v-btn>
          <v-btn text to="/bhws">BHW's</v-btn>
          <v-btn text to="/records">Records</v-btn>
          <v-btn text to="/calendar">Calendar</v-btn>
          <v-btn text to="/inventory">Inventory</v-btn>
          <v-btn text to="/">Log out</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="mt-15" style="background-color: #d6c3aa; min-height: 100vh; position: relative">
      <!-- Search Bar -->
      <v-text-field
        variant="round"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        flat
        class="search-bar"
        style="
          position: absolute;
          top: 20px;
          right: 30px;
          width: 260px;
          height: 50px;
          border-radius: 40px;
          background: white;
          box-shadow: none;
        "
      />

      <!-- Folder with Label and Triple Dot Menu -->
      <div
        style="
          position: absolute;
          top: 80px;
          left: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <!-- Clickable Folder Icon with Triple Dot Menu -->
        <div style="display: flex; align-items: center; gap: 8px">
          <!-- Folder Icon -->
          <v-icon size="80" color="orange" style="cursor: pointer" @click="openFolder">
            mdi-folder
          </v-icon>

          <!-- Triple Dot Toggle -->
          <!-- Triple Dot Toggle -->
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon v-bind="props" size="small" flat class="mt-4">
                <v-icon size="16">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="">
                <v-list-item-title class="text-error">Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- Label -->
        <span
          class="mt-1"
          style="margin-top: -10px; background-color: white; padding: 3px 6px; border-radius: 6px"
        >
          Household Records
        </span>
      </div>

      <!-- FAB with Toggle Menu -->
      <div
        style="
          position: absolute;
          bottom: 30px;
          right: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        "
      >
        <!-- Toggleable Options -->
        <div
          v-if="showCreateOptions"
          style="background: white; padding: 8px; border-radius: 8px; margin-bottom: 8px"
        >
          <v-btn variant="text" size="small">Create New Folder</v-btn>
          <v-btn variant="text" size="small">Create New File</v-btn>
        </div>

        <!-- FAB Button -->
        <v-btn icon color="#561C24" @click="toggleOptions">
          <v-icon size="32">mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-main>

    <!-- Footer -->
    <v-footer color="#561C24" padless>
      <v-container class="text-center text-white py-4">
        © {{ new Date().getFullYear() }} BHS - Buenavista Health Sync
      </v-container>
    </v-footer>
  </v-app>
</template>
