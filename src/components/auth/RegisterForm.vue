<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '../common/AlertNotification.vue'

const refVform = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '', // <-- ADD THIS
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const items = ['Municipality Admin', 'Barangay Admin', 'Barangay Health Worker']

// Dummy validators if you don't have real ones
const passwordValidator = (value) => {
  return value?.length >= 6 || 'Password must be at least 6 characters'
}

const confirmValidator = (confirm, password) => {
  return () => confirm === password || 'Passwords do not match'
}

const onLogin = () => {
  alert(formData.value.email)
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        role: formData.value.role, // <-- SAVE ROLE
      },
    },
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered'
    refVform.value?.reset()
  }
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid }) => {
    if (valid) onSubmit() // <-- FIX: call onSubmit instead of onLogin
  })
}

// Password visibility toggle
const visible = ref(false)
</script>

<template>
  <AlertNotification></AlertNotification>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVform" fast-fail @submit.prevent="onFormSubmit">
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
      v-model="formData.role"
      :items="items"
      label="Role"
      density="compact"
      variant="outlined"
      :rules="[requiredValidator]"
      placeholder="Select Role"
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
    ></v-text-field>

    <v-text-field
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

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="#561C24"
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Register
    </v-btn>
  </v-form>
</template>
