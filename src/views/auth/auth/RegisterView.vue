<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="red-darken-4">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6"
              ><v-card class="mx-auto" prepend-icon="mdi-login" subtitle="Register" elevation="24">
                <template v-slot:title>
                  <span class="font-weight-black">BHC Tracker</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Firstname" variant="outlined"></v-text-field>
                    <v-text-field label="Lastname" variant="outlined"></v-text-field>
                    <v-text-field label="Username" variant="outlined"></v-text-field>

                    <v-text-field
                      label="Password "
                      type="password"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      label="Password Confirmation"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>
                  <h5 class="text-center">
                    Already have account?
                    <RouterLink class="text-primary" to="/">Click here to log in</RouterLink>
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer border app color="red-darken-4">2025 - BHC Tracker </v-footer>
    </v-app>
  </v-responsive>
</template>
