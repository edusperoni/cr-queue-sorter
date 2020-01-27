import { currentWindow } from "../window";

export class TimeoutScheduler {
    private timerId: number | undefined;
    constructor(private timeInMs: number, private cb: ()=> any) { }

    schedule() {
        if (this.timerId !== undefined) {
            return;
        }
        this.timerId = currentWindow.setTimeout(() => {
            this.timerId = undefined;
            this.cb();
        }, this.timeInMs);
    };
}