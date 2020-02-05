import {
    Component,
    Input
} from '@angular/core';
@Component({
    selector: 'app-submission-title',
    templateUrl: './submission-title.component.html',
    styleUrls: ['./submission-title.component.css']
})
export class SubmissionTitleComponent {
    @Input()
    public title: string;
    @Input()
    public createdUtc: number;
    @Input()
    public author: string;
    constructor() { }

}
