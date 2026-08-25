<template>
  <div class=" flex items-center justify-center bg-gray-100">
        <div class="loader mt-40" v-if="load"></div>
    <div v-else-if="erreur">
      {{ erreur }}
    </div>
    <form v-else class="flex flex-col min-h-[50vh] px-8 pt-8 my-15 w-[60vw] shadow-lg rounded-lg bg-white " @submit.prevent="update"
      method="post">
       <h2 class="text-4xl font-bold text-blue-900 pb-1">Modifier ce post it</h2>
      <div v-for="erreur in erreurs" class="w-full my-2 flex justify-center ">
        <p class="w-[80%] py-2 text-center border text-red-600 rounded-lg bg-red-300 ">{{ erreur }}</p>
      </div>
      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required />
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" rows="8"  required></textarea>
      <button class=" mt-2 py-4  mb-10 px-2 bg-blue-600 hover:bg-blue-700 duration-200 text-white cursor-pointer" type="submit">Enregistrer</button>
    </form>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostIt } from "@/store/postIt";
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = usePostIt();
const erreurs=ref([])
const load=ref(true)
const erreur=ref(null)
const title = ref('')
const content = ref('')
const date = ref('')

onMounted(async () => {
  const postIt = await store.getOnePostIt(route.params._id);
  if (postIt.success) {
    title.value = postIt.data.title
    content.value = postIt.data.content[0]
    date.value = postIt.data.updatedAt
    load.value = false
  } else {
    erreur.value = "Impossible de charger ce Post-It.";
    load.value = false;
  }
});
async function update() {
  erreurs.value = [];
  if (title.value === null || title.value.trim() == "") {
    erreurs.value.push("Titre incorrect");
  }
  if (content.value === null || content.value.trim() == "") {
    erreurs.value.push("Description incorrect");
  }
  if (erreurs.value.length === 0) {
    const result = await store.updatePostIt(route.params._id, { title: title.value, content: content.value })
    if (!result.success) {
      erreurs.value.push("Impossible de mettre à jour ce post-it, veuillez réessayer.");
    }
  }
  if (erreurs.value.length > 0) {
    setTimeout(removeError, 5000);
    function removeError() {
      erreurs.value = []
    }
  }
}
</script>