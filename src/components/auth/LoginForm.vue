<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Username" variant="outlined"></v-text-field>
    <v-text-field label="Password" type="password" variant="outlined"></v-text-field
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
