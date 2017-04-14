import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { FeedRoutingModule } from "./feed-routing.module";
import { FeedComponent } from "./feed.component";
import { FeedBodyComponent } from "./feed-body.component";
import { FeedListComponent } from "./feed-list.component";
import { FeedListItemComponent } from "./feed-list-item.component";
import { FeedToolbarComponent } from "./feed-toolbar.component";
import { FeedSidebarComponent } from "./feed-sidebar.component";
import { RedditApiService } from "./../services/reddit-api.service";
import { GotApiService } from "./../services/got-api.service";
import {
    MomentFromNowPipe
} from "./../util/";
import {
    SubmissionDialogComponent,
    SnuDownPipe
} from "./submission-dialog.component";
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
        SubmissionDialogComponent,
        SnuDownPipe,
        FeedSidebarComponent,
        MomentFromNowPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        FeedRoutingModule
    ],
    entryComponents: [
        SubmissionDialogComponent
    ],
    providers: [
        RedditApiService,
        GotApiService
    ]
})
export class FeedModule { }
