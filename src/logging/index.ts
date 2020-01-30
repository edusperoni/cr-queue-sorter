import { production } from "../environment";
// tslint:disable: no-console

export enum LogLevel {
    DEBUG = 0,
    INFO = 1
}

const APP_LOG_LEVEL = LogLevel.DEBUG;

export class Logger {
    private _logLevel?: LogLevel;
    public enabled = production ? false : true;
    get logLevel() {
        return this._logLevel !== undefined ? this._logLevel : APP_LOG_LEVEL;
    }
    set logLevel(level: LogLevel | undefined) {
        this._logLevel = level;
    }
    constructor(private scope: string) {}
    info(...messages: any[]) {
        this.log(LogLevel.INFO, ...messages);
    }
    debug(...messages: any[]) {
        this.log(LogLevel.DEBUG, ...messages);
    }

    private log(level: LogLevel, ...messages: any[]) {
        if(this.logLevel! < level || !this.enabled) { return; }
        console.log(`[${this.scope}]`, ...messages);
    }
}
