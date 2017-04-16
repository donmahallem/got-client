import {
    Component,
    OnDestroy
} from "@angular/core";
import { FeedService } from "./feed.service";
import { Subscription } from "rxjs/Subscription";
@Component({
    selector: "feed-body",
    templateUrl: "./feed-body.component.html",
    styleUrls: ["./feed-body.component.css"]
})
export class FeedBodyComponent implements OnDestroy {
    sidebarOpen: boolean;

    private sidebarOpenSubscription: Subscription;
    constructor(private feedService: FeedService) {
        this.sidebarOpenSubscription = this.feedService.sidebarOpenObservable.subscribe(
            open => {
                this.sidebarOpen = open;
            });
    }

    public ngOnDestroy() {
        this.sidebarOpenSubscription.unsubscribe();
    }
}
