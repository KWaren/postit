<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Card from '../components/Card.vue';
import { ref, onMounted, computed } from 'vue';

import { usePostIt } from "@/store/postIt";
import { useRouter } from 'vue-router';

const router = useRouter();
const store = usePostIt();
const postIts = computed(() => store.postIts);
const load = ref(true)
const erreur = ref('')

onMounted(async () => {
    const result = await store.getData();
    if (result.success) {
        load.value = false
    } else {
        erreur.value = "Impossible de charger les post-its.";
        load.value = false
    }
})
</script>

<template>
    <section class="flex justify-center py-10">
        <RouterLink :to="{ name: 'notes.create' }"
            class=" flex bg-blue-600  p-3 mr-3  text-white cursor-pointer rounded-md hover:bg-blue-800 hover:scale-102 transition  duration-300 ease-in-out ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 mr-3 bg-blue-700  rounded-sm">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouveau Post-It
        </RouterLink>
    </section>
    <Card :load="load" :postIts="postIts" :erreur="erreur"></Card>
</template>