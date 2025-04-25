<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

// Scroll to info section when "Learn more" is clicked
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
    <v-app-bar color="#561C24" dark elevate-on-scroll flat height="150">
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logos on Left -->
        <div class="d-flex align-center logo-container">
          <v-img src="images/img/circlelogo.png" class="nav-logo ml-4" contain />
        </div>    
        <div class="d-flex align-center logo-container">
          <v-img src="images/img/buenalogo.png" class="nav-logo ml-4" contain />
        </div>

        <v-spacer></v-spacer>

        <!-- Navigation Links -->
        <div class="nav-links">
          <v-btn text to="/">Home</v-btn>
          <v-btn text to="/bhws">BHW's</v-btn>
          <v-btn text to="/records">Records</v-btn>
          <v-btn text to="/calendar">Calendar</v-btn>
          <v-btn text to="/inventory">Inventory</v-btn>
          <v-btn text to="/logout">Log out</v-btn>
        </div>
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
                </em> <br><br>
                <v-btn color="#561C24" dark large @click="scrollToInfo">Learn more</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>

    <hr><br><br> <br> <br> <br> <hr>

 <!-- Info Section -->
<section id="info-section" class="py-15" style="background-color: #f5f5f5;">
  <v-container>
    <v-row>
      <!-- First Column -->
      <v-col cols="12" md="3" class="d-flex">
        <v-card class="w-100 pa-4 text-white" style="background-color: #561C24;">
          <h2 class="text-h5 font-weight-bold mb-2"><u>What is Buenavista Health Sync?</u></h2>
          <p class="text-body-1" style="text-align: justify;">
            <b>Buenavista Health Sync (BHS)</b> is an innovative digital health platform aimed at transforming barangay healthcare services.
            It allows for the secure online input and storage of community health records while archiving past records for easy retrieval.
            Health workers gain real-time access to critical data, improving efficiency and the quality of care in the community.
          </p>
        </v-card>
      </v-col>

      <!-- Second Column -->
      <v-col cols="12" md="3" class="d-flex">
        <v-card class="w-100 pa-4 text-white" style="background-color: #561C24;">
          <h2 class="text-h5 font-weight-bold mb-2"><u>Key Features</u></h2>
          <ul class="text-body-1" style="text-align: justify; list-style-type: disc; padding-left: 1.5rem;">
            <li><b>Secure Data Entry:</b> Encrypted, safe input of health records.</li>
            <li><b>Digital Record Storage:</b> Organized, paperless data management.</li>
            <li><b>Real-Time Access:</b> Instant access to patient info anytime.</li>
            <li><b>Smart Archiving:</b> Easy retrieval of past health records.</li>
            <li><b>Reports & Analytics:</b> Quick reports and insights.</li>
            <li><b>Role-Based Access:</b> Custom permissions by user role.</li>
            <li><b>Alerts & Reminders:</b> Auto-notifications for follow-ups.</li>
            <li><b>System Integration:</b> Compatible with other health systems.</li>
          </ul>
        </v-card>
      </v-col>

      <!-- Third Column -->
      <v-col cols="12" md="3" class="d-flex">
        <v-card class="w-100 pa-4 text-white" style="background-color: #561C24;">
          <h2 class="text-h5 font-weight-bold mb-2"><u>How It Works</u></h2>
          <ol class="text-body-1" style="text-align: justify; list-style-type: decimal; padding-left: 1.5rem;">
            <li><b>Sign Up & Access:</b> Secure login with role-based permissions.</li>
            <li><b>Easy Data Entry:</b> Input through simple, accurate forms.</li>
            <li><b>Real-Time Access:</b> Instant availability of patient data.</li>
            <li><b>Record Management:</b> Easily update records with alerts.</li>
            <li><b>Archiving:</b> Auto-archived records for easy tracking.</li>
            <li><b>Reports:</b> View and generate health insights.</li>
            <li><b>Privacy:</b> Encrypted, compliant, secure data handling.</li>
          </ol>
        </v-card>
      </v-col>

      <!-- Fourth Column -->
      <v-col cols="12" md="3" class="d-flex">
        <v-card class="w-100 pa-4 text-white" style="background-color: #561C24;">
          <h2 class="text-h5 font-weight-bold mb-2"><u>Mission & Vision</u></h2>
          <p class="text-body-1 mb-4" style="text-align: justify;">
            <b>Mission:</b><br>
            To empower barangay healthcare workers with a secure, efficient platform for managing community health data and improving service delivery.
          </p>
          <p class="text-body-1" style="text-align: justify;">
            <b>Vision:</b><br>
            To be the leading digital health platform for barangays, promoting data-driven, accessible, and sustainable healthcare through innovative technology.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</section>


    <br> <br> <br>

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
  background: url('/images/img/bhw.jpg') center center / cover no-repeat;
}
.text-shadow {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
}
.nav-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.nav-links .v-btn {
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 8px;
  margin-right: 8px;
}
.hero-text h1 {
  font-size: 5rem; /* Increased font size for "Buenavista Health Sync" */
  line-height: 1.2;
  margin-bottom: 10px;
}
.hero-text em {
  font-size: 1.8rem; /* Slightly bigger font size for tagline */
  font-style: italic;
  margin-bottom: 20px;
}
.hero-text {
  max-width: 600px;
}
.nav-logo {
  width: 100px;
  height: auto;
  object-fit: contain;
}
.logo-container {
  gap: 10px; /* spacing between logos */
}
.v-btn {
  font-size: 1.3rem; /* Bigger font size for the "Learn More" button */
  padding: 30px 30px; /* Increased padding for the button */
  
}
</style>
