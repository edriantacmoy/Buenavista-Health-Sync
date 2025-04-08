<script setup>
import { ref } from 'vue'

const visible = ref(false)
const items = ['Municipal Admin', 'Barangay Admin','Barangay Health Worker']
</script>
<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field density="compact" placeholder="First name" variant="outlined"></v-text-field>
    <v-text-field density="compact" placeholder="Last name" variant="outlined"></v-text-field>
    <v-text-field density="compact" placeholder="Username" variant="outlined"></v-text-field>
    <v-autocomplete
      density="compact"
      variant="outlined"
      :items="items"
      label="Role"
    ></v-autocomplete>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field
    ><v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Confirm Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
