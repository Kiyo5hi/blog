<template>
  <header class="px-4 h-24 md:h-16 flex flex-col md:flex-row items-center justify-center bg-opacity-80 shadow-md">
    <NuxtLink to="/">
      <AppButton class="p-2 flex flex-row items-center" highlight scale>
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
    <AppNav class="md:flex-1 md:flex-row md:justify-end" />
  </header>
</template>
