<script setup>
import BhwLayout from '@/components/layout/BhwLayout.vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const { mobile } = useDisplay()
const router = useRouter()
const menu = ref(false)

const defaultPhoto = '/images/img/profile.png ' // ✅ fallback image

const profile = ref({})
const dutySchedule = ref({})

onMounted(() => {
  const savedProfile = localStorage.getItem('bhwProfile')
  if (savedProfile) {
    const parsed = JSON.parse(savedProfile)
    profile.value = parsed
    dutySchedule.value = parsed.dutySchedule || {}
  }
})

function createProfile() {
  router.push('/profile')
}

function openSettings() {
  console.log('Settings clicked')
}
</script>

<template>
  <BhwLayout>
    <template #nav>
      <v-container fluid class="no-scroll">
        <v-row style="gap: 30px">
          <!-- Profile Section -->
          <v-col cols="12" sm="5" class="profile-col">
            <div class="Lred rounded-md shadow-lg custom-max-width">
              <img :src="profile.photo || defaultPhoto" alt="BHW photo" class="profile-img" />
              <div class="text-white text-start ps-16">
                <p>
                  <b>Name: {{ profile.name }}</b>
                </p>
                <p>
                  <b>Age: {{ profile.age }}</b>
                </p>
                <p>
                  <b>Birthdate: {{ profile.birthdate }}</b>
                </p>
                <p>
                  <b>Address: {{ profile.address }}</b>
                </p>
                <p>
                  <b>Contact number: {{ profile.contact }}</b>
                </p>
                <p class="pb-5">
                  <b>Assigned Purok: {{ profile.assignedPurok }}</b>
                </p>
              </div>
            </div>
          </v-col>

          <!-- Duty Schedule -->
          <v-col cols="12" sm="6">
            <div class="text-white rounded-md text-center Lred w-100">
              <h2 class="text-xl font-semibold mb-2">Duty Schedule</h2>
              <div v-if="dutySchedule.days && dutySchedule.time">
                <p>{{ dutySchedule.days }} {{ dutySchedule.time }}</p>
              </div>
              <div v-else>
                <p>Set your schedule.</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- FAB Menu -->
      <v-container fluid>
        <v-row>
          <div class="fab-menu">
            <v-menu v-model="menu" :close-on-content-click="false" offset="8">
              <template #activator="{ props }">
                <v-btn icon="mdi-plus" size="small" v-bind="props"></v-btn>
              </template>
              <v-list class="bg-white rounded">
                <v-list-item @click="createProfile">
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openSettings">
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-row>
      </v-container>
    </template>
  </BhwLayout>
</template>

<style scoped>
.Lred {
  background-color: #561c24;
}

.profile-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  padding: 25px;
}

.custom-max-width {
  max-width: 350px;
  max-height: 600px;
  margin: 0 auto;
}

.profile-col {
  font-size: 12px;
  margin-left: 50px;
}

.fab-menu {
  position: fixed;
  bottom: 90px;
  right: 50px;
  z-index: 900;
}
</style>
