import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {
    Logger
} from "./../../../util/";

@Component({
    templateUrl: "./submission-body.component.html",
    styleUrls: ["submission-body.component.css"],
    selector: "submission-body"
})
export class SubmissionBodyComponent implements OnChanges {
    @Input("content")
    public content: string;
    private _cachedContent: string;
    constructor() { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("content")) {
            this._cachedContent = this.parseContent(changes.content.currentValue);
        }
    }
    /**
     * Hopefully I am reading this correctly
     * https://github.com/reddit/reddit/blob/8937ae2d3acacc4023d97462c1e4ccc3e38ec8a9/r2/r2/lib/filters.py
     */
    public parseContent(content: string): string {
        let inp: string = content.replace(/\&amp\;/g, "&").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
        let dom = new DOMParser().parseFromString(inp, "text/html");
        let anchors: NodeListOf<HTMLAnchorElement> = dom.body.querySelectorAll("a");
        for (let i = 0; i < anchors.length; i++) {
            let href: string = anchors.item(i).getAttribute("href");
            if (typeof href === "string") {
                if (href.match(/^(http|https|)\:\/\/i\.imgur\.com\/.*/i)) {
                    console.log("imgur link found", href);
                }
            }
            anchors.item(i).setAttribute("target", "_blank");
        }
        return dom.body.innerHTML;
    }

    public get cachedContent(): string {
        return this._cachedContent;
    }
}