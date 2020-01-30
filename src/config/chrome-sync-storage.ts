import { Logger, LogLevel } from "../logging";
import { TimeoutScheduler } from "../scheduler";
import { AppConfig, BaseConfigManager, getValidAppConfig, isConfigEqual } from "./base";

const logger = new Logger("CHROMESYNC");
logger.logLevel = LogLevel.DEBUG;

function getStorageData(key: string | string[] | object | null) {
    if (logger.enabled) { logger.debug("Getting keys", key) };
    return new Promise<{ [key: string]: any }>((resolve, reject) =>
        chrome.storage.sync.get(key, (result) =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(result)
        ));
}

function getSingleStorageData(key: string) {
    return getStorageData(key).then((result) => result[key]);
}

function setStorageData(data: any) {
    if (logger.enabled) { logger.debug("setting datas:", Object.keys(data)) };
    return new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        ));
}

function setSingleStorageData(key: string, data: any) {
    const updateObj: any = {};
    updateObj[key] = data;
    return setStorageData(updateObj);
}

export class ChromeSyncStorage extends BaseConfigManager {
    private static STORAGE_KEY = "crqueuesort_config";
    private configCache?: AppConfig = undefined;
    private throttleScheduler = new TimeoutScheduler(5000, () => this._saveConfig());
    public onConfigChanged?: () => void;

    constructor() {
        super();
        this.throttleScheduler.throttlingMethod = "debounce";
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (!changes[ChromeSyncStorage.STORAGE_KEY] || areaName !== "sync") {
                return;
            }
            if (logger.enabled) { logger.debug("Received changes", changes) };
            const config = changes[ChromeSyncStorage.STORAGE_KEY].newValue ? JSON.parse(changes[ChromeSyncStorage.STORAGE_KEY].newValue) : null;
            if (isConfigEqual(this.configCache, config)) {
                if (logger.enabled) { logger.debug("Config is equal, skipping save/schedule"); }
            } else {
                this.configCache = getValidAppConfig(config);
                if (this.onConfigChanged) {
                    this.onConfigChanged();
                }
            }
        });
    }

    async getConfig() {
        if (this.configCache) {
            return this.configCache;
        }
        const queueConfigStr = await getSingleStorageData(ChromeSyncStorage.STORAGE_KEY);
        const queueConfig = getValidAppConfig(queueConfigStr ? JSON.parse(queueConfigStr) : null);
        this.configCache = queueConfig;
        return queueConfig;
    }
    async saveConfig(config: AppConfig) {
        if (isConfigEqual(this.configCache, config)) {
            if (logger.enabled) { logger.debug("Config is equal, skipping save/schedule"); }
        } else {
            this.configCache = config;
            this.throttleScheduler.schedule();
            if (this.onConfigChanged) {
                this.onConfigChanged();
            }
        }
    }

    private _saveConfig() {
        setSingleStorageData(ChromeSyncStorage.STORAGE_KEY, JSON.stringify(this.configCache));
    }
}