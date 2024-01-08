/**
 * ⛔️ DO NOT USE DIRECTLY! ⛔️
 * Use the {@link nextId} function instead!
 */
let globalCounter = 0;

const nextId = () => globalCounter++;

export const createId = (name: string) => `${name}-${nextId()}`;
