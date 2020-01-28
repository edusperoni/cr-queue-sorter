declare const unsafeWindow: Window | undefined;

export const currentWindow: Window = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;