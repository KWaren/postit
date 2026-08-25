<template>
  <TransitionGroup v-if="messages.length" tag="div" name="alert" class="my-2 flex w-full flex-col items-center gap-2">
    <div v-for="(message, i) in messages" :key="message + i"
      class="flex w-[80%] items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="mt-0.5 size-5 shrink-0 text-red-500">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
      <p class="leading-snug">{{ message }}</p>
    </div>
  </TransitionGroup>
</template>
<script setup>
defineProps({
  messages: { type: Array, default: () => [] }
})
</script>
<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.2s ease;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
