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
    SubmissionComponent
} from "./submission.component";
import {
    MomentFromNowPipe
} from "./../../../util/moment-from-now.pipe"
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
} from "./../../../models/reddit-submission.model";
import {
    click
} from "./../../../../testing/";
import {
    Router,
    ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import {
    RedditApiService
} from "./../../../services/";
import {
    SnudownPipe
} from "./../../../util/";

const expectedSubmission: RedditSubmission = {
    title: "[store] test title",
    created_utc: 2999,
    name: "t3_abcde",
    id: "abcde"
}
class RedditApiServiceStub {
    getSubmissionById(ids: string[] | string): any {
        return Observable.throw(null);
    }
}
class RouterStub {

}
class ActivatedRouteStub {
    snapshot = {
        data: {},
        params: {
            id: "abcde"
        }
    };
    data = Observable.of({ id: "abcde" });
    params = Observable.of({ id: "abcde" });
}
describe("SubmissionComponent", () => {
    let testHost: SubmissionComponent;
    let testHostFixture: ComponentFixture<SubmissionComponent>;
    let router: Router;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SubmissionComponent,
                MomentFromNowPipe,
                SnudownPipe
            ], imports: [
                MaterialModule
            ],
            providers: [
                {
                    provide: RedditApiService,
                    useClass: RedditApiServiceStub
                },
                {
                    provide: Router,
                    useClass: RouterStub
                },
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
                }]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(SubmissionComponent);
        router = TestBed.get(Router);
        // query for the title <h1> by CSS element selector
        testHostFixture.detectChanges();
    }));
});
