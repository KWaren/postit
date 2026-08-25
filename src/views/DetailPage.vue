<template>
  <div class=" flex items-center justify-center">
    <div class="loader mt-40" v-if="load"></div>
    <ErrorState v-else-if="erreur" :message="erreur" />
    <div v-else class="flex flex-col flex-wrap bg-blue-200 min-h-[60vh] my-15 w-[80vw] p-8 shadow rounded-xl ">
      <div class="flex w-full">
        <h2 class="break-all text-3xl font-bold ">{{ title }}</h2>
      </div>
      <p class="pt-6 break-all ">{{ content[0] }}</p>
      <p class="py-2">Date: {{ date }}</p>
      <div class="mt-4 flex items-center">
        <RouterLink :to="{ name: 'notes.update', params: { _id: route.params._id } }" class="bg-green-700 rounded-md hover:bg-green-800 text-white px-8 py-2 mx-4 min-w-20">
          Modifier
        </RouterLink>
        <button @click="deleteOne" class="bg-red-700 hover:bg-red-800 rounded-md text-white px-8 py-2 mx-4 min-w-20">
          Supprimer
        </button>
      </div>
      <ErrorAlert :messages="deleteErreur ? [deleteErreur] : []" />

    </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostIt } from "@/store/postIt";
import { useRouter, useRoute, RouterLink } from 'vue-router';
import ErrorState from '@/components/ErrorState.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
const route = useRoute()
const router = useRouter()
const store = usePostIt();
const load = ref(true)
const erreur = ref(null)
const deleteErreur = ref(null)
const title = ref('')
const content = ref('')
const date = ref('')

onMounted(async () => {
  const postIt = await store.getOnePostIt(route.params._id)
  if (postIt.success) {
    title.value = postIt.data.title
    content.value = postIt.data.content
    date.value = postIt.data.updatedAt
    load.value = false
  } else {
    erreur.value = "Impossible de charger ce Post-It.";
    load.value = false;
  }
})
async function deleteOne() {
  const result = await store.deleteOne(route.params._id);
  if (!result.success) {
    deleteErreur.value = "Impossible de supprimer ce post-it, veuillez réessayer.";
  }
}
</script>