<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" elevation="24">
            <v-img
              class="mx-auto rounded-circle mt-2"
              src="/images/logo-favicon.jpg"
              :width="mobile ? '75%' : '35%'"
            ></v-img>

            <v-card-title class="text-center">
              <h3 class="font-weight-black" style="font-size: medium">
                Buenavista <br />Health Sync
              </h3>
              <p style="font-size: x-small" class="font-weight-bold">Register Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>

              <RegisterForm></RegisterForm>

              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Already have an account?
                <RouterLink class="text-primary" to="/">Click here to log in</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
