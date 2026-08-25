<template>
  <div class=" flex items-center justify-center bg-gray-100">
        <div class="loader mt-40" v-if="load"></div>
    <ErrorState v-else-if="erreur" :message="erreur" />
    <form v-else class="flex flex-col min-h-[50vh] px-8 py-6 my-15 w-[60vw] shadow-lg rounded-lg bg-white " @submit.prevent="update"
      method="post">
            <h2 class="text-4xl font-bold text-blue-900 pb-1">Modifier ce post it</h2>

      <ErrorAlert :messages="erreurs" />

      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required/>
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" rows="8" required ></textarea>
      <button class=" mt-2 py-4 mb-10 px-2 bg-blue-600 hover:bg-blue-700 duration-200 text-white cursor-pointer" type="submit">Enregistrer</button>
    </form>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostIt } from "@/store/localPostIt";
import { useRouter, useRoute } from 'vue-router'
import ErrorState from '@/components/ErrorState.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
const route = useRoute()
const router = useRouter()
const store = usePostIt();
const load=ref(true)
const erreurs=ref([])
const erreur=ref("")
const title = ref('')
const content = ref('')
const date = ref('')

onMounted(async () => {
  const postIt = await store.getOnePostIt(route.params._id);
  if (postIt.success) {
    title.value = postIt.data.title
    content.value = postIt.data.content
    date.value = postIt.data.updatedAt
    load.value = false
  } else {
    erreur.value = "Impossible de charger ce Post-It.";
    load.value = false;

  }
});
function update() {
  erreurs.value = [];
  if (title.value === null || title.value.trim() == "") {
    erreurs.value.push("Titre incorrect");

  }
   if (content.value === null || content.value.trim() == "") {
    erreurs.value.push("Description incorrect");
  }
  if(erreurs.value.length===0){

    store.updatePostIt(route.params._id, { title: title.value, content: content.value })
  }
  else{
    setTimeout(removeError, 5000);
    function removeError() {
      erreurs.value= []
    }
  }
  

}
</script>