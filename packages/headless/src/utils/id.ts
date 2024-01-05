/**
 * ⛔️ DO NOT USE DIRECTLY! ⛔️
 * Use the {@link nextID} function instead!
 */
let continuousID = 0;

const nextID = () => continuousID++;

export const createId = (name: string) => `${name}-${nextID()}`;
