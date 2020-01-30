import { ChromeBackgroundStorage } from "./config";
import { Logger } from "./logging";
import { ChromeMessage } from "./messaging/message";
import { QueueSorter } from "./queue-sorter";
import { TimeoutScheduler } from "./scheduler";

(() => {
    const logger = new Logger("CR-QUEUE-SORTER");
    const queueSorter = new QueueSorter({
        configManager: new ChromeBackgroundStorage(),
        scheduler: new TimeoutScheduler(10)
    });
    chrome.runtime.onMessage.addListener(
        (request: ChromeMessage, sender, sendResponse) => {
            if (request.operation === "RevalidateConfig") {
                if (logger.enabled) {
                    logger.debug("Received revalidation request");
                }
                if(queueSorter.isConfigDirty()) {
                    if (logger.enabled) {
                        logger.debug("Queue is dirty, scheduling sort");
                    }
                    queueSorter.scheduleSort();
                }
            }
        });
    queueSorter.init();

})();