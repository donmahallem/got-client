import {
    Component,
    OnDestroy,
    Input
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    RedditSubmission
} from './../../../models/';

@Component({
    selector: 'app-search-result-item',
    templateUrl: './search-result-item.component.html'
})
export class SearchResultItemComponent implements OnDestroy {

    @Input()
    public submission: RedditSubmission;
    @Input()
    public searchTerms: string[];
    public icon: string;
    constructor(private router: Router) {
    }


    public ngOnDestroy() {
    }

    public click() {
        this.router.navigate(['/feed/submission', this.submission.id]);
    }
}
