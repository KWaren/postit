import router from "@/router";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

const API_URL = "https://post-it.epi-bluelock.bj/notes";

export const usePostIt = defineStore("postIt", () => {
  const postIts = ref([]);

  async function getData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }
      const data = await response.json();
      postIts.value = data.notes;
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async function addPostIt(postIt) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: postIt.title,
          content: [
            postIt.content
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }

      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async function getOnePostIt(_id) {
    try {
      const response = await fetch(API_URL + "/" + _id, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async function updatePostIt(_id, up) {
    try {
      const response = await fetch(API_URL + "/" + _id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: up.title,
          content: [
            up.content
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }

      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async function deleteOne(_id) {
    try {
      const response = await fetch(API_URL + "/" + _id, {
        method: "DELETE",
        headers: {
          "accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }

      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  function deleteAll() {
    postIts.value = [];
  }

  return {
    postIts,
    getData,
    addPostIt,
    getOnePostIt,
    updatePostIt,
    deleteAll,
    deleteOne,
  };
},
  {
    persist: true,
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostIt, import.meta.hot))
}
