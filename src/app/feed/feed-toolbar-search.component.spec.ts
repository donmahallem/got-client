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
    By
} from "@angular/platform-browser";
import {
    FeedToolbarSearchComponent
} from "./feed-toolbar-search.component";
import { Router } from "@angular/router";
import {
    BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";
import {
    MaterialModule
} from "@angular/material";
import {
    NoopAnimationsModule
} from "@angular/platform-browser/animations";
import {
    click
} from "./../../testing/";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SearchUtil } from "./../util/";

class RouterStub {
    public navigate = jasmine.createSpy("navigate", (url: any[], args: any) => {

    });
}
describe("FeedToolbarSearchComponent", () => {
    let componentFixture: ComponentFixture<FeedToolbarSearchComponent>;
    let sanitizeSpy: jasmine.Spy;
    let router: Router;
    let routerStub: RouterStub;
    beforeAll(() => {
        sanitizeSpy = spyOn(SearchUtil, "sanitize").and.returnValue("test");
    });
    beforeEach(async(() => {
        routerStub = new RouterStub();
        TestBed.configureTestingModule({
            declarations: [
                FeedToolbarSearchComponent
            ], imports: [
                NoopAnimationsModule,
                ReactiveFormsModule,
                MaterialModule
            ],
            providers: [
                {
                    provide: Router,
                    useValue: routerStub
                }
            ]
        })
            .compileComponents()
            .then(() => {
                componentFixture = TestBed.createComponent(FeedToolbarSearchComponent);
                // query for the title <h1> by CSS element selector
                componentFixture.detectChanges();
                router = componentFixture.debugElement.injector.get(Router);
            });
    }));
    afterEach(() => {
        sanitizeSpy.calls.reset();
    });
    describe("search()", () => {

        it("should not call the router if the field is empty", () => {
            let comp: FeedToolbarSearchComponent = componentFixture.componentInstance;
            let inputElement = componentFixture.debugElement.query(By.css("input"));
            inputElement.nativeElement.value = null;
            componentFixture.detectChanges();
            comp.search();
            expect(routerStub.navigate.calls.count()).toEqual(0, "router.navigate should not have been called");
            expect(sanitizeSpy.calls.count()).toEqual(0, "SearchUtil.sanitize should not have been called");
        });
        it("should not call the router if the field is an empty string", () => {
            let comp: FeedToolbarSearchComponent = componentFixture.componentInstance;
            let inputElement = componentFixture.debugElement.query(By.css("input"));
            inputElement.nativeElement.value = "";
            componentFixture.detectChanges();
            comp.search();
            expect(routerStub.navigate.calls.count()).toEqual(0, "router.navigate should not have been called");
            expect(sanitizeSpy.calls.count()).toEqual(0, "SearchUtil.sanitize should not have been called");
        });
        it("should call the router with a sanitized query", () => {
            let comp: FeedToolbarSearchComponent = componentFixture.componentInstance;
            let inputElement = componentFixture.debugElement.query(By.css("input"));
            comp.stateCtrl.setValue("test");
            comp.search();
            expect(comp.stateCtrl.value).toEqual("test");
            expect(sanitizeSpy.calls.count()).toEqual(1);
            expect(sanitizeSpy.calls.argsFor(0)).toEqual(["test"]);
            expect(routerStub.navigate.calls.count()).toEqual(1, "router.navigate should have been called once");
            expect(routerStub.navigate.calls.argsFor(0).length).toEqual(2, "router.navigate should have been with 2 arguments");
            expect(routerStub.navigate.calls.argsFor(0)[0]).toEqual(jasmine.arrayContaining(["feed", "search"]), "router.navigate should have been with 2 arguments");
            expect(routerStub.navigate.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
                queryParams: {
                    q: "test"
                }
            }), "router.navigate should have been with 2 arguments");
        });
    });
});
