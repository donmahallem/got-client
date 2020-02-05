import { Injectable } from '@angular/core';
import { FeedFilter } from './feed-filter.model';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class FeedService {
    // Observable string sources
    private openSidebarSource = new BehaviorSubject<boolean>(false);
    private feedFilterSource = new BehaviorSubject<FeedFilter>(new FeedFilter());
    // Observable string streams
    sidebarOpenObservable = this.openSidebarSource.asObservable();
    feedFilterObservable = this.feedFilterSource.asObservable();
    constructor() {

    }
    public get sidebarOpen(): boolean {
        return this.openSidebarSource.value;
    }
    // Service message commands
    public set sidebarOpen(open: boolean) {
        this.openSidebarSource.next(open);
    }

    public toggleSidebar(): void {
        this.openSidebarSource.next(!this.openSidebarSource.value);
    }

    public get feedFilter(): FeedFilter {
        return this.feedFilterSource.value;
    }

    public set feedFilter(f: FeedFilter) {
        this.feedFilterSource.next(f);
    }


}
