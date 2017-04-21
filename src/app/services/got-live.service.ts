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
import * as moment from "moment";
import {
    SubmissionDatabase,
    ChangeEvent
} from "./submission-database";
import Dexie from "dexie";


@Injectable()
export class GotLiveService {
    private static readonly MINUTE: number = 60000;
    private static readonly HOUR: number = GotLiveService.MINUTE * 60;
    private submissionSource = new Subject<RedditSubmission>();
    // Observable string streams
    public readonly submissionObservable = this.submissionSource.asObservable();
    private submissionsUpdatedSource = new Subject<string[]>();
    public readonly submissionsUpdated = this.submissionsUpdatedSource.asObservable();

    private _db: SubmissionDatabase;
    private eventSource: EventSource;
    constructor() {
        this._db = new SubmissionDatabase();
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

    public get submissionUpdate(): Observable<ChangeEvent> {
        return this._db.changeObservable;
    }

    public storeSubmissions(submissions: RedditSubmissions): Dexie.Promise<string> {
        return this._db.submissions.bulkPut(submissions)
            .then(result => {
                this.submissionsUpdatedSource.next(submissions.map(val => { return val.id; }));
                return result;
            });
    }

    public storeSubmission(submission: RedditSubmission): Dexie.Promise<string> {
        return this._db.submissions.put(submission).
            then(result => {
                this.submissionsUpdatedSource.next([result]);
                return result;
            });
    }

    public searchSubmissions(txt: string[]) {
        return this._db.submissions.where("searchWords").anyOf(txt);
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
            .orderBy("created_utc").reverse();
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