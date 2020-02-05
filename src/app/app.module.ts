import {
    BrowserModule
} from '@angular/platform-browser';
import {
    NgModule,
    APP_INITIALIZER,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
    FormsModule
} from '@angular/forms';
import {
    AppComponent
} from './app.component';
import {
    AppRoutingModule
} from './app-routing.module';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
    AppConfigService,
    GotAuthService,
    GotApiService,
    GotLiveService
} from './services/';


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
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    exports: [],
    providers: [
        AppConfigService,
        GotAuthService,
        GotApiService,
        GotLiveService,
        {
            provide: APP_INITIALIZER,
            useFactory: configServiceFactory,
            deps: [AppConfigService],
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
