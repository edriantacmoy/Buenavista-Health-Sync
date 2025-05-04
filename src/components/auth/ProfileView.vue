<script setup>
import AppLayout from '../layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { mobile } = useDisplay()
const router = useRouter()

const profile = ref({
  name: '',
  age: '',
  birthdate: '',
  address: '',
  contact: '',
  assignedPurok: '',
  photo: '', // For base64 image
})

const dutySchedule = ref({
  days: '',
  time: '',
})

// 📸 Handle image upload
function handleImageUpload(event) {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 💾 Save profile to localStorage and navigate
function submitProfile() {
  const data = {
    ...profile.value,
    dutySchedule: dutySchedule.value,
  }
  localStorage.setItem('bhwProfile', JSON.stringify(data))
  router.push('/bhws')
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <h1 class="text-h5 mb-4">Create New Profile</h1>

        <v-form @submit.prevent="submitProfile">
          <!-- Profile Picture -->
          <v-file-input
            label="Upload Profile Photo"
            accept="image/*"
            prepend-icon="mdi-camera"
            @change="handleImageUpload"
            show-size
            chips
            clearable
          />

          <!-- Profile Fields -->
          <v-text-field v-model="profile.name" label="Name" required />
          <v-text-field v-model="profile.age" label="Age" type="number" required />
          <v-text-field v-model="profile.birthdate" label="Birthdate" type="date" required />
          <v-text-field v-model="profile.address" label="Address" required />
          <v-text-field v-model="profile.contact" label="Contact Number" required />
          <v-text-field v-model="profile.assignedPurok" label="Assigned Purok" required />

          <!-- Duty Schedule -->
          <v-text-field v-model="dutySchedule.days" label="Duty Days (e.g. Mon & Tue)" required />
          <v-text-field
            v-model="dutySchedule.time"
            label="Duty Time (e.g. 7:30 am - 4:30 pm)"
            required
          />

          <!-- Submit Button -->
          <v-btn type="submit" color="#561C24" class="mt-4" block> Save Profile </v-btn>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
