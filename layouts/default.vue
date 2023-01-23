<template>
  <div class="min-h-screen bg-slate-200 dark:bg-slate-900 dark:text-white">
    <AppHeader id="top" class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
    <div class="p-4">
      <slot />
    </div>
    <AppFooter class="bg-white dark:bg-slate-800 bg-opacity-80 shadow-md" />
    <AppButton class="bg-slate-200 dark:bg-slate-700 shadow-md fixed bottom-5 right-5" highlight>
      <NuxtLink to="#top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 p-1"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      </NuxtLink>
    </AppButton>
  </div>
</template>
