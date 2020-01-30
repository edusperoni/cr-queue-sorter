import { AppConfig, BaseConfigManager, getValidAppConfig } from "./base";

export class LocalStorageConfig extends BaseConfigManager {
    private static LOCAL_STORAGE_KEY = "crqueuesort_config";
    async getConfig() {
        const queueConfigStr = localStorage.getItem(LocalStorageConfig.LOCAL_STORAGE_KEY);
        const queueConfig = getValidAppConfig(queueConfigStr ? JSON.parse(queueConfigStr) : null);
        return queueConfig;
    }
    async saveConfig(config: AppConfig) {
        localStorage.setItem(LocalStorageConfig.LOCAL_STORAGE_KEY, JSON.stringify(config));
    }
}