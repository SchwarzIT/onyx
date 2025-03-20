<template>
  <OnyxAppLayout class="onyx-grid-max-md onyx-grid-center">
    <template #navBar>
      <NavBar />
    </template>

    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <slot>
        <NuxtPage />
      </slot>
    </NuxtLayout>

    <OnyxToast />
  </OnyxAppLayout>
</template>
