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


export abstract class BaseConfigManager {
    abstract getConfig(): AppConfig;
    abstract saveConfig(config: AppConfig): void;
    withConfig(run: (config: AppConfig) => any) {
        const config = this.getConfig();
        run(config);
        this.saveConfig(config);
    };
}
