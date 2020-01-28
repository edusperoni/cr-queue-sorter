import { Scheduler } from "./common";

export class MicroTaskScheduler implements Scheduler {
    promise: Promise<any> | undefined;
    constructor(public callback?: () => any) { }

    schedule() {
        if (this.promise) { return; }
        this.promise = Promise.resolve().then(() => {
            this.promise = undefined;
            if(this.callback) {
                this.callback();
            }
        });
    }
}