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
    FeedListItemComponent
} from "./feed-list-item.component";
import {
    GotAuthService
} from "./../services";
import {
    MomentFromNowPipe
} from "./../util/moment-from-now.pipe"
import {
    BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";

import {
    MaterialModule
} from "@angular/material";
import {
    RouterTestingModule
} from "@angular/router/testing";
import {
    RedditSubmission
} from "./../models/reddit-submission.model";
import {
    click
} from "./../../testing/";
import {
    Router
} from "@angular/router";


const expectedSubmission: RedditSubmission = {
    title: "[store] test title",
    created_utc: 2999,
    name: "t3_abcde",
    id: "abcde"
}
@Component({
    template: "<feed-list-item  [submission]=\"submission\"></feed-list-item>",
})
class TestHostComponent {
    submission = expectedSubmission;
}
class RouterStub {
    navigate(url: string[]): Promise<boolean> {
        return Promise.resolve(true);
    }
}
describe("FeedListItemComponent", () => {
    let testHost: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    let router: Router;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestHostComponent,
                FeedListItemComponent,
                MomentFromNowPipe
            ], imports: [
                MaterialModule
            ],
            providers: [
                {
                    provide: Router,
                    useClass: RouterStub
                }]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(TestHostComponent);
        router = TestBed.get(Router);
        // query for the title <h1> by CSS element selector
        testHostFixture.detectChanges();
    }));

    it("should have as title \"[store] test title\"", () => {
        let titleDebugElement: DebugElement = testHostFixture.debugElement.query(By.css("h4"));
        expect(titleDebugElement.nativeElement.textContent).toEqual(expectedSubmission.title);
    });

    it("should have store as icon", () => {
        let iconDebugElement: DebugElement = testHostFixture.debugElement.query(By.css("md-icon"));
        expect(iconDebugElement.nativeElement.textContent).toEqual("store");
    });

    it("should have same submission as host element", () => {
        let listItemElement: DebugElement = testHostFixture.debugElement.query(By.css("feed-list-item"));
        expect(listItemElement.componentInstance.submission).toBe(expectedSubmission);
    });

    it("should trigger route by click", () => {
        const spy = spyOn(router, "navigate");
        let listItemElement: DebugElement = testHostFixture.debugElement.query(By.css("md-list-item"));
        click(listItemElement);
        expect(spy.calls.count()).toEqual(1);
        //console.log(navArgs);
        //expect(navArgs.args[0].join()).toEqual("store");
    });
});
