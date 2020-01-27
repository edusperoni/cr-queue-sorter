export class Observer {
    private _listeners: MutationCallback[] = [];
    constructor(public target: Node) { }
    registerCallback(cb: MutationCallback) {
        this._listeners.push(cb);
    }
    config = { attributes: false, childList: true, subtree: false };
    callback: MutationCallback = (mutationsList, observer) => {
        for (const listener of this._listeners) {
            listener(mutationsList, observer);
        }
    };

    observer: MutationObserver | null = null;
    connect() {
        if (!this.observer) {
            this.observer = new MutationObserver(this.callback);
        }
        this.observer.observe(this.target, this.config);
    }
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}