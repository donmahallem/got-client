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
    FeedToolbarComponent
} from "./feed-toolbar.component";
import {
    BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";

import {
    MaterialModule
} from "@angular/material";
import {
    click
} from "./../../testing/";
import {
    FeedService
} from "./feed.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


const sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

class FeedServiceStub {
    public toggleSidebar(): void {

    }
    public sidebarOpenObservable: Observable<boolean> = sidebarOpenSubject.asObservable();
}
describe("FeedToolbarComponent", () => {
    let componentFixture: ComponentFixture<FeedToolbarComponent>;
    let feedService: FeedService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedToolbarComponent
            ], imports: [
                MaterialModule
            ],
            providers: [
                {
                    provide: FeedService,
                    useClass: FeedServiceStub
                }
            ]
        }).compileComponents();
        componentFixture = TestBed.createComponent(FeedToolbarComponent);
        feedService = TestBed.get(FeedService);
        // query for the title <h1> by CSS element selector
        componentFixture.detectChanges();
    }));

    describe("sidebar toggle button", () => {
        let sidebarToggleDebugElement: DebugElement;
        beforeEach(() => {
            sidebarToggleDebugElement = componentFixture.debugElement.query(By.css("button.sidebarToggle"));
        })
        it("should trigger sidebarToggle service function", () => {
            let spy: jasmine.Spy = spyOn(feedService, "toggleSidebar");
            click(sidebarToggleDebugElement);
            expect(spy.calls.count()).toEqual(1);
        });
        it("should switch symbol depending on state", fakeAsync(() => {
            let icon: DebugElement = sidebarToggleDebugElement.query(By.css("md-icon"));
            sidebarOpenSubject.next(true);
            tick();
            componentFixture.detectChanges();
            expect(icon.nativeElement.textContent).toEqual("arrow_back");
            sidebarOpenSubject.next(false);
            componentFixture.detectChanges();
            tick();
            expect(icon.nativeElement.textContent).toEqual("menu");
        }));
    });
});
