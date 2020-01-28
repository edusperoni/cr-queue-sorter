import { getValidShowConfig, LocalStorageConfig, ShowConfig } from "./config";
import { Observer } from "./observer";
import { TimeoutScheduler } from "./scheduler";
import { appendStyle, DomChangeHelper } from "./util";
import { QueueSorter } from "./queue-sorter";

export const prefix = "crqueuesort";

const typeOrder: ("hold" | "current" | "backlog")[] = ["current", "backlog", "hold"];

(() => {

    const queueSorter = new QueueSorter({
        configManager: new LocalStorageConfig(),
        scheduler: new TimeoutScheduler(10)
    });
    queueSorter.init();

})();