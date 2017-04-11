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
}