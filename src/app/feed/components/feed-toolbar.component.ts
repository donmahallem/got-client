import {
    Component,
    OnDestroy
} from '@angular/core';
import {
    Router
} from '@angular/router';
import { FeedService } from './../feed.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-feed-toolbar',
    templateUrl: './feed-toolbar.component.html',
    styleUrls: ['./feed-toolbar.component.css']
})
export class FeedToolbarComponent implements OnDestroy {
    private sidebarSubscription: Subscription;
    public sidebarOpen = false;
    constructor(private feedService: FeedService,
                private router: Router) {
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

    public goToHome(): void {
        this.router.navigate(['feed']);
    }
}
