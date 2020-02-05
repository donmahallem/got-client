import {
    TestBed,
    async,
    ComponentFixture,
    fakeAsync
} from '@angular/core/testing';
import {
    DebugElement,
    Component
} from '@angular/core';
import {
    By
} from '@angular/platform-browser';
import {
    FeedBodyComponent
} from './feed-body.component';
import {
    MaterialModule,
    MdSidenav
} from '@angular/material';
import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    FeedService
} from './../feed.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
    selector: 'feed-sidebar',
    template: '<h1>test</h1>'
})
export class FeedSidebarDummy {
}
@Component({
    selector: 'feed-list',
    template: '<h1>test</h1>'
})
export class FeedListDummy {
}
const sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class FeedServiceStub {
    public sidebarOpenObservable: Observable<boolean> = sidebarOpenSubject.asObservable();
    public toggleSidebar(): void {

    }
}
describe('FeedBodyComponent', () => {
    let feedBodyFixture: ComponentFixture<FeedBodyComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedBodyComponent,
                FeedSidebarDummy,
                FeedListDummy
            ], imports: [
                RouterTestingModule,
                MaterialModule
            ],
            providers: [
                {
                    provide: FeedService,
                    useClass: FeedServiceStub
                }
            ]
        }).compileComponents();
        feedBodyFixture = TestBed.createComponent(FeedBodyComponent);
        feedBodyFixture.detectChanges();
    }));

    it('should set sidenav opened to sidebarOpen', fakeAsync(() => {
        const sidenavElement: DebugElement = feedBodyFixture.debugElement.query(By.css('md-sidenav'));
        const sidenavComponent: MdSidenav = sidenavElement.componentInstance as MdSidenav;
        feedBodyFixture.componentInstance.sidebarOpen = true;
        feedBodyFixture.detectChanges();
        expect(sidenavComponent.opened).toBeTruthy();
        feedBodyFixture.componentInstance.sidebarOpen = false;
        feedBodyFixture.detectChanges();
        expect(sidenavComponent.opened).toBeFalsy();
    })); /*
    it("should have as title \"[store] test title\"", fakeAsync(() => {
        let sidenavElement: DebugElement = feedBodyFixture.debugElement.query(By.css("md-sidenav"));
        let sidenavComponent: MdSidenav = <MdSidenav>sidenavElement.componentInstance;
        let spy: jasmine.Spy = jasmine.createSpy("name");
        let sub: Subscription = sidenavComponent.onOpenStart.subscribe(spy);
        feedBodyFixture.componentInstance.sidebarOpen = true;
        feedBodyFixture.detectChanges();
        tick();
        expect(sidenavComponent.opened).toBeTruthy();
        sub.unsubscribe();
    }));*/
});
