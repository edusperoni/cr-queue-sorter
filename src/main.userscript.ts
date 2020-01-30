import { LocalStorageConfig } from "./config";
import { QueueSorter } from "./queue-sorter";
import { TimeoutScheduler } from "./scheduler";

(() => {

    const queueSorter = new QueueSorter({
        configManager: new LocalStorageConfig(),
        scheduler: new TimeoutScheduler(10)
    });
    queueSorter.init();

})();