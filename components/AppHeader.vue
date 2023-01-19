<template>
  <header class="px-4 h-16 flex flex-row align-middle text-center bg-opacity-80 shadow-md">
    <NuxtLink to="/" class="flex-none my-auto">
      <AppButton class="p-2 flex flex-row items-center">
        <span class="mr-2">
          <svg
            class="w-6 h-6 fill-primary"
            viewBox="0 0 768 768"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 256h768v128H0V256zm320 128h128v384H320V384zM0 0h768v128H0V0z"
            />
          </svg>
        </span>
        <span class="font-bold text-lg">Kiyoshi's Blog</span>
      </AppButton>
    </NuxtLink>
    <AppNav />
  </header>
</template>
