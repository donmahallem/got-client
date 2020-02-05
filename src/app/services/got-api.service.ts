import { Injectable } from '@angular/core';
import {
    RedditSubmission,
    RedditListingResponse,
    GotUser
} from './../models/';
import {
    GotAuthService
} from './got-auth.service';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GotApiService {
    private heroesUrl = 'https://api.reddit.com/r/GlobalOffensiveTrade/new';  // URL to web API
    constructor(private http: HttpClient,
                private gotAuth: GotAuthService) { }

    public upvote(item: string | RedditSubmission | any): Observable<boolean> {
        const options = {
            method: 'post',
            body: { action: 'upvote', id: item }
        };
        return this.request('/api/v1/submission/vote', options)
            .map(data => {
                return data.success || false;
            });
    }

    public getMe(): Observable<GotUser> {
        const options = {
            method: 'get'
        };
        return this.request('/api/v1/user/me', options);
    }

    public getNewSubmissions(): Observable<RedditListingResponse<RedditSubmission>> {
        return this.http.get(this.heroesUrl)
            .pipe(map(this.extractData),
                catchError(this.handleError));
    }

    private extractData(res: Response) {
        const body: any = res.json();
        return body.data || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body: any = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }

    private request(url: any, requestArgs: any): any {
        if (requestArgs.headers) {
            requestArgs.headers.set('Authorization', 'Bearer ' + this.gotAuth.access_token);
            requestArgs.headers.set('Content-Type', 'application/json');
        } else {
            requestArgs.headers = new Headers({
                Authorization: 'Bearer ' + this.gotAuth.access_token,
                'Content-Type': 'application/json'
            });
        }
        return this.http.request(url, requestArgs)
            .pipe(map(this.extractData),
                catchError(sourceError => {
                    if (sourceError && sourceError.status === 401) {
                        return this.gotAuth
                            .refreshAccessToken()
                            .pipe(flatMap((authResult: any) => {
                                if (authResult) {
                                    // retry with new token
                                    requestArgs.headers.set('Authorization', 'Bearer ' + this.gotAuth.access_token);
                                    return this.http.request(url, requestArgs);
                                }
                                return throwError(sourceError);
                            }));
                    } else {
                        return throwError(sourceError);
                    }
                }));
    }
}
