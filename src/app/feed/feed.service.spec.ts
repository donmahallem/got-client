import {
    TestBed,
    async,
    inject,
    fakeAsync,
    tick
} from "@angular/core/testing";
import {
    FeedService
} from "./feed.service";
import {
    Subscription
} from "rxjs/subscription";

describe("FeedService", () => {
    let feedService: FeedService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ], imports: [
            ],
            providers: [
                FeedService
            ]
        }).compileComponents();
        feedService = TestBed.get(FeedService);
    }));
    describe("sidebarOpen", () => {
        it("should trigger the sidebarOpenObservable", fakeAsync(inject([FeedService], (feedService: FeedService) => {
            let spy: jasmine.Spy = jasmine.createSpy("open");
            let subscription: Subscription = feedService.sidebarOpenObservable.subscribe(spy);
            feedService.sidebarOpen = true;
            tick();
            feedService.sidebarOpen = false;
            tick();
            expect(spy.calls.allArgs()).toEqual(jasmine.arrayContaining([[false], [true], [false]]));
            expect(spy.calls.count()).toEqual(3);
            subscription.unsubscribe();
        })));
    });
    describe("toggleSidebar()", () => {
        it("should trigger the sidebarOpenObservable", fakeAsync(inject([FeedService], (feedService: FeedService) => {
            let spy: jasmine.Spy = jasmine.createSpy("open");
            let subscription: Subscription = feedService.sidebarOpenObservable.subscribe(spy);
            feedService.toggleSidebar();
            tick();
            feedService.toggleSidebar();
            tick();
            feedService.toggleSidebar();
            tick();
            expect(spy.calls.argsFor(0)[0]).toEqual(!spy.calls.argsFor(1)[0]);
            expect(spy.calls.argsFor(1)[0]).toEqual(!spy.calls.argsFor(2)[0]);
            expect(spy.calls.argsFor(2)[0]).toEqual(!spy.calls.argsFor(3)[0]);
            expect(spy.calls.count()).toEqual(4);
            subscription.unsubscribe();
        })));
    });
});
