import { Injectable } from '@angular/core';
import {
    RedditSubmission,
    RedditListingResponse
} from './../models/';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class RedditApiService {
    constructor(private http: HttpClient) { }


    public getNewSubmissions(subreddit: string, limit: number = 20): Observable<RedditListingResponse<RedditSubmission>> {
        const queryUrl: string = 'https://api.reddit.com/r/' + subreddit + '/new?limit=' + limit;
        return this.http.get(queryUrl)
            .pipe(map(this.extractData),
                catchError(this.handleError));
    }

    public getSubmissionById(ids: string[] | string): Observable<RedditListingResponse<RedditSubmission>> {
        const queryIds: string = (typeof ids === 'string' ? ids : ids.join(','));
        return this.http.get('https://api.reddit.com/by_id/' + queryIds)
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
        return throwError(errMsg);
    }
}
