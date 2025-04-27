<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'
import { useDisplay } from 'vuetify'

const visible = ref(false)
const items = ['Municipal Admin', 'Barangay Admin', 'Barangay Health Worker']
const { mobile } = useDisplay()
const refVform = ref()

const router = useRouter()

const formDataDefault = {
  email: '',
  password: '',
  role: '', // Added role
}

const formData = ref({
  ...formDataDefault,
})

const allowedRoles = ['Municipal Admin', 'Barangay Admin', 'Barangay Health Worker']

const onLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    console.error(error)
    alert('Login failed: ' + error.message)
  } else if (data?.user) {
    console.log('User logged in:', data)

    // Fetch user data from Supabase
    const { data: userDetails, error: userError } = await supabase
      .from('users') // make sure you have a "users" table
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (userError) {
      console.error(userError)
      alert('Failed to get user role: ' + userError.message)
      return
    }

    const userRole = userDetails?.role
    console.log('User role:', userRole)

    // Check if user's role is allowed
    if (allowedRoles.includes(userRole) && userRole === formData.value.role) {
      alert('Login success! Welcome ' + userRole)
      router.push({ name: 'record' }) // Redirect to dashboard
    } else {
      alert('Unauthorized role or role mismatch. Your role is: ' + userRole)
      await supabase.auth.signOut()
    }
  }
}

const onSubmit = () => {
  refVform.value?.validate().then(({ valid }) => {
    if (valid) {
      if (!formData.value.role) {
        alert('Please select a role.')
        return
      }
      onLogin()
    }
  })
}
</script>

<template>
  <v-form ref="refVform" fast-fail @submit.prevent="onSubmit">
    <v-text-field
      v-model="formData.email"
      density="compact"
      placeholder="Email"
      prepend-inner-icon="mdi-account"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-autocomplete
      v-model="formData.role"
      :items="items"
      label="Role"
      density="compact"
      variant="outlined"
      :rules="[requiredValidator]"
    ></v-autocomplete>

    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-login">
      Log in
    </v-btn>
  </v-form>
</template>
