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
    click
} from "./../../testing/";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

class RouterStub {
    navigate(url: string[]): Promise<boolean> {
        return Promise.resolve(true);
    }
}
describe("FeedToolbarSearchComponent", () => {
    let componentFixture: ComponentFixture<FeedToolbarSearchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedToolbarSearchComponent
            ], imports: [
                MaterialModule
            ],
            providers: [
                {
                    provide: Router,
                    useClass: RouterStub
                }
            ]
        }).compileComponents();
        componentFixture = TestBed.createComponent(FeedToolbarSearchComponent);
        // query for the title <h1> by CSS element selector
        componentFixture.detectChanges();
    }));

});
