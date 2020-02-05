import {
    Component,
    OnDestroy
} from '@angular/core';
import {
    FeedService
} from './../feed.service';
import {
    FormControl,
    FormGroup
} from '@angular/forms';

@Component({
    selector: 'app-feed-sidebar',
    templateUrl: './feed-sidebar.component.html',
    styleUrls: ['./feed-sidebar.component.css']
})
export class FeedSidebarComponent implements OnDestroy {

    feedFilterForm: FormGroup;
    constructor(private feedService: FeedService) {
        /*this.filterSubscription = feedService.feedFilterObservable.subscribe(filter => {
            this.feedFilter = filter;
        });*/
        this.feedFilterForm = new FormGroup({
            store: new FormControl(true),
            trade: new FormControl(true),
            question: new FormControl(true),
            psa: new FormControl(true),
            pricecheck: new FormControl(true)
        });
        this.feedFilterForm.valueChanges.subscribe(data => {
            this.feedService.feedFilter = data;
        });
    }

    public ngOnDestroy() {
        // this.filterSubscription.unsubscribe();
    }
}
