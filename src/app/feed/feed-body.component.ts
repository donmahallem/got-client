import {
    Component,
    OnDestroy
} from '@angular/core';
import { FeedService } from "./feed.service";
import { GotApiService } from "./../services/";
@Component({
    selector: "feed-body",
    templateUrl: './feed-body.component.html',
    styleUrls: ['./feed-body.component.css']
})
export class FeedBodyComponent implements OnDestroy {
    sidebarOpen: boolean;
    constructor(private feedService: FeedService,
        private apiService: GotApiService) {

        this.feedService.sidebarOpenObservable.subscribe(
            open => {
                this.sidebarOpen = open;
            });
        this.apiService.getMe().subscribe(me => {
            console.log("ME", JSON.stringify(me));
        });
    }

    public ngOnDestroy() {
    }
}
