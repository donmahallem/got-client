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
import { HttpModule } from "@angular/http";
import {
    click
} from "./../../../../testing/";
import {
    Router,
    ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {
    RedditApiService
} from "./../../../services/";
import {
    SnudownPipe
} from "./../../../util/";
import { CommonModule } from "@angular/common";

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

    dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
    paramsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

    snapshot = {
        data: {},
        params: {
            id: "abcde"
        }
    };
    data = this.dataSubject.asObservable();
    params = this.paramsSubject.asObservable();
}

const activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
describe("SubmissionComponent", () => {
    let testHost: SubmissionComponent;
    let testHostFixture: ComponentFixture<SubmissionComponent>;
    let router: Router;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SubmissionComponent,
                SnudownPipe
            ], imports: [
                HttpModule,
                MaterialModule,
                CommonModule,
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
                    useValue: activatedRouteStub
                }]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(SubmissionComponent);
        // query for the title <h1> by CSS element selector
        testHostFixture.detectChanges();
    });

    describe("onInit()", () => {
        it("should succeed", () => {

        });
    });
});
