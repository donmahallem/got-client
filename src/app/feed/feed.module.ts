import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { FeedRoutingModule } from "./feed-routing.module";
import {
    FeedSidebarComponent,
    FeedComponent,
    FeedToolbarComponent,
    FeedBodyComponent,
    FeedListComponent,
    FeedListItemComponent,
    FeedToolbarSearchComponent
} from "./components";
import {
    RedditApiService,
    GotApiService
} from "./../services/";
import {
    MomentFromNowPipe
} from "./../util/";
import {
    MaterialModule
} from "@angular/material";

@NgModule({
    declarations: [
        FeedComponent,
        FeedToolbarComponent,
        FeedBodyComponent,
        FeedListComponent,
        FeedListItemComponent,
        FeedSidebarComponent,
        MomentFromNowPipe,
        FeedToolbarSearchComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        FeedRoutingModule
    ],
    entryComponents: [
    ],
    providers: [
        RedditApiService,
        GotApiService
    ]
})
export class FeedModule { }
