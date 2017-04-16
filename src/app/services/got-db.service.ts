/// <reference path="./EventSource.d.ts"/>

import { Injectable } from "@angular/core";
import {
    Http,
    Response,
    RequestOptions,
    Headers,
    RequestOptionsArgs,
    Request,
    RequestMethod
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {
    RedditSubmission,
    RedditSubmissions,
    RedditListingResponse,
    GotUser
} from "./../models/";
import {
    GotAuthService
} from "./got-auth.service";
import { Logger } from "./../util";
import { Subject } from "rxjs/Subject";
import Dexie from "dexie";
import * as moment from "moment";
import * as html2text from "html-to-text";

class SubmissionDB extends Dexie {
    public submissions: Dexie.Table<RedditSubmission, string>;
    constructor() {
        super("SubmissionDB");
        this.version(1).stores({ submissions: "id,created_utc,author,*searchWords" });
        // Add hooks that will index "message" for full-text search:
        this.submissions.hook("creating", this.createHook.bind(this));
        this.submissions.hook("updating", this.updateHook.bind(this));
    }

    private createHook(primKey: any, obj: any, trans: any): void {
        if (typeof obj.message === 'string') obj.searchWords = this.clearInput(obj.content_html);
    }
    private updateHook(mods: any, primKey: any, obj: any, trans: any) {
        if (mods.hasOwnProperty("content_html")) {
            // "message" property is being updated
            if (typeof mods.content_html == 'string')
                // "message" property was updated to another valid value. Re-index messageWords:
                return { searchWords: this.clearInput(mods.content_html) };
            else
                // "message" property was deleted (typeof mods.message === 'undefined') or changed to an unknown type. Remove indexes:
                return { searchWords: [] };
        }
    }

    public clearInput(input: string): string[] {
        let text: string = htmlToText.fromString(input);
        text = text.replace(/\s+/g, " ");
        let splitted = text.split(" ");
        // remove duplicates
        let seen: { [key: string]: boolean; } = {};
        let result: string[] = [];
        for (let i = 0; i < splitted.length; i++) {
            if (!seen.hasOwnProperty(splitted[i])) {
                seen[splitted[i]] = true;
                result.push(splitted[i]);
            }
        }
        return result;
    }
}

@Injectable()
export class GotLiveService {
    private static readonly MINUTE: number = 60000;
    private static readonly HOUR: number = GotLiveService.MINUTE * 60;
    private submissionSource = new Subject<RedditSubmission>();
    // Observable string streams
    public readonly submissionObservable = this.submissionSource.asObservable();
    private submissionsUpdatedSource = new Subject<string[]>();
    public readonly submissionsUpdated = this.submissionsUpdatedSource.asObservable();

    private _db: SubmissionDB;
    private eventSource: EventSource;
    constructor() {
        this._db = new SubmissionDB();
        this.eventSource = new EventSource("https://got.xants.de/api/v1/reddit/live");
        this.eventSource.addEventListener("submission", submission => {
            const sub = JSON.parse(submission.data);
            this.storeSubmission(sub)
                .then(key => {
                    Logger.info("submission stored", sub.id);
                })
                .catch(error => {
                    Logger.error("couldnt store", error);
                });
            this.submissionSource.next(sub);
        });
        setInterval(() => {
            const timestamp: number = moment().subtract(1, "hour").unix();
            this.deleteSubmissionsOlderThan(timestamp)
                .then(deleted => {
                    Logger.info("Evicted", deleted, "submissions from db");
                }).catch(error => {
                    Logger.error("Error evicting stale submissions", error);
                });
        }, GotLiveService.MINUTE);
    }

    private storeSubmissions(submissions: RedditSubmissions): Dexie.Promise<string> {
        return this._db.submissions.bulkPut(submissions)
            .then(result => {

                return result;
            });
    }

    private storeSubmission(submission: RedditSubmission): Dexie.Promise<string> {
        return this._db.submissions.put(submission).
            then(result => {
                this.submissionsUpdatedSource.next([result]);
                return result;
            });
    }

    public getSubmission(id: string): Dexie.Promise<RedditSubmission> {
        return this._db.submissions.get(id);
    }

    public deleteSubmission(id: string): Dexie.Promise<void> {
        return this._db.submissions.delete(id);
    }

    public deleteSubmissionsOlderThan(timestamp: number): Dexie.Promise<number> {
        return this._db.submissions
            .where("created_utc")
            .below(timestamp)
            .delete();
    }

    public getSubmissions(limit: number = -1): Dexie.Promise<RedditSubmissions> {
        let col: Dexie.Collection<RedditSubmission, string> = this._db.submissions
            .orderBy("created_utc");
        if (limit > 0) {
            col = col.limit(limit);
        }
        return col.toArray();
    }

    public getSubmissionsSince(since: number): Dexie.Promise<RedditSubmissions> {
        return this._db.submissions.where("created_utc")
            .above(since)
            .toArray();
    }

}