<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
<template>
  <v-form fast-fail @submit.prevent>
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
    ><v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" color="#561C24">Role</v-btn>
      </template>
      <v-list>
        <v-list-item title="Municipal Admin" />
        <v-list-item title="Barangay Admin" />
      </v-list>
    </v-menu>

    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-login">Log in </v-btn>
  </v-form>
</template>
