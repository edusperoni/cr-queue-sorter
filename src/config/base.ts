import deepEqual from "fast-deep-equal";

export interface ShowConfig {
    order: number;
    type: "hold" | "current" | "backlog";
}
export interface AppConfig {
    shows: { [k: string]: ShowConfig },
    topItem: number;
}

export function defaultAppConfig(): AppConfig {
    return {
        topItem: 100,
        shows: {}
    };
}
export function getValidAppConfig(v: object | null | undefined): AppConfig {
    return { ...defaultAppConfig(), ...(v || {}) };
}

export function defaultShowConfig(): ShowConfig {
    return {
        order: 100,
        type: "current"
    };
}
export function getValidShowConfig(v: object | null | undefined): ShowConfig {
    return { ...defaultShowConfig(), ...(v || {}) };
}

export type WithConfigRun = (config: AppConfig) => void | Promise<void>;

export interface ConfigManager {
    getConfig(): Promise<AppConfig>;
    saveConfig(config: AppConfig): Promise<void>;
    withConfig(run: WithConfigRun): Promise<void>;
}

export abstract class BaseConfigManager implements ConfigManager {
    abstract getConfig(): Promise<AppConfig>;
    abstract saveConfig(config: AppConfig): Promise<void>;
    async withConfig(run: WithConfigRun) {
        const config = await this.getConfig();
        await run(config);
        await this.saveConfig(config);
    };
}



export function isConfigEqual(a?: AppConfig, b?: AppConfig) {
    return deepEqual(a, b);
}
