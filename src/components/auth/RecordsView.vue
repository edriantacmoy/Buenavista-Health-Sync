<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

const folders = ref([])
const currentPath = ref([])

const showCreateOptions = ref(false)

const toggleOptions = () => {
  showCreateOptions.value = !showCreateOptions.value
}

const currentFolder = () => {
  let current = null
  for (const name of currentPath.value) {
    const found = (current ? current.subfolders : folders.value).find(f => f.name === name)
    if (!found) return null
    current = found
  }
  return current
}

// Fetch folders from Supabase
const fetchFolders = async () => {
  const { data, error } = await supabase
    .from('folders')
    .select('*')
    .eq('parent_id', null)  // Fetch root folders
  
  if (error) {
    console.error('Error fetching folders:', error)
  } else {
    folders.value = data
  }
}

// Fetch files for a specific folder
const fetchFiles = async (folderId) => {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('folder_id', folderId)
  
  if (error) {
    console.error('Error fetching files:', error)
  } else {
    return data
  }
}

// Create a new folder
const createFolder = async () => {
  const folderName = prompt('Enter new folder name:')
  if (folderName) {
    const { data, error } = await supabase
      .from('folders')
      .insert([{ name: folderName, parent_id: null }]) // root folder (no parent)
    
    if (error) {
      console.error('Error creating folder:', error)
    } else {
      folders.value.push(data[0])  // Add the newly created folder to local state
    }
  }
}

// Create a new file inside the current folder
const createFile = async () => {
  const fileName = prompt('Enter new file name:')
  if (fileName) {
    const current = currentFolder()
    const folderId = current ? current.id : null
    
    const { data, error } = await supabase
      .from('files')
      .insert([{ name: fileName, folder_id: folderId, details: '' }])
    
    if (error) {
      console.error('Error creating file:', error)
    } else {
      current.files.push(data[0])  // Add the newly created file to the current folder's files
    }
  }
}

// Rename folder
const renameFolder = async (folder) => {
  const newName = prompt('Edit folder name:', folder.name)
  if (newName) {
    const { data, error } = await supabase
      .from('folders')
      .update({ name: newName })
      .eq('id', folder.id)
    
    if (error) {
      console.error('Error renaming folder:', error)
    } else {
      folder.name = newName  // Update the local folder name
    }
  }
}

// Delete folder
const deleteFolder = async (folder) => {
  if (confirm('Are you sure you want to delete this folder?')) {
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', folder.id)
    
    if (error) {
      console.error('Error deleting folder:', error)
    } else {
      const index = folders.value.indexOf(folder)
      if (index > -1) folders.value.splice(index, 1)  // Remove folder from local state
    }
  }
}

// Edit file details
const editFile = async (file) => {
  const details = prompt('Enter details for this file:', file.details)
  if (details !== null) {
    const { data, error } = await supabase
      .from('files')
      .update({ details })
      .eq('id', file.id)
    
    if (error) {
      console.error('Error editing file:', error)
    } else {
      file.details = details  // Update the file details locally
    }
  }
}

// Delete file
const deleteFile = async (file) => {
  if (confirm('Are you sure you want to delete this file?')) {
    const { error } = await supabase
      .from('files')
      .delete()
      .eq('id', file.id)
    
    if (error) {
      console.error('Error deleting file:', error)
    } else {
      const folder = currentFolder()
      const index = folder.files.indexOf(file)
      if (index > -1) folder.files.splice(index, 1)  // Remove file from local state
    }
  }
}

// File viewing
const selectedFile = ref(null)
const fileDialog = ref(false)

const viewFile = (file) => {
  selectedFile.value = file
  fileDialog.value = true
}

// Load initial folders and files
onMounted(async () => {
  await fetchFolders()
})
</script>




<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar color="#561C24" dark flat>
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-img src="/images/img/buenalogo.png" height="40" width="40" class="mr-2" />
        </div>
        <div>
          <v-btn text to="/dashboard">Home</v-btn>
          <v-btn text to="/bhws">BHW's</v-btn>
          <v-btn text to="/records">Records</v-btn>
          <v-btn text to="/calendar">Calendar</v-btn>
          <v-btn text to="/inventory">Inventory</v-btn>
          <v-btn text to="/">Log out</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="mt-1" style="background-color: #d6c3aa; min-height: 100vh; position: relative">

      <v-btn
        v-if="currentPath.length"
        @click="goBack"
        variant="text"
        style="position: absolute; top: 80px; left: 30px;"
      >
        <v-icon left>mdi-arrow-left</v-icon> Back
      </v-btn>

      <!-- Folder and Files Grid -->
      <div
        style="position: absolute; top: 140px; left: 50px; right: 50px; display: flex; flex-wrap: wrap; gap: 40px;"
      >
        <!-- Folders -->
        <div
          v-for="(folder, index) in (currentFolder() ? currentFolder().subfolders : folders)"
          :key="folder.name"
          style="display: flex; flex-direction: column; align-items: center; position: relative; width: 120px;"
        >
          <!-- Folder & 3 dots side-by-side -->
          <div style="display: flex; align-items: center; justify-content: center; position: relative;">
            <v-icon size="80" color="orange" style="cursor: pointer;" @click="openFolder(folder.name)">
              mdi-folder
            </v-icon>

            <!-- 3 Dots Vertical -->
            <v-menu offset-y>
              <template #activator="{ props }">
                <v-btn icon v-bind="props" variant="text" size="small" style="margin-left: 4px;">
                  <v-icon size="20">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="renameFolder(folder)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteFolder(index)">
                  <v-list-item-title class="text-error">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <!-- Folder Name -->
          <span class="folder-name">{{ folder.name }}</span>
        </div>

        <!-- Files -->
        <div
          v-for="(file, index) in (currentFolder()?.files || [])"
          :key="file.name"
          style="display: flex; flex-direction: column; align-items: center; position: relative; width: 120px;"
        >
          <div style="display: flex; align-items: center; justify-content: center; position: relative;">
            <v-icon size="80" color="blue" style="cursor: pointer;" @click="viewFile(file)">
              mdi-file
            </v-icon>

            <v-menu offset-y>
              <template #activator="{ props }">
                <v-btn icon v-bind="props" variant="text" size="small" style="margin-left: 4px;">
                  <v-icon size="20">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editFile(file)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteFile(index)">
                  <v-list-item-title class="text-error">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <!-- File Name -->
          <span class="folder-name">{{ file.name }}</span>
        </div>
      </div>

      <!-- Floating Create Button -->
      <div
        style="position: absolute; bottom: 30px; right: 30px; display: flex; flex-direction: column; align-items: flex-end;"
      >
        <div v-if="showCreateOptions" style="background: white; padding: 8px; border-radius: 8px; margin-bottom: 8px;">
          <v-btn variant="text" size="small" @click="currentFolder() ? createFile() : createFolder()">
            {{ currentFolder() ? 'Create New File' : 'Create New Folder' }}
          </v-btn>
        </div>

        <v-btn icon color="#561C24" @click="toggleOptions">
          <v-icon size="32">mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-main>

    <!-- File Details Dialog -->
    <v-dialog v-model="fileDialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ selectedFile?.name }}
        </v-card-title>
        <v-card-text>
          <div v-if="selectedFile">
            {{ selectedFile.details || 'No details available.' }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="fileDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Footer -->
    <v-footer color="#561C24" padless>
      <v-container class="text-center text-white py-4">
        © {{ new Date().getFullYear() }} BHS - Buenavista Health Sync
      </v-container>
    </v-footer>
  </v-app>
</template>


<style scoped>
.search-bar {
  position: absolute;
  top: 20px;
  right: 30px;
  width: 260px;
  height: 50px;
  border-radius: 40px;
  background: white;
  box-shadow: none;
}

.folder-name {
  margin-top: 1px;
  background-color: white;
  padding: 2px 8px;
  border-radius: 6px;
  text-align: left;  /* Align text to the left */
  white-space: nowrap;
}

</style>
