import { currentWindow } from "../window";
import { Scheduler } from "./common";

export class TimeoutScheduler implements Scheduler {
    private timerId: number | undefined;
    throttlingMethod: "debounce" | "throttle" = "throttle";
    debounceTimer: number | undefined;
    constructor(private timeInMs: number, public callback?: ()=> any) { }

    schedule() {
        if (this.timerId !== undefined) {
            if(this.throttlingMethod === "debounce") {
                currentWindow.clearTimeout(this.timerId);
                this.timerId = undefined;
            } else {
                return;
            }
        }
        this.timerId = currentWindow.setTimeout(() => {
            this.timerId = undefined;
            if(this.callback) {
                this.callback();
            }
        }, this.timeInMs);
    };
}