import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {
    DebugElement,
    Component
} from '@angular/core';
import {
    MdIcon,
    MdListItem
} from '@angular/material';
import {
    By
} from '@angular/platform-browser';
import {
    FeedListItemComponent
} from './feed-list-item.component';
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
} from '@angular/material';
import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    RedditSubmission
} from "./../models/reddit-submission.model";

@Component({
    template: "<feed-list-item  [submission]=\"submission\"></feed-list-item>",
})
class TestHostComponent {
    submission: RedditSubmission = {
        title: "[store] test title",
        created_utc: 2999,
        name: "t3_abcde"
    }
}

describe('FeedListItemComponent', () => {
    let testHost: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestHostComponent,
                FeedListItemComponent,
                MomentFromNowPipe
            ], imports: [
                RouterTestingModule,
                MaterialModule
            ]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(TestHostComponent);

        // query for the title <h1> by CSS element selector
        testHostFixture.detectChanges();
    }));


    it("should have as title '[store] test title'", async(() => {
        let titleDebugElement: DebugElement = testHostFixture.debugElement.query(By.css('h4'));
        expect(titleDebugElement.nativeElement.textContent).toEqual("[store] test title");
    }));


    it("should have store as icon", async(() => {
        let iconDebugElement: DebugElement = testHostFixture.debugElement.query(By.css('md-icon'));
        expect(iconDebugElement.nativeElement.textContent).toEqual("store");
    }));
});
