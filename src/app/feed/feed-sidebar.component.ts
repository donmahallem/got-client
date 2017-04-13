import {
    Component,
    OnDestroy
} from "@angular/core";

import {
    RedditSubmissions
} from "./../models/"
import { RedditApiService } from "./../services/reddit-api.service";
import {
    GotLiveService
} from "./../services/";
import { FeedService } from "./feed.service";
import { Subscription } from "rxjs/Subscription";
import { FeedFilter } from "./feed-filter.model";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "feed-sidebar",
    templateUrl: "./feed-sidebar.component.html",
    styleUrls: ["./feed-sidebar.component.css"]
})
export class FeedSidebarComponent implements OnDestroy {

    private feedFilter: FeedFilter;
    private filterSubscription: Subscription;
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
        //this.filterSubscription.unsubscribe();
    }

    public tt(value) {
        console.log(value);
    }
}
