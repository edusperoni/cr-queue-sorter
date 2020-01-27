export function appendStyle(styles: string) {
    const css = document.createElement('style');
    css.type = 'text/css';

    css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
}

export type DomChangeCallback = () => void;

export class DomChangeHelper {
    private changinDom = 0;
    onStartChange?: DomChangeCallback;
    onEndChange?: DomChangeCallback;

    startChangingDom() {
        if (this.changinDom++ === 0 && this.onStartChange) {
            this.onStartChange();
        }
    }
    stopChangingDom() {
        if (--this.changinDom === 0 && this.onEndChange) {
            this.onEndChange();
        }
    }
}
