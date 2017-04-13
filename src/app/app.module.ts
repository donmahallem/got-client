import {
    BrowserModule
} from "@angular/platform-browser";
import {
    NgModule,
    APP_INITIALIZER
} from "@angular/core";
import {
    FormsModule
} from "@angular/forms";
import {
    HttpModule
} from "@angular/http";

import {
    AppComponent
} from "./app.component";
import {
    AppRoutingModule
} from "./app-routing.module";
import {
    MaterialModule
} from "@angular/material";
import {
    BrowserAnimationsModule
} from "@angular/platform-browser/animations";
import {
    AppConfigService,
    GotAuthService,
    GotApiService,
    GotLiveService,
    GotApiCacheService
} from "./services/"


export function configServiceFactory(config: AppConfigService) {
    return () => config.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule
    ],
    exports: [],
    providers: [
        AppConfigService,
        GotAuthService,
        GotApiService,
        GotLiveService,
        GotApiCacheService,
        {
            provide: APP_INITIALIZER,
            useFactory: configServiceFactory,
            deps: [AppConfigService],
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
