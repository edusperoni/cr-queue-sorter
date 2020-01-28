import { getValidShowConfig, LocalStorageConfig, ShowConfig, BaseConfigManager, ConfigManager } from "./config";
import { Observer } from "./observer";
import { Scheduler } from "./scheduler";
import { appendStyle, DomChangeHelper } from "./util";

interface QueueSorterOptions {
    scheduler: Scheduler,
    configManager: ConfigManager,
}

export class QueueSorter {
    static PREFIX = "crqueuesort";
    static typeOrder: ("hold" | "current" | "backlog")[] = ["current", "backlog", "hold"];
    private scheduler: Scheduler;
    private configManager: ConfigManager;
    private domChangeHelper = new DomChangeHelper();
    private mutationObserver?: Observer;
    private queueLocation?: HTMLElement;
    constructor(options: QueueSorterOptions) {
        this.scheduler = options.scheduler;
        this.scheduler.callback = () => this.sort();
        this.configManager = options.configManager;
    }

    sort() {
        this.configManager.withConfig((queueConfig) => {
            const queueItems = this.getQueueItems();
            this.domChangeHelper.startChangingDom();
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
                let container = parentContainer.querySelector(`div.${QueueSorter.PREFIX}-ctn`);
                if (!container) {
                    container = document.createElement('div');
                    container.classList.add(`${QueueSorter.PREFIX}-ctn`);
                    parentContainer.prepend(container);
                }
                const seriesId = v.attributes.getNamedItem("series_id")!.value;
                const currentCfg = getValidShowConfig(queueConfig.shows[seriesId]);
                v.classList.remove(`${QueueSorter.PREFIX}-hold`);
                v.classList.remove(`${QueueSorter.PREFIX}-current`);
                v.classList.remove(`${QueueSorter.PREFIX}-backlog`);
                switch (currentCfg.type) {
                    case "backlog":
                        v.classList.add(`${QueueSorter.PREFIX}-backlog`);
                        break;
                    case "current":
                        v.classList.add(`${QueueSorter.PREFIX}-current`);
                        break;
                    case "hold":
                        v.classList.add(`${QueueSorter.PREFIX}-hold`);
                        break;
                }

                const createButton = (cls: string, text: string, onclick?: (showConfig: ShowConfig) => void) => {
                    this.createButton(container!, cls, text, seriesId, onclick);
                }

                createButton(`${QueueSorter.PREFIX}-new-episode`, "New Episode!");
                createButton(`${QueueSorter.PREFIX}-to-top`, "Top", (cfg) => cfg.order = queueConfig.topItem--);
                createButton(`${QueueSorter.PREFIX}-on-current`, "Current", (cfg) => cfg.type = "current");
                createButton(`${QueueSorter.PREFIX}-on-hold`, "Hold", (cfg) => cfg.type = "hold");
                createButton(`${QueueSorter.PREFIX}-on-backlock`, "Backlog", (cfg) => cfg.type = "backlog");
            })
            queueItems.sort((a, b) => {
                const showConfig = queueConfig.shows;
                const aConfig = getValidShowConfig(showConfig[a.attributes.getNamedItem('series_id')!.value]);
                const bConfig = getValidShowConfig(showConfig[b.attributes.getNamedItem('series_id')!.value]);

                const aWatched = a.classList.contains("watched");
                const bWatched = b.classList.contains("watched");
                if (aConfig && bConfig) {
                    const typePrecedence = QueueSorter.typeOrder.indexOf(aConfig.type) - QueueSorter.typeOrder.indexOf(bConfig.type);
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
            queueItems.forEach((v) => this.queueLocation!.removeChild(v));
            queueItems.forEach((v) => this.queueLocation!.appendChild(v));
            this.domChangeHelper.stopChangingDom();
        });
    }

    init() {
        appendStyle(`
        .${QueueSorter.PREFIX}-hold { opacity: 0.5;}
        .${QueueSorter.PREFIX}-hold.unwatched { opacity: 1; }
        .queue-sortable .queue-item.${QueueSorter.PREFIX}-backlog { background-color: lightgray; }
        .${QueueSorter.PREFIX}-hold.unwatched .${QueueSorter.PREFIX}-ctn > .${QueueSorter.PREFIX}-new-episode { display: block; }
        .${QueueSorter.PREFIX}-ctn > .${QueueSorter.PREFIX}-new-episode { display: none; padding: 5px; color: white; background-color: #dc3545; }
        .${QueueSorter.PREFIX}-ctn > a {display: block;}
        `);
        this.queueLocation = document.getElementById('sortable')!;

        if (!this.queueLocation) {
            return;
        }

        this.mutationObserver = new Observer(this.queueLocation);

        this.domChangeHelper.onStartChange = () => {
            this.mutationObserver!.disconnect();
        }
        this.domChangeHelper.onEndChange = () => {
            this.mutationObserver!.connect();
        }

        this.mutationObserver.registerCallback((mutationsList, observer) => {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // console.log('A child node has been added or removed.');
                    this.scheduler.schedule();
                }
                else if (mutation.type === 'attributes') {
                    // console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        });
        this.mutationObserver.connect();

        this.scheduler.schedule();

    }

    private getQueueItems() {
        let queueItems = Array.from(this.queueLocation!.children);
        queueItems = queueItems.filter((show) => !!show.attributes.getNamedItem('series_id'));
        return queueItems;
    }

    private createButton(container: Element, cls: string, text: string, seriesId: string, onclick?: (showConfig: ShowConfig) => void) {
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
                this.configManager.withConfig((qconfig) => {
                    const showConfig = qconfig.shows;
                    const currentConfig: ShowConfig = getValidShowConfig(showConfig[seriesId]);
                    showConfig[seriesId] = currentConfig;
                    onclick(currentConfig);
                    this.scheduler.schedule();
                });
            }
        }
        return el;
    }
}
