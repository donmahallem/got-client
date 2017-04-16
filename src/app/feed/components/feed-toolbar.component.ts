import {
    Component,
    OnDestroy
} from "@angular/core";
import { FeedService } from "./feed.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "feed-toolbar",
    templateUrl: "./feed-toolbar.component.html",
    styleUrls: ["./feed-toolbar.component.css"]
})
export class FeedToolbarComponent implements OnDestroy {
    private sidebarSubscription: Subscription;
    public sidebarOpen: boolean = false;
    constructor(private feedService: FeedService) {
        this.sidebarSubscription = feedService.sidebarOpenObservable
            .subscribe(open => {
                this.sidebarOpen = open;
            });
    }

    public ngOnDestroy() {
        this.sidebarSubscription.unsubscribe();
    }

    public toggleSidebar(): void {
        this.feedService.toggleSidebar();
    }
}
