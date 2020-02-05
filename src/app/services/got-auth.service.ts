import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GotAuthService {
    constructor(private http: HttpClient) { }

    public get access_token(): string {
        return window.sessionStorage.getItem('got_access_token');
    }

    public refreshAccessToken(): Observable<boolean> {
        const options = {
            method: 'post',
            body: {
                refresh_token: sessionStorage.getItem('got_refresh_token'),
                type: 'refresh_token'
            }
        };
        return this.request('/api/v1/auth/token', options)
            .map(data => {
                this.storeTokens(data);
                return true;
            });
    }

    private storeTokens(tokens: { access_token: string, refresh_token: string }) {
        window.sessionStorage.setItem('got_access_token', tokens.access_token);
        window.sessionStorage.setItem('got_refresh_token', tokens.refresh_token);
    }

    public exchangeCode(code: string): Observable<boolean> {
        const options = {
            method: 'post',
            body: {
                code,
                type: 'code'
            }
        };
        return this.request('/api/v1/auth/token', options)
            .map(data => {
                this.storeTokens(data);
                return data;
            });
    }
    public exchangeRefreshToken(refreshToken: string): Observable<boolean> {
        const options = {
            method: 'post',
            body: {
                refresh_token: refreshToken,
                type: 'refresh_token'
            }
        };
        return this.request('/api/v1/auth/token', options)
            .map(data => {
                return data.success || false;
            });
    }

    private extractData(res: any) {
        const body = res.json();
        return body.data || {};
    }
    /*
        private handleError(error: Response | any) {
            // In a real world app, you might use a remote logging infrastructure
            let errMsg: string;
            if (error instanceof Response) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
            console.error(errMsg);
            return Observable.throw(errMsg);
        }*/
    private request(url: Request | string | any, requestArgs: any): any {
        if (requestArgs.headers) {
            requestArgs.headers.set('Content-Type', 'application/json');
        } else {
            requestArgs.headers = new Headers({
                'Content-Type': 'application/json'
            });
        }
        return this.http.request(url, requestArgs)
            .pipe(map(this.extractData),
                catchError(sourceError => {
                    if (sourceError && sourceError.status === 401) {
                        /*return this.piholeAuth
                            .refreshAuthenticationToken()
                            .flatMap((authResult: AuthData) => {
                                if (authResult) {
                                    // retry with new token
                                    return this.http.request(url, requestArgs);
                                }
                                return Observable.throw(sourceError);
                            });*/
                        return throwError(sourceError);
                    } else {
                        return throwError(sourceError);
                    }
                }));
    }
}
