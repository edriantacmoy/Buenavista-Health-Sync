<script setup>
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router' // ✅ added this

const display = useDisplay()
const mobile = display.mobile
const router = useRouter()

const onSubmit = () => {
  router.push({ name: 'record' })
}

const scrollToInfo = () => {
  const section = document.getElementById('info-section')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar color="#561C24" dark elevate-on-scroll flat>
      <v-container class="d-flex align-center pa-0 ml-0">
        <!-- Left-aligned logo -->
        <div class="d-flex align-center mr-auto">
          <v-img src="/images/img/bhww.png" height="80" width="75" class="mt-4" />
          <v-img src="/images/img/buenalogo.png" height="50" width="50" />
        </div>

        <!-- Navigation buttons -->
        <v-btn text to="/dashboard">Home</v-btn>
        <v-btn text to="/bhws">BHW's</v-btn>
        <v-btn text to="/records">Records</v-btn>
        <v-btn text to="/calendar">Calendar</v-btn>
        <v-btn text to="/inventory">Inventory</v-btn>
        <v-btn text to="/">Log out</v-btn>
      </v-container>
    </v-app-bar>

    <!-- Hero Section -->
    <v-main class="pa-0">
      <div class="hero-section d-flex align-center" style="min-height: 90vh">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <div class="text-white text-shadow hero-text">
                <h1 class="font-weight-black display-2 mb-2">Buenavista Health Sync</h1>
                <em class="text-h5 font-italic mb-4">
                  Securing Health Data, Transforming Healthcare for All
                </em>
                <v-btn color="#561C24" dark large @click="scrollToInfo">Learn more</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>

    <!-- Info Section -->
    <section id="info-section" class="py-12 bg-grey-lighten-4">
      <v-container>
        <!-- First Row -->
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-2">What is Buenavista Health Sync?</h2>
            <p class="text-body-1">
              <b>Buenavista Health Sync (BHS)</b> is an innovative digital health platform aimed at
              transforming barangay healthcare services. It allows for the secure online input and
              storage of community health records while archiving past records for easy retrieval.
              Health workers gain real-time access to critical data, improving efficiency and the
              quality of care in the community.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-2">Key Features</h2>
            <ul class="text-body-1">
              <li><b>Secure Data Entry:</b> Encrypted, safe input of health records.</li>
              <li><b>Digital Record Storage:</b> Organized, paperless data management.</li>
              <li><b>Real-Time Access:</b> Instant access to patient info anytime.</li>
              <li><b>Smart Archiving:</b> Easy retrieval of past health records.</li>
              <li><b>Reports & Analytics:</b> Quick reports and insights.</li>
              <li><b>Role-Based Access:</b> Custom permissions by user role.</li>
              <li><b>Alerts & Reminders:</b> Auto-notifications for follow-ups.</li>
              <li><b>System Integration:</b> Compatible with other health systems.</li>
            </ul>
          </v-col>
        </v-row>

        <!-- Second Row -->
        <v-row class="mt-8">
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-2">How It Works</h2>
            <ol class="text-body-1">
              <li><b>Sign Up & Access:</b> Secure login with role-based permissions.</li>
              <li><b>Easy Data Entry:</b> Input through simple, accurate forms.</li>
              <li><b>Real-Time Access:</b> Instant availability of patient data.</li>
              <li><b>Record Management:</b> Easily update records with alerts.</li>
              <li><b>Archiving:</b> Auto-archived records for easy tracking.</li>
              <li><b>Reports:</b> View and generate health insights.</li>
              <li><b>Privacy:</b> Encrypted, compliant, secure data handling.</li>
            </ol>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-2">Mission & Vision</h2>
            <p class="text-body-1 mb-4">
              <b>Mission:</b><br />
              To empower barangay healthcare workers with a secure, efficient platform for managing
              community health data and improving service delivery.
            </p>
            <p class="text-body-1">
              <b>Vision:</b><br />
              To be the leading digital health platform for barangays, promoting data-driven,
              accessible, and sustainable healthcare through innovative technology.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Footer -->
    <v-footer color="#561C24" padless>
      <v-container class="text-center text-white py-4">
        © {{ new Date().getFullYear() }} BHS - Buenavista Health Sync
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.hero-section {
  background: url('/images/img/bhw.png') center center / cover no-repeat;
}
.text-shadow {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}
.bg-grey-lighten-4 {
  background-color: #f5f5f5;
}
.py-12 {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
.hero-text h1 {
  font-size: 4rem; /* Make title bigger */
}
.hero-text {
  max-width: 600px;
}
</style>
