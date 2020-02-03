import { Observable, fromEventPattern } from "rxjs";


export function sendMessage({ extensionId = chrome.runtime.id, message, options = {} }: { extensionId?: string, message: any, options?: chrome.runtime.MessageOptions }) {
    return new Observable((subscriber) => {
        chrome.runtime.sendMessage(extensionId, message, options, (response) => {
            if (!subscriber.closed) {
                const lastError = chrome.runtime.lastError;
                if (lastError) {
                    subscriber.error(lastError);
                    return;
                }
                subscriber.next(response);
                subscriber.complete();
            }
        })
    });
}

export function messageListener<T>(filter?: (request: any) => request is T) {
    return new Observable((subscriber) => {
        const wrapper = (request: T, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
            const lastError = chrome.runtime.lastError;
            if (lastError) {
                subscriber.error(lastError);
                return;
            }
            if (!filter || !filter(request)) {
                return;
            }
            const event = { async: false, request, sender, sendResponse };
            subscriber.next(event);
            return event.async;
        };
        chrome.runtime.onMessage.addListener(wrapper);
        return () => chrome.runtime.onMessage.removeListener(wrapper);
    });
}


