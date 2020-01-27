import { currentWindow } from "./window";
import { Observer } from "./observer";
import { appendStyle, DomChangeHelper } from "./util";
import { LocalStorageConfig, getValidShowConfig } from "./config";
import { TimeoutScheduler } from "./scheduler";

export const prefix = "crqueuesort";


interface ShowConfig {
    order: number;
    type: "hold" | "current" | "backlog";
}
interface AppConfig {
    shows: { [k: string]: ShowConfig },
    topItem: number;
}
const typeOrder: ("hold" | "current" | "backlog")[] = ["current", "backlog", "hold"];

(() => {
    appendStyle(`
        .${prefix}-hold { opacity: 0.5;}
        .${prefix}-hold.unwatched { opacity: 1; }
        .queue-sortable .queue-item.${prefix}-backlog { background-color: lightgray; }
        .${prefix}-hold.unwatched .${prefix}-ctn > .${prefix}-new-episode { display: block; }
        .${prefix}-ctn > .${prefix}-new-episode { display: none; padding: 5px; color: white; background-color: #dc3545; }
        .${prefix}-ctn > a {display: block;}
    `)
    const queueLocation: HTMLElement = document.getElementById('sortable')!;

    if (!queueLocation) {
        return;
    }

    const domChangeHelper = new DomChangeHelper();
    domChangeHelper.onStartChange = () => {
        mutationObserver.disconnect();
    }
    domChangeHelper.onEndChange = () => {
        mutationObserver.connect();
    }
    const configManager = new LocalStorageConfig();

    function getQueueItems() {
        let queueItems = Array.from(queueLocation.children);
        queueItems = queueItems.filter((show) => !!show.attributes.getNamedItem('series_id'));
        return queueItems;
    }

    function sortQueue() {
        configManager.withConfig((queueConfig) => {
            const queueItems = getQueueItems();
            domChangeHelper.startChangingDom();
            queueItems.forEach((v) => {
                function getEpProgress(el: Element) {
                    const epProgressEl: HTMLDivElement | null = el.querySelector("div.episode-progress");
                    let progress = 0;
                    if (epProgressEl) {
                        const matches = epProgressEl.style.width.match(/^(\d+)\%$/);
                        if (matches) {
                            progress = +matches[1];
                        }
                    }
                    return progress;
                }
                const epProgress = getEpProgress(v);
                const epWatched = epProgress > 70;
                v.classList.remove(!epWatched ? "watched" : "unwatched");
                v.classList.add(epWatched ? "watched" : "unwatched");

                const parentContainer = v.querySelector("div.queue-item-content");
                if (!parentContainer) return;
                let container = parentContainer.querySelector(`div.${prefix}-ctn`);
                if (!container) {
                    container = document.createElement('div');
                    container.classList.add(`${prefix}-ctn`);
                    parentContainer.prepend(container);
                }
                const currentCfg = getValidShowConfig(queueConfig.shows[v.attributes.getNamedItem("series_id")!.value]);
                v.classList.remove(`${prefix}-hold`);
                v.classList.remove(`${prefix}-current`);
                v.classList.remove(`${prefix}-backlog`);
                switch (currentCfg.type) {
                    case "backlog":
                        v.classList.add(`${prefix}-backlog`);
                        break;
                    case "current":
                        v.classList.add(`${prefix}-current`);
                        break;
                    case "hold":
                        v.classList.add(`${prefix}-hold`);
                        break;
                }
                function createButton(cls: string, text: string, onclick?: (showConfig: ShowConfig) => void) {
                    let el: HTMLAnchorElement | null = container!.querySelector(`.${cls}`);
                    if (!el) {
                        el = document.createElement('a');
                        el.classList.add(cls);
                        el.text = text;
                        container!.append(el);
                    }
                    if (onclick) {
                        el.onclick = (event) => {
                            event.preventDefault();
                            configManager.withConfig((qconfig) => {
                                const showConfig = qconfig.shows;
                                const currentConfig: ShowConfig = getValidShowConfig(showConfig[v.attributes.getNamedItem("series_id")!.value]);
                                showConfig[v.attributes.getNamedItem("series_id")!.value] = currentConfig;
                                onclick(currentConfig);
                                queueSortScheduler.schedule();
                            });
                        }
                    }
                    return el;
                }
                createButton(`${prefix}-new-episode`, "New Episode!");
                createButton(`${prefix}-to-top`, "Top", (cfg) => cfg.order = queueConfig.topItem--);
                createButton(`${prefix}-on-current`, "Current", (cfg) => cfg.type = "current");
                createButton(`${prefix}-on-hold`, "Hold", (cfg) => cfg.type = "hold");
                createButton(`${prefix}-on-backlock`, "Backlog", (cfg) => cfg.type = "backlog");
            })
            queueItems.sort((a, b) => {
                const showConfig = queueConfig.shows;
                const aConfig = getValidShowConfig(showConfig[a.attributes.getNamedItem('series_id')!.value]);
                const bConfig = getValidShowConfig(showConfig[b.attributes.getNamedItem('series_id')!.value]);

                const aWatched = a.classList.contains("watched");
                const bWatched = b.classList.contains("watched");
                if (aConfig && bConfig) {
                    const typePrecedence = typeOrder.indexOf(aConfig.type) - typeOrder.indexOf(bConfig.type);
                    if (typePrecedence) {
                        return typePrecedence;
                    }
                    const orderPrecendence = aConfig.order - bConfig.order;
                    if (orderPrecendence) {
                        return orderPrecendence;
                    }
                    if (aWatched !== bWatched) {
                        return aWatched ? 1 : -1;
                    }
                    return 0;
                    // return 0;
                }
                // if (!aConfig && !bConfig) return 0;
                if (aConfig) return -1;
                if (bConfig) return 1;
                const aMediaId = a.attributes.getNamedItem('media_id')?.value || 0;
                const bMediaId = b.attributes.getNamedItem('media_id')?.value || 0;
                return +bMediaId - +aMediaId;
                // return 0;
            });
            queueItems.forEach((v) => queueLocation.removeChild(v));
            queueItems.forEach((v) => queueLocation.appendChild(v));
            domChangeHelper.stopChangingDom();
        });
    }

    const queueSortScheduler = new TimeoutScheduler(10, () => {
        sortQueue();
    });

    const mutationObserver = new Observer(queueLocation);
    mutationObserver.registerCallback((mutationsList, observer) => {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // console.log('A child node has been added or removed.');
                queueSortScheduler.schedule();
            }
            else if (mutation.type === 'attributes') {
                // console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    });
    mutationObserver.connect();

    queueSortScheduler.schedule();

})();