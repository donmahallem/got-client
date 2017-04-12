import {
    Component,
    Pipe,
    PipeTransform
} from '@angular/core';
import {
    RedditSubmission,
    VoteState
} from "./../models/"
import {
    MdDialogRef
} from '@angular/material';
/// <reference path="snudown-js.d.ts" />
import * as snudown from "snudown-js";
import { GotApiService } from "./../services/got-api.service";

import {
} from "dom";


@Pipe({ name: 'snudown' })
export class SnuDownPipe implements PipeTransform {
    transform(value: string): string {
        return snudown.markdown(value);
    }
}

@Component({
    templateUrl: './submission-dialog.component.html',
    styleUrls: ["submission-dialog.component.css"]
})
export class SubmissionDialogComponent {
    public submission: RedditSubmission;
    public voteState: VoteState = VoteState.NEUTRAL;
    constructor(public dialogRef: MdDialogRef<SubmissionDialogComponent>,
        private gotApi: GotApiService) {
        //THIS IS WHACKY AS FCK
        this.submission = this.dialogRef._containerInstance.dialogConfig.data;
    }

    public upvote() {
        this.voteState = VoteState.POSITIVE;
        this.gotApi.upvote(this.submission)
            .subscribe(succes => {
                console.log(succes);
            });
    }

    public downvote() {
        this.voteState = VoteState.NEGATIVE;
    }

    public openInNewTab(url: string): void {
        let win = window.open(url, '_blank');
        win.focus();
    }

    public openRedditThread(): void {
        this.openInNewTab(this.submission.url);
    }

    public openRedditAccount(): void {
        this.openInNewTab("https://www.reddit.com/u/" + this.submission.author);
    }
}