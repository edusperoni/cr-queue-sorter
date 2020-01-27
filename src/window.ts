declare const unsafeWindow: Window | undefined;

export const currentWindow: Window = unsafeWindow || window;