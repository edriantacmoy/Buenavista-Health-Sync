<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <AppLayout>
    <template #content
      ><v-row class="d-flex justify-center">
        <v-col cols="12" md="6"
          ><v-card class="mx-auto" elevation="24">
            <v-img
              class="mx-auto rounded-circle mt-2"
              src="/public/images/logo-favicon.png"
              :width="mobile ? '75%' : '25% '"
            ></v-img>
            <v-card-title class="text-center"
              ><h3 class="font-weight-black">BHC Tracker</h3>
              <p style="font-size: small" class="font-weight-bold">Register Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>

              <RegisterForm> </RegisterForm>

              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Already have account?
                <RouterLink class="text-primary" to="/">Click here to log in</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row></template
    >
  </AppLayout>
</template>
