import {
    Component,
    Input
} from '@angular/core';
@Component({
    selector: 'submission-title',
    templateUrl: './submission-title.component.html',
    styleUrls: ['./submission-title.component.css']
})
export class SubmissionTitleComponent {
    @Input('title')
    public title: string;
    @Input('createdUtc')
    public createdUtc: number;
    @Input('author')
    public author: string;
    constructor() { }

}
