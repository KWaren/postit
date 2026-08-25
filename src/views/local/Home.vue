<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

import { usePostIt } from "@/store/localPostIt";
import { useRouter } from 'vue-router';
import LocalCard from '@/components/LocalCard.vue';
const router = useRouter();
const store = usePostIt();
const postIts = computed(() => store.postIts);
const sortedPostIts = computed(() => {
  return [...store.postIts].sort((a, b) => b._id - a._id);
});
const load = ref(true)
const erreur = ref('')
function deleteAll() {
    store.deleteAll();
    window.location.reload();
}

onMounted(() => {
    if (store.postIts.length === 0) {
        erreur.value = "Aucun post-it trouvé.";
    }
    load.value = false
})



</script>

<template>
    <section class="flex justify-center py-10">
        <RouterLink :to="{ name: 'local.notes.create' }"
            class=" flex bg-blue-600  p-3 mr-3  text-white cursor-pointer rounded-md hover:bg-blue-800 hover:scale-102 transition  duration-300 ease-in-out ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 mr-3 bg-blue-700  rounded-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouveau Post-It
        </RouterLink>
        <button @click="deleteAll"
            class=" flex bg-red-100 border p-3 mx-3  text-red-600 cursor-pointer rounded-md hover:bg-red-500 hover:text-white transition  duration-300 ease-in-out ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

            Supprimer tout
        </button>
    </section>
    <LocalCard :load="load" :postIts="sortedPostIts" :erreur="erreur"></LocalCard>
</template>