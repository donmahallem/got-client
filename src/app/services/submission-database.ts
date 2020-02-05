import Dexie from 'dexie';
import {
    RedditSubmission
} from './../models/';
import {
    XmlEntities
} from 'html-entities';
import { Subject, Observable } from 'rxjs';

export enum ChangeType {
    CREATE = 1,
    UPDATE = 2,
    DELETE = 3
}

export interface ChangeEvent {
    id: string;
    type: ChangeType;
}

export class SubmissionDatabase extends Dexie {
    constructor() {
        super('SubmissionDB2');
        this.version(1).stores({ submissions: 'id,created_utc,author,title,type,*searchWords' });
        // Add hooks that will index "message" for full-text search:
        this.submissions.hook('creating', this.createHook.bind(this));
        this.submissions.hook('updating', this.updateHook.bind(this));
        this.submissions.hook('deleting', this.deleteHook.bind(this));
    }
    public submissions: Dexie.Table<RedditSubmission, string>;
    private changeSubject: Subject<ChangeEvent> = new Subject<ChangeEvent>();
    public changeObservable: Observable<ChangeEvent> = this.changeSubject.asObservable();

    public static indexSubmission(submission: RedditSubmission, mods: any = null): string[] {
        let result: string[] = [];
        if (mods && mods.hasOwnProperty('title') && typeof mods.title === 'string') {
            result = result.concat(SubmissionDatabase.sanitize(mods.title).split(' '));
        } else if (typeof submission.title === 'string') {
            result = result.concat(SubmissionDatabase.sanitize(submission.title).split(' '));
        }
        if (mods && mods.hasOwnProperty('selftext_html') && typeof mods.selftext_html === 'string') {
            result = result.concat(SubmissionDatabase.sanitize(this.parseSelfthml(mods.selftext_html)).split(' '));
        } else if (typeof submission.selftext_html === 'string') {
            result = result.concat(SubmissionDatabase.sanitize(SubmissionDatabase.parseSelfthml(submission.selftext_html)).split(' '));
        }
        result = SubmissionDatabase.removeDuplicates(result);
        return result;
    }

    public static sanitize(input: string): string {
        let txt: string = input.replace(/((\W(?!\d))+)|(\d+[^\.\d]\d+)/g, ' ');
        txt = txt.replace(/\s+/g, ' ');
        return txt.toLowerCase().trim();
    }

    public static removeDuplicates(input: string[]): string[] {
        const seen: { [key: string]: boolean; } = {};
        const result: string[] = [];
        for (const inp of input) {
            if (!seen.hasOwnProperty(inp) && inp.length > 1) {
                seen[inp] = true;
                result.push(inp);
            }
        }
        return result;
    }

    public static parseSelfthml(input: string): string {
        const doc = new DOMParser().parseFromString(XmlEntities.decode(input), 'text/html');
        const text = doc.documentElement.textContent;
        return text;
    }

    private deleteHook(primKey: any, obj: any, trans: Dexie.Transaction): void {
        trans.on('complete', () => {
            this.changeSubject.next({ id: primKey, type: ChangeType.DELETE });
        });
    }

    private createHook(primKey: any, obj: any, trans: Dexie.Transaction): void {
        obj.searchWords = SubmissionDatabase.indexSubmission(obj);
        obj.type = RedditSubmission.parseType(obj);
        trans.on('complete', () => {
            this.changeSubject.next({ id: primKey, type: ChangeType.CREATE });
        });
    }

    private updateHook(mods: any, primKey: any, obj: any, trans: Dexie.Transaction) {
        trans.on('complete', () => {
            this.changeSubject.next({ id: primKey, type: ChangeType.UPDATE });
        });
        if (mods.hasOwnProperty('selftext_html') || mods.hasOwnProperty('title')) {
            return {
                searchWords: SubmissionDatabase.indexSubmission(obj, mods),
                type: RedditSubmission.parseType(obj)
            };
        }
    }
}
