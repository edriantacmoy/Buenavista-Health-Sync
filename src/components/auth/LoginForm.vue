<script setup>
import { requiredValidator, emailValidator } from '@/utils/validator'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const visible = ref(false)
const items = ['Municipal Admin', 'Barangay Admin', 'Barangay Health Worker']
const { mobile } = useDisplay()
const refVfrom = ref()

const router = useRouter()
const formDataDefault = {
  email:'',
  password:'',
}

const formData = ref({
 ...formDataDefault
})

const onLogin = () => {
  alert(formData.value.email)
}

const onSubmit = () => {
  refVfrom.value?.validate().then(({ valid }) => {
   if(valid)
   onLogin()
  })
  router.push({ name: 'dashboard' })
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
      e
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
      density="compact"
      variant="outlined"
      :items="items"
      label="Role"
    ></v-autocomplete>
    <v-btn class="mt-2" type="submit" block color="#561C24" prepend-icon="mdi-login">Log in </v-btn>
  </v-form>
</template>
