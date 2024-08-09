import { computed, type Ref, type WritableComputedOptions } from "vue";

export type AsymmetricComputedOptions<GetterT, SetterT> = {
  set: (v: SetterT) => void;
  get: () => GetterT;
};

export interface AsymmetricComputedRef<GetterT, SetterT> extends Ref {
  get value(): GetterT;
  set value(v: SetterT);
}

/**
 * Wrapper for `computed` that allows different typings for getter and setter.
 */
export const asymComputed = <GetT, SetT>(opts: AsymmetricComputedOptions<GetT, SetT>) =>
  computed(opts as WritableComputedOptions<unknown>) as AsymmetricComputedRef<GetT, SetT>;
