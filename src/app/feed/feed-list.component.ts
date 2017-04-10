import {
    Component,
    OnDestroy
} from '@angular/core';

import {
    RedditSubmissions
} from "./../models/"
import { RedditApiService } from "./../services/reddit-api.service";
import {
    GotLiveService,
    GotApiCacheService
} from "./../services/";
import { Subscription } from 'rxjs/Subscription';
import { FeedFilter } from "./feed-filter.model";
import { FeedService } from "./feed.service";

@Component({
    selector: "feed-list",
    templateUrl: './feed-list.component.html',
    styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnDestroy {

    private submissionsCache: RedditSubmissions = [];
    private submissions: RedditSubmissions = [
    ];

    private feedFilter: FeedFilter;
    private filterSubscription: Subscription;
    constructor(private redditApiService: RedditApiService,
        private gotLive: GotLiveService,
        private feedService: FeedService,
        private gotApiCache: GotApiCacheService) {
        this.filterSubscription = feedService.feedFilterObservable.subscribe(filter => {
            this.feedFilter = filter;
            console.log(filter);
            this.updateList();
        });
        this.gotLive.submissionObservable.subscribe(submission => {
            this.submissionsCache.push(submission);
            this.updateList();
        });
        this.gotLive.getSubmissions(12)
            .then(subs => {
                this.submissionsCache = subs;
                this.updateList();
            });
    }

    private updateList() {
        this.submissions = this.submissionsCache.filter(sub => {
            if (sub.link_flair_text.match(/^trade$/i) && this.feedFilter.trade) {
                return true;
            } else if (sub.link_flair_text.match(/^store$/i) && this.feedFilter.store) {
                return true;
            } else if (sub.link_flair_text.match(/^question$/i) && this.feedFilter.question) {
                return true;
            } else if (sub.link_flair_text.match(/^psa$/i) && this.feedFilter.psa) {
                return true;
            } else if (sub.link_flair_text.match(/^pricecheck$/i) && this.feedFilter.pricecheck) {
                return true;
            } else {
                return false;
            }
        });
        this.submissions.sort(function (a, b) {
            return b.created_utc - a.created_utc;
        });
    }


    public ngOnDestroy() {
    }
}
