import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AppConfigService {

    private config: object = null;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: "production", "development")
     *   b) Loads "config.[env].json" to get all env"s variables (e.g.: "config.development.json")
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('/api/v1/config')
                .pipe(map((res: any) => res.json()),
                    catchError((error: any): any => {
                        console.log('Configuration file \'env.json\' could not be read');
                        resolve(true);
                        return throwError('Server error');
                    })).subscribe((config) => {
                        this.config = config;
                        resolve(true);
                    });

        });
    }
}
