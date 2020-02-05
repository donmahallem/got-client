import {
    Component,
    OnDestroy,
    OnChanges,
    Input,
    SimpleChanges
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    RedditSubmission
} from './../../../models/';

@Component({
    selector: 'search-result-item',
    templateUrl: './search-result-item.component.html'
})
export class SearchResultItemComponent implements OnDestroy, OnChanges {

    @Input('submission')
    public submission: RedditSubmission;
    @Input('searchTerms')
    public searchTerms: string[];
    public icon: string;
    constructor(private router: Router) {
    }

    public ngOnChanges(changes: SimpleChanges) {
        const _searchTerms: string[] = this.searchTerms;
        let _sub: RedditSubmission = this.submission;
        if (changes.hasOwnProperty('submission') && changes.submission.currentValue) {
            _sub = changes.submission.currentValue;
        }
        if (changes.hasOwnProperty('searchTerms') && changes.searchTerms.currentValue) {
            _sub = changes.searchTerms.currentValue;
        }
        if (_searchTerms && _sub) {
            console.log('both set');
        }
    }

    public ngOnDestroy() {
    }

    public click() {
        this.router.navigate(['/feed/submission', this.submission.id]);
    }
}
