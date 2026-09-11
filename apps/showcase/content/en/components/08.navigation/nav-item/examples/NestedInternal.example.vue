<script lang="ts" setup>
import { OnyxNavItem } from "sit-onyx";
</script>

<template>
  <OnyxNavItem label="Page 1" link="/page-1">
    <template #children>
      <OnyxNavItem label="Page 1.1" link="/page-1/1">
        <template #children>
          <OnyxNavItem label="Page 1.1.1" link="/page-1/1/1" />
          <OnyxNavItem label="Page 1.1.2" link="/page-1/1/2" />

          <OnyxNavItem label="Page 1.1.3" link="/page-1/1/3">
            <template #children>
              <OnyxNavItem label="Page 1.1.3.1" link="/page-1/1/3/1" />
              <OnyxNavItem label="Page 1.1.3.2" link="/page-1/1/3/2" />
              <OnyxNavItem label="Page 1.1.3.3" link="/page-1/1/3/3" />
            </template>
          </OnyxNavItem>
        </template>
      </OnyxNavItem>

      <OnyxNavItem label="Page 1.2" link="/page-1/2" />
      <OnyxNavItem label="Page 1.3" link="/page-1/3" />
    </template>
  </OnyxNavItem>
</template>
