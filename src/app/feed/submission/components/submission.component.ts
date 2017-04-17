import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import {
    Router,
    ActivatedRoute
} from "@angular/router";
import {
    RedditSubmission
} from "./../../../models/"
import { Subscription } from "rxjs/Subscription";
import {
    RedditApiService
} from "./../../../services/";
import {
    Logger
} from "./../../../util/";

@Component({
    templateUrl: "./submission.component.html",
    styleUrls: ["./submission.component.css"]
})
export class SubmissionComponent implements OnInit, OnDestroy {
    private submission: RedditSubmission;
    private routeDataSubscription: Subscription;
    private routeParamsSubscription: Subscription;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private redditApi: RedditApiService) {
        this.submission = route.snapshot.data.submission;
    }

    public ngOnInit(): void {
        this.routeDataSubscription = this.route.data
            .subscribe((data: { submission: RedditSubmission }) => {
                if (data.submission) {
                    this.submission = data.submission;
                }
            });
        this.routeParamsSubscription = this.route.params
            .subscribe(params => {
                if (params && params.hasOwnProperty("id")) {
                    this.refreshSubmission();
                }
            });
    }

    public get submissionId(): string {
        return this.route.snapshot.params.id;
    }

    public refreshSubmission(submissionId: string = null): void {
        if (submissionId === null) {
            this.refreshSubmission(this.route.snapshot.params.id);
            return;
        }
        this.redditApi.getSubmissionById("t3_" + submissionId)
            .subscribe(sub => {
                if (sub.children.length === 1 && sub.children[0].kind === "t3" && sub.children[0].data.id === this.submissionId) {
                    this.submission = sub.children[0].data;
                    Logger.info("Successfully queried reddit for", submissionId);
                } else {
                    throw new Error("didnt get the requested thing");
                }
            }, error => {
                Logger.error("Couldnt retrieve", submissionId, error);
            }, () => {

            });
    }

    public ngOnDestroy(): void {
        this.routeDataSubscription.unsubscribe();
    }
}
