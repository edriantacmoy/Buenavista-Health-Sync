<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const folders = ref([])
const currentPath = ref([])
const selectedFile = ref(null)
const fileDialog = ref(false)
const showCreateOptions = ref(false)

// Fetch top-level folders (no parent)
const fetchRootFolders = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('parent_id', null)

  if (error) {
    console.error('Failed to load root folders:', error)
    return
  }

  folders.value = data.map(f => ({ ...f, subfolders: [], files: [] }))
}

// Get current folder node based on path
const currentFolder = () => {
  let node = null
  for (const name of currentPath.value) {
    const found = (node ? node.subfolders : folders.value).find(f => f.name === name)
    if (!found) return null
    node = found
  }
  return node
}

// Open a folder and fetch its contents if not already loaded
const openFolder = async (folderName) => {
  currentPath.value.push(folderName)
  const folder = currentFolder()
  if (!folder || folder.subfolders.length > 0 || folder.files.length > 0) return

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('parent_id', folder.id)

  if (error) {
    console.error('Failed to fetch subfolders:', error)
    return
  }

  folder.subfolders = data.filter(item => item.type === 'folder').map(f => ({ ...f, subfolders: [], files: [] }))
  folder.files = data.filter(item => item.type === 'file')
}

const goBack = () => {
  currentPath.value.pop()
}

const toggleOptions = () => {
  showCreateOptions.value = !showCreateOptions.value
}

const createFolder = async () => {
  const name = prompt('New folder name:')
  if (!name) return
  const parent = currentFolder()

  const { data, error } = await supabase
    .from('items')
    .insert({
      name,
      type: 'folder',
      parent_id: parent?.id ?? null
    })
    .select()

  if (error) return console.error('Create folder error:', error)

  const target = parent ? parent.subfolders : folders.value
  target.push({ ...data[0], subfolders: [], files: [] })
}

const createFile = async () => {
  const name = prompt('New file name:')
  if (!name || !currentFolder()) return
  const parent = currentFolder()

  const { data, error } = await supabase
    .from('items')
    .insert({
      name,
      type: 'file',
      parent_id: parent.id,
      details: ''
    })
    .select()

  if (error) return console.error('Create file error:', error)

  parent.files.push(data[0])
}

const renameFolder = async (folder) => {
  const newName = prompt('Edit folder name:', folder.name)
  if (!newName) return

  const { error } = await supabase
    .from('items')
    .update({ name: newName })
    .eq('id', folder.id)

  if (!error) {
    folder.name = newName
  } else {
    console.error('Rename failed:', error)
  }
}

const deleteFolder = async (index) => {
  const folderList = currentFolder() ? currentFolder().subfolders : folders.value
  const folder = folderList[index]
  if (!folder || !confirm('Are you sure you want to delete this folder?')) return

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', folder.id)

  if (!error) {
    folderList.splice(index, 1)
  } else {
    console.error('Delete folder failed:', error)
  }
}

const editFile = async (file) => {
  const details = prompt('Enter details for this file:', file.details)
  if (details === null) return

  const { error } = await supabase
    .from('items')
    .update({ details })
    .eq('id', file.id)

  if (!error) {
    file.details = details
  } else {
    console.error('Edit file failed:', error)
  }
}

const deleteFile = async (index) => {
  const file = currentFolder()?.files[index]
  if (!file || !confirm('Are you sure you want to delete this file?')) return

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', file.id)

  if (!error) {
    currentFolder().files.splice(index, 1)
  } else {
    console.error('Delete file failed:', error)
  }
}

const viewFile = (file) => {
  selectedFile.value = file
  fileDialog.value = true
}

onMounted(fetchRootFolders)
</script>


<template>
  <div>
    <v-btn @click="goBack" v-if="currentPath.length">⬅️ Back</v-btn>
    <v-btn @click="createFolder">➕ New Folder</v-btn>
    <v-btn @click="createFile" v-if="currentFolder()">📄 New File</v-btn>

    <div class="folders">
      <div
        v-for="folder in currentFolder() ? currentFolder().subfolders : folders"
        :key="folder.id"
        class="folder"
        @click="openFolder(folder.name)"
      >
        <v-icon color="orange" size="60">mdi-folder</v-icon>
        <span>{{ folder.name }}</span>
      </div>
    </div>

    <div class="files" v-if="currentFolder() && currentFolder().files.length">
      <div v-for="file in currentFolder().files" :key="file.id" class="file">
        <v-icon color="blue" size="40">mdi-file</v-icon>
        <span>{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.folders, .files {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.folder, .file {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}
</style>
