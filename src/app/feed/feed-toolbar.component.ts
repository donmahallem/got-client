import { Component } from '@angular/core';
import { FeedService } from "./feed.service";

@Component({
    selector: "feed-toolbar",
    templateUrl: './feed-toolbar.component.html',
    styleUrls: ['./feed-toolbar.component.css']
})
export class FeedToolbarComponent {
    constructor(private feedService: FeedService) {
    }

    public toggleSidebar() {
        this.feedService.toggleSidebar();
    }
}
