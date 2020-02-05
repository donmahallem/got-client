import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';
import {
    Subscription
} from 'Subscription';
import {
    RedditSubmissions
} from './../../../models';
import {
    GotLiveService
} from './../../../services';

@Component({
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    public submissions: RedditSubmissions = [];
    public searchTerms: string[] = [];
    constructor(private activatedRoute: ActivatedRoute,
        private gotLive: GotLiveService) {
    }

    public ngOnInit(): void {
        this.routeSubscription = this.activatedRoute
            .queryParams
            .subscribe(params => {
                console.log('should be quering for', params.q);
                if (typeof params.q === 'string' && params.q.length > 0) {
                    this.searchTerms = params.q.split(' ');
                    this.search(params.q);
                }
            });
    }

    public search(q: string): void {
        this.gotLive.searchSubmissions(q.split(' ')).toArray().then(res => {
            this.submissions = res;
        });

    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}
