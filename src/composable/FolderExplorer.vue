<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()

const folders = ref([])
const currentPath = ref([])
const showCreateOptions = ref(false)
const selectedFile = ref(null)
const fileDialog = ref(false)

const toggleOptions = () => {
  showCreateOptions.value = !showCreateOptions.value
}

const fetchRootFolders = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('parent_id', null)

  if (error) return console.error('Failed to load root folders:', error)

  folders.value = data.map(f => ({ ...f, subfolders: [], files: [] }))
}

const currentFolder = () => {
  let node = null
  for (const name of currentPath.value) {
    const found = (node ? node.subfolders : folders.value).find(f => f.name === name)
    if (!found) return null
    node = found
  }
  return node
}

const openFolder = async (folderName) => {
  currentPath.value.push(folderName)
  const folder = currentFolder()
  if (!folder || folder.subfolders.length || folder.files.length) return

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('parent_id', folder.id)

  if (error) return console.error('Failed to fetch subfolders:', error)

  folder.subfolders = data.filter(item => item.type === 'folder').map(f => ({ ...f, subfolders: [], files: [] }))
  folder.files = data.filter(item => item.type === 'file')
}

const goBack = () => currentPath.value.pop()

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
