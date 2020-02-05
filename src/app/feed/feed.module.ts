import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import {
    FeedSidebarComponent,
    FeedComponent,
    FeedToolbarComponent,
    FeedBodyComponent,
    FeedListComponent,
    FeedListItemComponent,
    FeedToolbarSearchComponent
} from './components';
import {
    RedditApiService,
    GotApiService
} from './../services/';
import {
    UtilModule
} from './../util/';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        FeedComponent,
        FeedToolbarComponent,
        FeedBodyComponent,
        FeedListComponent,
        FeedListItemComponent,
        FeedSidebarComponent,
        FeedToolbarSearchComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FeedRoutingModule,
        UtilModule
    ],
    entryComponents: [
    ], exports: [
        UtilModule
    ],
    providers: [
        RedditApiService,
        GotApiService
    ]
})
export class FeedModule { }
