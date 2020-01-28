import { currentWindow } from "../window";
import { Scheduler } from "./common";

export class TimeoutScheduler implements Scheduler {
    private timerId: number | undefined;
    constructor(private timeInMs: number, public callback?: ()=> any) { }

    schedule() {
        if (this.timerId !== undefined) {
            return;
        }
        this.timerId = currentWindow.setTimeout(() => {
            this.timerId = undefined;
            if(this.callback) {
                this.callback();
            }
        }, this.timeInMs);
    };
}