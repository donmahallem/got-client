import {
    Pipe,
    PipeTransform
} from '@angular/core';
import 'rxjs/add/operator/map';

type IdxMatch = {
    start: number;
    end: number;
}

@Pipe({
    name: 'searchHighlight',
    pure: true
})
export class SearchHighlightPipe implements PipeTransform {
    private tags: string[];
    private text: string;
    private cache: string;

    transform(text: string, tags: string[]): any {
        if (tags != this.tags || text != this.text) {
            this.tags = tags;
            this.text = text;
            let inp: string = text.replace(/\&amp\;/g, "&").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
            let dom = new DOMParser().parseFromString(inp, "text/html");
            inp = dom.body.innerText;
            this.cache = inp.replace(/[0-9]+/gi, (val, a, b) => {
                //console.log(val, "|||", a, "|||", b);
                return "<b>" + val + "</b>";
            });
            let t: RegExp = new RegExp(/keys/, "gi");
            let match: RegExpExecArray;
            let m: string = "_".repeat(inp.length);
            while ((match = t.exec(inp)) != null) {
                let from: number = Math.max(0, match.index - 5);
                let to: number = Math.min(inp.length, match.index + match[0].length + 5);
                m = m.substr(0, from) + "x".repeat(to - from) + m.substr(to);
            }
            let ret: string = "";
            let aa: RegExp = new RegExp(/\x+/, "gi");
            while ((match = aa.exec(m)) != null) {
                ret += "...<b>" + inp.substr(match.index, match[0].length) + "</b>...";
            }
            console.log(m, ret);
            this.cache = ret;
        }
        return this.cache;
    }
}