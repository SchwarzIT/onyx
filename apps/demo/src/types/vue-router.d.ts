import type { AuthRouteMeta } from '@sit/vue-core';
import 'vue-router';

/**
 * Typing the route meta fields of the vue-router.
 * For more information see: https://router.vuejs.org/guide/advanced/meta.html#typescript
 */
declare module 'vue-router' {
  interface RouteMeta extends AuthRouteMeta {}
}
