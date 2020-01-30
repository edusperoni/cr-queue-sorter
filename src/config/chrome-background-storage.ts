import { GetConfigMessage, GetConfigResponse, SaveConfigMessage } from "../messaging/config.messages";
import { ChromeErrorResponse, isError } from "../messaging/message";
import { AppConfig, BaseConfigManager } from "./base";

function getConfig() {
    return new Promise<AppConfig>((resolve, reject) => {
        const message: GetConfigMessage = {
            operation: "GetConfig"
        };
        chrome.runtime.sendMessage(message, (response: GetConfigResponse | ChromeErrorResponse) => {
            if (isError(response)) {
                reject(response.error);
                return;
            }
            resolve(response.config);
        });
    });
}

function saveConfig(config: AppConfig) {
    return new Promise<void>((resolve, reject) => {
        const message: SaveConfigMessage = {
            config,
            operation: "SaveConfig"
        };
        chrome.runtime.sendMessage(message, (response) => {
            if (isError(response)) {
                reject(response.error);
                return;
            }
            resolve();
        });
    });
}

export class ChromeBackgroundStorage extends BaseConfigManager {

    async getConfig() {
        return await getConfig();
    }
    async saveConfig(config: AppConfig) {
        return saveConfig(config);
    }
}