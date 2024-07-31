<script lang="ts" setup>
import { ref } from "vue";
import { OnyxButton, OnyxInput } from "../../..";

type FormState = {
  username: string;
  password: string;
  email: string;
  value?: number;
};

const state = ref<Partial<FormState>>({});

const handleSubmit = () => {
  alert("Form submitted");
};
</script>

<template>
  <div>
    <pre>Form state: {{ state }}</pre>

    <form class="onyx-grid" @submit.prevent="handleSubmit" @reset="state = {}">
      <OnyxInput
        v-model="state.username"
        class="onyx-grid-span-4"
        label="Username"
        autocomplete="username"
        :minlength="3"
        :maxlength="16"
        with-counter
        required
      />
      <OnyxInput
        v-model="state.password"
        class="onyx-grid-span-4"
        label="Password"
        type="password"
        autocomplete="current-password"
        :minlength="8"
        with-counter
        required
      />
      <OnyxInput
        v-model="state.email"
        class="onyx-grid-span-4"
        label="Email"
        type="email"
        autocomplete="email"
        required
      />

      <div class="onyx-grid-span-16">
        <OnyxButton label="Reset" type="reset" color="neutral" />
        <OnyxButton label="Submit" type="submit" />
      </div>
    </form>
  </div>
</template>
