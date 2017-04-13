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

@Injectable()
export class GotApiService {
    private heroesUrl = "https://api.reddit.com/r/GlobalOffensiveTrade/new";  // URL to web API
    constructor(private http: Http,
        private gotAuth: GotAuthService) { }

    public upvote(item: string | RedditSubmission): Observable<boolean> {
        let id = (item instanceof String) ? item : item.id;
        let options = new RequestOptions({
            method: RequestMethod.Post,
            body: { action: "upvote", id: item }
        });
        return this.request("/api/v1/submission/vote", options)
            .map(data => {
                return data.success || false;
            });
    }

    public getMe(): Observable<GotUser> {
        let options: RequestOptionsArgs = {
            method: RequestMethod.Get
        };
        return this.request("/api/v1/user/me", options);
    }

    getNewSubmissions(): Observable<RedditListingResponse<RedditSubmission>> {
        return this.http.get(this.heroesUrl)
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

    private request(url: Request | string, requestArgs: RequestOptionsArgs): any {
        if (requestArgs.headers) {
            requestArgs.headers.set("Authorization", "Bearer " + this.gotAuth.access_token);
            requestArgs.headers.set("Content-Type", "application/json")
        } else {
            requestArgs.headers = new Headers({
                "Authorization": "Bearer " + this.gotAuth.access_token,
                "Content-Type": "application/json"
            });
        }
        return this.http.request(url, requestArgs)
            .map(this.extractData)
            .catch(sourceError => {
                if (sourceError && sourceError.status === 401) {
                    return this.gotAuth
                        .refreshAccessToken()
                        .flatMap((authResult: any) => {
                            if (authResult) {
                                // retry with new token
                                requestArgs.headers.set("Authorization", "Bearer " + this.gotAuth.access_token);
                                return this.http.request(url, requestArgs);
                            }
                            return Observable.throw(sourceError);
                        });
                }
                else {
                    return Observable.throw(sourceError);
                }
            });
    }
}