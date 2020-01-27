
export class MicroTaskScheduler {
    promise: Promise<any> | undefined;
    constructor(private cb: () => any) { }

    schedule() {
        if (this.promise) { return; }
        this.promise = Promise.resolve().then(() => {
            this.promise = undefined;
            this.cb();
        });
    }
}