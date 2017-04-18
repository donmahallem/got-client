import {
    TestBed,
    async,
    fakeAsync,
    ComponentFixture,
    inject,
    tick
} from "@angular/core/testing";
import {
    DebugElement,
    Component,
    Input
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
    public getSubmissionById(ids: string[] | string): any {
        return Observable.throw(null);
    }
}
@Component({
    selector: "submission-loading-indicator",
    template: "<h1></h1>",
})
export class SubmissionLoadingIndicatorComponentStub {
}
@Component({
    selector: "submission-title",
    template: "<h1>title</h1>",
})
export class SubmissionTitleComponentStub {
    @Input("title")
    public title: string;
    @Input("createdUtc")
    public createdUtc: number;
    @Input("author")
    public author: string;
}

@Component({
    selector: "submission-body",
    template: "<h1>content</h1>",
})
export class SubmissionBodyComponentStub {
    @Input("content")
    public content: string;
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

let activatedRouteStub: ActivatedRouteStub;
describe("SubmissionComponent", () => {
    let testHost: SubmissionComponent;
    let testHostFixture: ComponentFixture<SubmissionComponent>;
    let redditApiService: RedditApiService;
    beforeEach(async(() => {
        activatedRouteStub = new ActivatedRouteStub();
        TestBed.configureTestingModule({
            declarations: [
                SubmissionComponent,
                SnudownPipe,
                SubmissionLoadingIndicatorComponentStub,
                SubmissionTitleComponentStub,
                SubmissionBodyComponentStub
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
                    provide: ActivatedRoute,
                    useValue: activatedRouteStub
                }
            ]
        }).compileComponents()
            .then(() => {
                testHostFixture = TestBed.createComponent(SubmissionComponent);
                redditApiService = TestBed.get(RedditApiService);
                // query for the title <h1> by CSS element selector
                testHostFixture.detectChanges();
            })
    }));

    describe("refreshSubmission()", () => {
        let refreshSpy: jasmine.Spy
        beforeEach(() => {
            activatedRouteStub.snapshot.params.id = "testId123";
            refreshSpy = spyOn(testHostFixture.componentInstance, "refreshSubmission").and.callThrough();
        })
        it("should call refresh twice", () => {
            testHostFixture.componentInstance.refreshSubmission();
            expect(refreshSpy.calls.count()).toEqual(2);
            expect(refreshSpy.calls.argsFor(0)).toEqual(jasmine.arrayContaining([]));
            expect(refreshSpy.calls.argsFor(1)).toEqual(jasmine.arrayContaining(["testId123"]));
        });
        it("should call refresh twice", () => {
            spyOn(testHostFixture.componentInstance, "submissionId").and.returnValue(null);
            activatedRouteStub.snapshot.params.id = null;
            expect(() => {
                testHostFixture.componentInstance.refreshSubmission()
            }).toThrowError("No Submission id specified");
            expect(refreshSpy.calls.count()).toEqual(1);
        });
        it("should call redditapi.getSubmissionById with correct argument", () => {
            let apiSpy: jasmine.Spy = spyOn(redditApiService, "getSubmissionById").and.returnValue(Observable.of());
            testHostFixture.componentInstance.refreshSubmission("test123");
            expect(apiSpy.calls.count()).toEqual(1);
            expect(apiSpy.calls.argsFor(0)).toEqual(jasmine.arrayContaining(["t3_test123"]));
        });
        it("should retrieve a submission by id successfully", fakeAsync(() => {
            let testSub: any = {
                id: "test123"
            };
            let resp: any = {
                children: [
                    {
                        kind: "t3",
                        data: testSub
                    }
                ]
            }
            activatedRouteStub.snapshot.params.id = "test123";
            testHostFixture.componentInstance.submission = null;
            let apiSpy: jasmine.Spy = spyOn(redditApiService, "getSubmissionById").and.returnValue(Observable.of(resp));
            testHostFixture.componentInstance.refreshSubmission("test123");
            tick();
            expect(testHostFixture.componentInstance.submission).toEqual(jasmine.objectContaining(testSub));
        }));
        it("should retrieve a submission by id successfully but dont update as the displayed id changed", fakeAsync(() => {
            let testSub: any = {
                id: "test123"
            };
            let resp: any = {
                children: [
                    {
                        kind: "t3",
                        data: testSub
                    }
                ]
            }
            activatedRouteStub.snapshot.params.id = "test124";
            testHostFixture.componentInstance.submission = null;
            let apiSpy: jasmine.Spy = spyOn(redditApiService, "getSubmissionById").and.returnValue(Observable.of(resp));
            testHostFixture.componentInstance.refreshSubmission("test123");
            tick();
            expect(testHostFixture.componentInstance.submission).toEqual(null);
        }));
    });

    describe("submissionId", () => {
        it("should set the correct id", () => {
            activatedRouteStub.snapshot.params.id = "testId";
            expect(testHostFixture.componentInstance.submissionId).toEqual("testId");
        });
    });
});
