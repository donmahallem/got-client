import {
    Component,
    OnDestroy,
    OnChanges,
    Input,
    SimpleChanges
} from '@angular/core';
import {
    Router
} from "@angular/router"
import {
    RedditSubmission
} from "./../models/"
import {
    Logger
} from "./../util/logger";
import {
    SubmissionDialogComponent
} from "./submission-dialog.component";

@Component({
    selector: "feed-list-item",
    templateUrl: './feed-list-item.component.html',
    styleUrls: ['./feed-list-item.component.css']
})
export class FeedListItemComponent implements OnDestroy, OnChanges {

    @Input()
    public submission: RedditSubmission;
    public icon: string;
    constructor(private router: Router) {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (this.submission.title.match(/\[(W|H)\].*\[(W|H)\]/i)) {
            this.icon = "swap_horiz";
        } else if (this.submission.title.match(/\[store\].*/i)) {
            this.icon = "store";
        } else if (this.submission.title.match(/\[q\].*/i)) {
            this.icon = "help_outline";
        } else if (this.submission.title.match(/^\[pc\].*/i)) {
            this.icon = "attach_money";
        } else {
            this.icon = "note";
        }
    }

    public ngOnDestroy() {
    }

    public submissionSelected(submission: RedditSubmission) {
        this.router.navigate(['/feed/submission', submission.id]);
    }
}
