import {
    Component,
    OnDestroy,
    OnChanges,
    Input,
    SimpleChanges
} from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import * as moment from "moment";

import {
    RedditSubmission
} from "./../models/"
import { RedditApiService } from "./../services/reddit-api.service";
import {
    MdDialog,
    MdDialogRef
} from '@angular/material';
import { SubmissionDialogComponent } from "./submission-dialog.component";

@Component({
    selector: "feed-list-item",
    templateUrl: './feed-list-item.component.html',
    styleUrls: ['./feed-list-item.component.css'],
    animations: [
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})
export class FeedListItemComponent implements OnDestroy, OnChanges {

    @Input()
    private submission: RedditSubmission;
    private icon: string;
    constructor(private dialog: MdDialog) {
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
        let dialogRef = this.dialog.open(SubmissionDialogComponent, { data: submission });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
