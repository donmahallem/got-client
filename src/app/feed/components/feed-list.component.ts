import {
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";

import {
    RedditSubmissions
} from "./../../models/"
import { RedditApiService } from "./../../services/reddit-api.service";
import {
    GotLiveService,
    GotApiCacheService
} from "./../../services/";
import { Subscription } from "rxjs/Subscription";
import { FeedFilter } from "./../feed-filter.model";
import { FeedService } from "./../feed.service";
import {
    Router,
    ActivatedRoute
} from "@angular/router"
import {
    MdDialog,
    MdDialogRef
} from "@angular/material";
import { SubmissionDialogComponent } from "./submission-dialog.component";

@Component({
    selector: "feed-list",
    templateUrl: "./feed-list.component.html",
    styleUrls: ["./feed-list.component.css"]
})
export class FeedListComponent implements OnDestroy, OnInit {

    private submissionsCache: RedditSubmissions = [];
    submissions: RedditSubmissions = [
    ];

    private feedFilter: FeedFilter;
    private filterSubscription: Subscription;
    private urlSubscription: Subscription;
    constructor(private redditApiService: RedditApiService,
        private gotLive: GotLiveService,
        private feedService: FeedService,
        private gotApiCache: GotApiCacheService,
        private router: Router,
        private dialog: MdDialog,
        private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.filterSubscription = this.feedService.feedFilterObservable.subscribe(filter => {
            this.feedFilter = filter;
            console.log(filter);
            this.updateList();
        });
        this.gotLive.submissionObservable.subscribe(submission => {
            this.submissionsCache.push(submission);
            this.updateList();
        });
        this.gotLive.getSubmissions()
            .then(subs => {
                this.submissionsCache = subs;
                this.updateList();
            });
        this.urlSubscription = this.activatedRoute.url.subscribe(vals => {
            if (vals.length === 2 && vals[0].path === "submission") {
                this.gotLive.getSubmission(vals[1].path)
                    .then(sub => {
                        let dialogRef = this.dialog.open(SubmissionDialogComponent, { data: sub });
                        dialogRef.afterClosed().subscribe(result => {
                            this.router.navigate(["/feed"]);
                        });
                    })
            }
        });
    }

    private updateList() {
        this.submissions = this.submissionsCache.filter(sub => {
            if (sub.link_flair_text) {
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
            }
            return true;
        });
        this.submissions.sort(function (a, b) {
            return b.created_utc - a.created_utc;
        });
    }


    public ngOnDestroy() {
        this.urlSubscription.unsubscribe();
        this.filterSubscription.unsubscribe();
    }
}
