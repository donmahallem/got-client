import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FeedFilter } from "./feed-filter.model";
@Injectable()
export class FeedService {
    // Observable string sources
    private openSidebarSource = new BehaviorSubject<boolean>(false);
    private feedFilterSource = new BehaviorSubject<FeedFilter>(new FeedFilter());
    // Observable string streams
    sidebarOpenObservable = this.openSidebarSource.asObservable();
    feedFilterObservable = this.feedFilterSource.asObservable();
    // Service message commands
    public set sidebarOpen(open: boolean) {
        this.openSidebarSource.next(open);
    }

    public toggleSidebar() {
        this.openSidebarSource.next(!this.openSidebarSource.value);
    }

    public get feedFilter(): FeedFilter {
        return this.feedFilterSource.value;
    }

    public set feedFilter(f: FeedFilter) {
        this.feedFilterSource.next(f);
    }


    public get sidebarOpen(): boolean {
        return this.openSidebarSource.value;
    }
}