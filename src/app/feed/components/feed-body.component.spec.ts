import {
    TestBed,
    async,
    ComponentFixture,
    inject,
    tick,
    fakeAsync
} from "@angular/core/testing";
import {
    DebugElement,
    Component
} from "@angular/core";
import {
    MdIcon,
    MdListItem
} from "@angular/material";
import {
    By
} from "@angular/platform-browser";
import {
    FeedBodyComponent
} from "./feed-body.component";
import {
    BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";
import {
    MaterialModule,
    MdSidenav
} from "@angular/material";
import {
    RouterTestingModule
} from "@angular/router/testing";
import {
    click
} from "./../../../testing/";
import {
    FeedService
} from "./../feed.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
@Component({
    selector: "feed-sidebar",
    template: "<h1>test</h1>"
})
export class FeedSidebarDummy {
}
@Component({
    selector: "feed-list",
    template: "<h1>test</h1>"
})
export class FeedListDummy {
}
const sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class FeedServiceStub {
    public toggleSidebar(): void {

    }
    public sidebarOpenObservable: Observable<boolean> = sidebarOpenSubject.asObservable();
}
describe("FeedBodyComponent", () => {
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

    it("should set sidenav opened to sidebarOpen", fakeAsync(() => {
        let sidenavElement: DebugElement = feedBodyFixture.debugElement.query(By.css("md-sidenav"));
        let sidenavComponent: MdSidenav = <MdSidenav>sidenavElement.componentInstance;
        feedBodyFixture.componentInstance.sidebarOpen = true;
        feedBodyFixture.detectChanges();
        expect(sidenavComponent.opened).toBeTruthy();
        feedBodyFixture.componentInstance.sidebarOpen = false;
        feedBodyFixture.detectChanges();
        expect(sidenavComponent.opened).toBeFalsy();
    }));/*
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
