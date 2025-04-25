<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const visible = ref(false)
const items   = ['Municipal Admin', 'Barangay Admin','Barangay Health Worker']
const { mobile } = useDisplay()

const router = useRouter()

const onSubmit = () => {
  // here you would normally validate credentials…
  // and only navigate on success:
  router.push({ name: 'dashboard' })
}
</script>
<template>
 <v-form fast-fail @submit.prevent="onSubmit">
    <v-text-field
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-account"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field
    >  <v-autocomplete
      density="compact"
      variant="outlined"
      :items="items"
      label="Role"
    ></v-autocomplete>

    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-login">Log in </v-btn>
    
  </v-form>
</template>
