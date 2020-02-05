import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';

import {
    RedditSubmissions
} from './../../models/';
import { RedditApiService } from './../../services/reddit-api.service';
import {
    GotLiveService,
    ChangeType
} from './../../services/';
import { Subscription } from 'rxjs/Subscription';
import { FeedFilter } from './../feed-filter.model';
import { FeedService } from './../feed.service';
import {
    Router
} from '@angular/router';
import {
    MdDialog
} from '@angular/material';


@Component({
    selector: 'feed-list',
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnDestroy, OnInit {

    private _submissions: RedditSubmissions = [
    ];

    private feedFilter: FeedFilter;
    private filterSubscription: Subscription;
    private databaseChangeSubscription: Subscription;
    private refreshSubscription: Subscription;
    constructor(private redditApiService: RedditApiService,
                private gotLive: GotLiveService,
                private feedService: FeedService,
                private router: Router,
                private dialog: MdDialog, ) {
    }

    public ngOnInit(): void {
        this.filterSubscription = this.feedService.feedFilterObservable.subscribe(filter => {
            this.feedFilter = filter;
            console.log(filter);
            this.updateList();
        });
        this.databaseChangeSubscription = this.gotLive.submissionUpdate
            .debounceTime(200)
            .subscribe(evt => {
                if (evt.type == ChangeType.DELETE) {

                } else if (evt.type === ChangeType.CREATE) {
                    this.refreshList();
                } else if (evt.type === ChangeType.UPDATE) {
                    this.refreshList();
                }
            });
        this.refreshList();
    }

    public refreshList(): void {
        if (this.refreshSubscription && !this.refreshSubscription.closed) {
            // already polling
            return;
        }
        this.gotLive.getSubmissions().then((data) => {
            this._submissions = this._submissions.slice(0, 0);
            this._submissions.concat(data);
            this.submissions = data;
        });
    }

    public get submissions(): RedditSubmissions {
        return this._submissions;
    }

    public set submissions(submissions: RedditSubmissions) {
        this._submissions = submissions;
        this._submissions.sort(function(a, b) {
            return b.created_utc - a.created_utc;
        });
    }

    private updateList() {
        this.submissions.sort(function(a, b) {
            return b.created_utc - a.created_utc;
        });
    }


    public ngOnDestroy() {
        this.databaseChangeSubscription.unsubscribe();
        this.filterSubscription.unsubscribe();
    }
}
