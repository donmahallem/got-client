import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Component({
    templateUrl: './submission-body.component.html',
    styleUrls: ['submission-body.component.css'],
    selector: 'submission-body'
})
export class SubmissionBodyComponent implements OnChanges {
    @Input('content')
    public content: string;
    private _cachedContent: string;
    constructor() { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('content')) {
            this._cachedContent = this.parseContent(changes.content.currentValue);
        }
    }
    /**
     * Hopefully I am reading this correctly
     * https://github.com/reddit/reddit/blob/8937ae2d3acacc4023d97462c1e4ccc3e38ec8a9/r2/r2/lib/filters.py
     */
    public parseContent(content: string): string {
        if (typeof content === 'string') {
            const inp: string = content.replace(/\&amp\;/g, '&').replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>');
            const dom = new DOMParser().parseFromString(inp, 'text/html');
            const anchors: NodeListOf<HTMLAnchorElement> = dom.body.querySelectorAll('a');
            for (let i = 0; i < anchors.length; i++) {
                const href: string = anchors.item(i).getAttribute('href');
                if (typeof href === 'string') {
                    if (href.match(/^(http|https|)\:\/\/i\.imgur\.com\/.*/i)) {
                        console.log('imgur link found', href);
                    }
                }
                anchors.item(i).setAttribute('target', '_blank');
            }
            return dom.body.innerHTML;
        } else {
            return null;
        }
    }

    public get cachedContent(): string {
        return this._cachedContent;
    }
}
