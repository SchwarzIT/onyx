import type { InjectionKey, ShallowRef } from "vue";

export const FORM_PAGE_INJECTION_KEY = Symbol() as InjectionKey<{
  footerRef: Readonly<ShallowRef<HTMLElement | null>>;
}>;
