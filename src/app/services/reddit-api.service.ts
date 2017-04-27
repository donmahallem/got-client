import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {
    RedditSubmission,
    RedditSubmissions,
    RedditListingResponse
} from "./../models/";
@Injectable()
export class RedditApiService {
    private heroesUrl = "https://api.reddit.com/r/GlobalOffensiveTrade/new";  // URL to web API
    constructor(private http: Http) { }


    public getNewSubmissions(subreddit: string, limit: number = 20): Observable<RedditListingResponse<RedditSubmission>> {
        let queryUrl: string = "https://api.reddit.com/r/" + subreddit + "/new?limit=" + limit;
        return this.http.get(queryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getSubmissionById(ids: string[] | string): Observable<RedditListingResponse<RedditSubmission>> {
        let queryIds: string = (typeof ids === "string" ? ids : ids.join(","));
        return this.http.get("https://api.reddit.com/by_id/" + queryIds)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || "";
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}