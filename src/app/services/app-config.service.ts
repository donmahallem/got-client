import { Inject, Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AppConfigService {

    private config: Object = null;

    constructor(private http: Http) {

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
            this.http.get("/api/v1/config").map(res => res.json()).catch((error: any): any => {
                console.log("Configuration file 'env.json' could not be read");
                resolve(true);
                return Observable.throw("Server error");
            }).subscribe((config) => {
                this.config = config;
                resolve(true);
            });

        });
    }
}