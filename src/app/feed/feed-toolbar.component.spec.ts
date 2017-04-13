import {
    TestBed,
    async,
    ComponentFixture,
    inject,
    tick
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
class FeedServiceStub {
    public toggleSidebar(): void {

    }
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
        it("should trigger sidebarToggle service function", () => {
            let sidebarToggleDebugElement: DebugElement = componentFixture.debugElement.query(By.css("button.sidebarToggle"));
            let spy: jasmine.Spy = spyOn(feedService, "toggleSidebar");
            click(sidebarToggleDebugElement);
            expect(spy.calls.count()).toEqual(1);
        });
    });
});
