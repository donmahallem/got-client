import {
    Component,
    Pipe,
    PipeTransform
} from "@angular/core";
import {
    RedditSubmission,
    VoteState
} from "./../../../models/"
import { GotApiService } from "./../../../services/got-api.service";

import {
    Logger
} from "./../../../util/";

@Component({
    templateUrl: "./submission-body.component.html",
    styleUrls: ["submission-body.component.css"],
    selector: "submission-body"
})
export class SubmissionBodyComponent {
    public submission: RedditSubmission;
    public voteState: VoteState = VoteState.NEUTRAL;
    constructor(
        private gotApi: GotApiService) {
        //THIS IS WHACKY AS FCK
    }

    public vote(state: VoteState): void {
        this.voteState = VoteState.POSITIVE;
        this.gotApi.upvote(this.submission)
            .subscribe(succes => {
                Logger.log(succes);
            });
    }

    public openInNewTab(url: string): void {
        let win = window.open(url, "_blank");
        win.focus();
    }

    /**
     * opens the reddit thread corresponding to this submission
     */
    public openRedditThread(): void {
        this.openInNewTab(this.submission.url);
    }

    public openRedditAccount(): void {
        this.openInNewTab("https://www.reddit.com/u/" + this.submission.author);
    }
}