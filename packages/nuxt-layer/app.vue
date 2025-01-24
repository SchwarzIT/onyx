<template>
  <OnyxAppLayout class="onyx-grid-max-md onyx-grid-center">
    <template #navBar>
      <NavBar />
    </template>

    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </OnyxAppLayout>
</template>
