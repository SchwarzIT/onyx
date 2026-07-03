// Source - https://stackoverflow.com/a/79299137
// Posted by David Archibald
// Retrieved 2026-06-26, License - CC BY-SA 4.0

interface FunctionSignature {
  parameters: AnyArray;
  returnType: unknown;
}

// May look like a no-op but in actuality strips out everything except properties.
// This means it removes function signatures, constructor signatures, etc.
type ToObject<T extends object> = {
  [K in keyof T]: T[K];
};

// @ts-expect-error - This is a core type that unfortunately intrinsically has an error.
// The issue with a type like this is in theory they could overlap and the resulting type
// could become something like `never` or something ill-behaved.
// Fortunately this is used to add an overload which can never really conflict
// and so is pretty safe.
interface AddSignature<T extends object, Params extends AnyArray, Return> extends T {
  //    ^ Interface 'AddSignature<T, Params, Return>' incorrectly extends interface 'T'.
  //        'AddSignature<T, Params, Return>' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'object'.
  // The above is the suppressed error

  (...args: Params): Return;
}

export type GetFunctionOverloads<
  T extends AnyFunction,
  Shape extends object = ToObject<T>,
  Signatures extends FunctionSignature[] = [],
> = Shape extends T
  ? Signatures
  : T extends AddSignature<Shape, infer Params, infer Return>
    ? GetFunctionOverloads<
        T,
        AddSignature<Shape, Params, Return>,
        // This would be the second.
        [{ parameters: Params; returnType: Return }, ...Signatures]
      >
    : Signatures;

// This type is written this way intentionally.
// It does truly allow any function to be assigned to it.
// However `...args: any[]` can be very type unsafe, this is much safer.
type AnyFunction = (arg0: never, ...args: never[]) => unknown;

type AnyArray = readonly unknown[];
