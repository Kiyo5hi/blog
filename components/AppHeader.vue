<template>
  <header class="px-4 h-24 md:h-16 flex flex-col md:flex-row items-center justify-center">
    <NuxtLink to="/">
      <AppButton class="p-2 flex flex-row items-center" highlight scale>
        <span class="mr-2">
          <AppLogo class="w-6 h-6 fill-primary" />
        </span>
        <span class="font-bold text-lg">Kiyoshi's Blog</span>
      </AppButton>
    </NuxtLink>
    <AppNav class="text-slate-400 md:flex-1 md:flex-row md:justify-end" />
  </header>
</template>
