<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const visible = ref(false)
const items = ['Municipal Admin', 'Barangay Admin', 'Barangay Health Worker']

const refVform = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

// Dummy validators if you don't have real ones
const passwordValidator = value => {
  return value?.length >= 6 || 'Password must be at least 6 characters'
}

const confirmValidator = (confirm, password) => {
  return () => confirm === password || 'Passwords do not match'
}

const onLogin = () => {
  alert(formData.value.email)
}

const onSubmit = () => {
  refVform.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}
</script>


<template>
  <v-form ref="refVform" fast-fail @submit.prevent="onSubmit">
    <v-text-field
      :rules="[requiredValidator]"
      v-model="formData.firstname"
      density="compact"
      placeholder="First name"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      :rules="[requiredValidator]"
      v-model="formData.lastname"
      density="compact"
      placeholder="Last name"
      variant="outlined"
    ></v-text-field>
    <v-text-field
      :rules="[requiredValidator, emailValidator]"
      v-model="formData.email"
      density="compact"
      placeholder="Email"
      variant="outlined"
    ></v-text-field>
    <v-autocomplete
      density="compact"
      variant="outlined"
      :items="items"
      label="Role"
    ></v-autocomplete>
    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator, passwordValidator]"
    ></v-text-field
    ><v-text-field
      v-model="formData.password_confirmation"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Confirm Password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[
        requiredValidator,
        confirmValidator(formData.password_confirmation, formData.password),
      ]"
    ></v-text-field>

    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
