import Dexie from "dexie";
import {
    RedditSubmission,
    RedditSubmissions,
    RedditListingResponse,
    GotUser
} from "./../models/";
import { XmlEntities } from "html-entities";
export class SubmissionDatabase extends Dexie {
    public submissions: Dexie.Table<RedditSubmission, string>;
    constructor() {
        super("SubmissionDB2");
        this.version(1).stores({ submissions: "id,created_utc,author,title,type,*searchWords" });
        // Add hooks that will index "message" for full-text search:
        this.submissions.hook("creating", this.createHook.bind(this));
        this.submissions.hook("updating", this.updateHook.bind(this));
    }

    private createHook(primKey: any, obj: any, trans: any): void {
        obj.searchWords = this.indexSubmission(obj);
        obj.type = RedditSubmission.parseType(obj);
    }

    private updateHook(mods: any, primKey: any, obj: any, trans: any) {
        if (mods.hasOwnProperty("selftext_html") || mods.hasOwnProperty("title")) {
            return {
                searchWords: this.indexSubmission(obj, mods),
                type: RedditSubmission.parseType(obj)
            };
        }
    }

    public indexSubmission(submission: RedditSubmission, mods: any = null): string[] {
        let result: string[] = [];
        if (mods && mods.hasOwnProperty("title") && typeof mods.title === "string") {
            result = result.concat(this.sanitize(mods.title).split(" "));
        } else if (typeof submission.title === "string") {
            result = result.concat(this.sanitize(submission.title).split(" "));
        }
        if (mods && mods.hasOwnProperty("selftext_html") && typeof mods.selftext_html === "string") {
            result = result.concat(this.sanitize(this.parseSelfthml(mods.selftext_html)).split(" "));
        } else if (typeof submission.selftext_html === "string") {
            result = result.concat(this.sanitize(this.parseSelfthml(submission.selftext_html)).split(" "));
        }
        result = this.removeDuplicates(result);
        return result;
    }

    public sanitize(input: string): string {
        let txt: string = input.replace(/((\W(?!\d))+)|(\d+[^\.\d]\d+)/g, " ");
        txt = txt.replace(/\s+/g, " ");
        return txt.toLowerCase().trim();
    }

    /**
     * Removes duplicates from the input array
     * @param input 
     */
    public removeDuplicates(input: string[]): string[] {
        let seen: { [key: string]: boolean; } = {};
        let result: string[] = [];
        for (let i = 0; i < input.length; i++) {
            if (!seen.hasOwnProperty(input[i]) && input[i].length > 1) {
                seen[input[i]] = true;
                result.push(input[i]);
            }
        }
        return result;
    }

    public parseSelfthml(input: string): string {
        let doc = new DOMParser().parseFromString(XmlEntities.decode(input), "text/html");
        let text = doc.documentElement.textContent;
        return text;
    }
}