<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { mobile } = useDisplay()

const profile = ref({
  name: '',
  age: '',
  birthdate: '',
  address: '',
  contact: '',
  assignedPurok: '',
  photo: '', // 🖼️ New: store base64 image
})

const dutySchedule = ref({
  days: '',
  time: '',
})

// 📸 Handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.photo = e.target.result // base64 string
    }
    reader.readAsDataURL(file)
  }
}

function submitProfile() {
  const data = {
    ...profile.value,
    dutySchedule: dutySchedule.value,
  }
  localStorage.setItem('bhwProfile', JSON.stringify(data))
  router.push('/BHW')
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <h1 class="text-h5 mb-4">Create New Profile</h1>
        <v-form @submit.prevent="submitProfile">
          <v-file-input
            label="Upload Profile Photo"
            accept="image/*"
            @change="handleImageUpload"
            prepend-icon="mdi-camera"
          />
          <v-text-field v-model="profile.name" label="Name" required />
          <v-text-field v-model="profile.age" label="Age" type="number" required />
          <v-text-field v-model="profile.birthdate" label="Birthdate" type="date" required />
          <v-text-field v-model="profile.address" label="Address" required />
          <v-text-field v-model="profile.contact" label="Contact Number" required />
          <v-text-field v-model="profile.assignedPurok" label="Assigned Purok" required />
          <v-text-field v-model="dutySchedule.days" label="Duty Days (e.g. Mon & Tue)" required />
          <v-text-field
            v-model="dutySchedule.time"
            label="Duty Time (e.g. 7:30 am - 4:30 pm)"
            required
          />
          <v-btn type="submit" color="primary" class="mt-4">Save Profile</v-btn>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
