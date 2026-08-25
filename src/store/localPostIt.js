import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostIt = defineStore("localPostIt", () => {
  const postIts = ref([]);

  function addPostIt(postIt) {
    const date = new Date();
    const dateLocale = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    postIt._id = Date.now();
    postIt.createdAt = dateLocale;
    postIt.updatedAt = dateLocale;
    postIts.value.push(postIt);
    router.push('/local');
  }

  function getOnePostIt(_id) {
    const data = postIts.value.find((a) => a._id == _id);

    if (data) {
      return { success: true, data }
    }else{
      return   { success: false }
    }
  }

  function updatePostIt(_id, up) {
    const date = new Date();
    const dateLocale = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    up.updatedAt = dateLocale;
    const index = postIts.value.findIndex((a) => a._id == _id);
    if (index != -1) {
      postIts.value[index] = { ...postIts.value[index], ...up };
    }
    router.push('/local');

  }

  function deleteAll() {
    postIts.value = [];
  }

  function deleteOne(_id) {
    postIts.value = postIts.value.filter((a) => a._id != _id);
    router.push('/local');
  }

  return {
    postIts,
    addPostIt,
    getOnePostIt,
    updatePostIt,
    deleteAll,
    deleteOne,
  };
}, {
    persist: {
    key: "localPostIt", 
    storage: localStorage, 
  },
});
