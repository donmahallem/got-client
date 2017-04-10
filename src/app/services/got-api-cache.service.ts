
import { Injectable } from '@angular/core';
import {
    Http,
    Response,
    RequestOptions,
    Headers,
    RequestOptionsArgs,
    Request,
    RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
    RedditSubmission,
    RedditSubmissions,
    RedditListingResponse,
    GotUser
} from './../models/';
import {
    GotAuthService
} from "./got-auth.service";
import Dexie from 'dexie';
class SubmissionDB extends Dexie {
    submissions: Dexie.Table<RedditSubmission, number>;
    constructor() {
        super("SubmissionDB");
        this.version(1).stores({ submissions: "id,created_utc,author" });
    }
}

@Injectable()
export class GotApiCacheService {
    private _db: SubmissionDB;
    constructor() {
        this._db = new SubmissionDB();
    }

    public store(submission: RedditSubmission) {
        this._db.submissions.put(submission);
    }
}