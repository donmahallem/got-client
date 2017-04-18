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
    Input,
    Pipe,
    PipeTransform
} from "@angular/core";
import {
    By
} from "@angular/platform-browser";
import {
    SubmissionTitleComponent
} from "./submission-title.component";
import {
    MomentFromNowPipe
} from "./../../../util/"
import {
    MaterialModule
} from "@angular/material";
import { CommonModule } from "@angular/common";

@Component({
    template: "<submission-title [author]=\"author\" [createdUtc]=\"createdUtc\" [title]=\"title\"></submission-title>",
})
export class HostStub {
    public title: string;
    public author: string;
    public createdUtc: number;
}

const pipeTransformSpy: jasmine.Spy = jasmine.createSpy("transform", (value) => {
    return "x mintutes ago";
});

@Pipe({ name: "momentFromNow" })
export class MomentFromNowPipeStub implements PipeTransform {
    transform = pipeTransformSpy;
}


describe("SubmissionTitleComponent", () => {
    let testHost: HostStub;
    let testHostFixture: ComponentFixture<HostStub>;
    let titleDebugElement: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostStub,
                SubmissionTitleComponent,
                MomentFromNowPipeStub
            ], imports: [
                MaterialModule,
                CommonModule
            ],
            providers: []
        }).compileComponents()
            .then(() => {
                testHostFixture = TestBed.createComponent(HostStub);
                testHost = testHostFixture.componentInstance;
                titleDebugElement = testHostFixture.debugElement.query(By.css("submission-title"));
                testHostFixture.detectChanges();
                pipeTransformSpy.calls.reset();
            })
    }));

    it("should set the title correctly", () => {
        testHost.title = "test title";
        testHostFixture.detectChanges();
        let mainTitle: DebugElement = titleDebugElement.query(By.css("h1"));
        expect(mainTitle.nativeElement.textContent).toEqual("test title");
    });

    it("should set the author correctly", () => {
        const authorName = "testAuthor";
        testHost.author = authorName;
        testHostFixture.detectChanges();
        let authorLink: DebugElement = titleDebugElement.query(By.css("a"));
        expect(authorLink.nativeElement.textContent).toEqual(authorName);
        expect(authorLink.nativeElement.href).toEqual("https://www.reddit.com/u/" + authorName);
    });
    it("should set the timespan correctly", () => {
        const timestamp: number = 125325;
        testHost.createdUtc = timestamp;
        testHostFixture.detectChanges();
        expect(pipeTransformSpy.calls.mostRecent().args).toEqual(jasmine.arrayContaining([timestamp * 1000]));
    });
});
