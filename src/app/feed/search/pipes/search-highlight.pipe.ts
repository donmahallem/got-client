import {
    Pipe,
    PipeTransform
} from '@angular/core';


@Pipe({
    name: 'searchHighlight',
    pure: true
})
export class SearchHighlightPipe implements PipeTransform {
    private tags: string[];
    private text: string;
    private cache: string;

    transform(text: string, tags: string[]): any {
        if (tags !== this.tags || text !== this.text) {
            this.tags = tags;
            this.text = text;
            let inp: string = text.replace(/\&amp\;/g, '&').replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>');
            const dom = new DOMParser().parseFromString(inp, 'text/html');
            inp = dom.body.innerText;
            this.cache = inp.replace(/[0-9]+/gi, (val, a, b) => {
                // console.log(val, "|||", a, "|||", b);
                return '<b>' + val + '</b>';
            });
            const t: RegExp = new RegExp(/keys/, 'gi');
            let match: RegExpExecArray;
            let m: string = '_'.repeat(inp.length);
            //tslint:disable
            while ((match = t.exec(inp)) != null) {
                const from: number = Math.max(0, match.index - 5);
                const to: number = Math.min(inp.length, match.index + match[0].length + 5);
                m = m.substr(0, from) + 'x'.repeat(to - from) + m.substr(to);
            }
            let ret = '';
            const aa: RegExp = new RegExp(/\x+/, 'gi');
            while ((match = aa.exec(m)) != null) {
                ret += '...<b>' + inp.substr(match.index, match[0].length) + '</b>...';
            }
            // tslint:enable
            this.cache = ret;
        }
        return this.cache;
    }
}
