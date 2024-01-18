import { vi } from 'vitest';

/** Workaround for createObjectURL not available in test browsers (needed when CoreUI flags are used) */
window.URL.createObjectURL = vi.fn();
