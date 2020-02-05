import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';

import {
    RedditSubmissions
} from './../../models/';
import {
    GotLiveService,
    ChangeType
} from './../../services/';
import { FeedService } from './../feed.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-feed-list',
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnDestroy, OnInit {

    private mSubmissions: RedditSubmissions = [
    ];

    private filterSubscription: Subscription;
    private databaseChangeSubscription: Subscription;
    private refreshSubscription: Subscription;
    constructor(private gotLive: GotLiveService,
                private feedService: FeedService) {
    }

    public ngOnInit(): void {
        this.filterSubscription = this.feedService.feedFilterObservable.subscribe(filter => {
            this.updateList();
        });
        this.databaseChangeSubscription = this.gotLive.submissionUpdate
            .pipe(debounceTime(200))
            .subscribe(evt => {
                if (evt.type === ChangeType.DELETE) {

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
            this.mSubmissions = this.mSubmissions.slice(0, 0);
            this.mSubmissions.concat(data);
            this.submissions = data;
        });
    }

    public get submissions(): RedditSubmissions {
        return this.mSubmissions;
    }

    public set submissions(submissions: RedditSubmissions) {
        this.mSubmissions = submissions;
        this.mSubmissions.sort((a, b) => {
            return b.created_utc - a.created_utc;
        });
    }

    private updateList() {
        this.submissions.sort((a, b) => {
            return b.created_utc - a.created_utc;
        });
    }


    public ngOnDestroy() {
        this.databaseChangeSubscription.unsubscribe();
        this.filterSubscription.unsubscribe();
    }
}
