import { ChromeSyncStorage } from "./config/chrome-sync-storage";
import { Logger } from "./logging";
import { asSaveConfigMessage, GetConfigResponse, RevalidateConfigMessage } from "./messaging/config.messages";
import { ChromeErrorResponse, ChromeMessage } from "./messaging/message";


const logger = new Logger("BACKGROUND");

const configManager = new ChromeSyncStorage();
configManager.onConfigChanged = () => {
    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            if (tab.id !== undefined) {
                chrome.tabs.sendMessage(tab.id, { operation: "RevalidateConfig" } as RevalidateConfigMessage);
            }
        }
    });
};


chrome.runtime.onMessage.addListener(
    (request: ChromeMessage, sender, sendResponse: (ChromeErrorResponse | any)) => {
        if (logger.enabled) {
            logger.debug("Received message", request);
        }
        switch (request.operation) {
            case "GetConfig":
                configManager.getConfig().then((config) => sendResponse({ config } as GetConfigResponse));
                return 1;
            case "SaveConfig":
                const saveConfigMessage = asSaveConfigMessage(request)!;
                configManager.saveConfig(saveConfigMessage.config).then(
                    () => sendResponse({}),
                    (error) => sendResponse({ error }));
                return 1;
        }
    });
