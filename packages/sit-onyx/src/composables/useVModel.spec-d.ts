import { expectTypeOf, test } from "vitest";
import type { Ref } from "vue";
import type { Nullable } from "../types/utils.js";
import { useVModel } from "./useVModel.js";

test("should type correctly without default value", () => {
  const props = defineProps<{
    open?: Nullable<boolean>;
  }>();
  const emit = defineEmits<{
    "update:open": [open?: Nullable<boolean>];
  }>();

  const _value = useVModel({
    props,
    key: "open",
    emit,
  });

  expectTypeOf<typeof _value>().toEqualTypeOf<Ref<Nullable<boolean>>>();
  expectTypeOf<typeof _value>().not.toEqualTypeOf<Ref<boolean>>();
});

test("should type correctly with default value", () => {
  const props = defineProps<{
    open?: Nullable<boolean>;
  }>();
  const emit = defineEmits<{
    "update:open": [open: boolean];
  }>();

  const _value = useVModel({
    props,
    key: "open",
    emit,
    default: false,
  });

  expectTypeOf<typeof _value>().toEqualTypeOf<Ref<boolean>>();
  expectTypeOf<typeof _value>().not.toEqualTypeOf<Ref<Nullable<boolean>>>();
});
