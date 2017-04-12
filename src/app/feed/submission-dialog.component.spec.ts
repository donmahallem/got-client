import {
    TestBed,
    async,
    ComponentFixture,
    inject,
    tick
} from '@angular/core/testing';
import {
    DebugElement,
    Component,
    NgModule,
    Directive,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    MdIcon,
    MdListItem
} from '@angular/material';
import {
    By
} from '@angular/platform-browser';
import {
    SubmissionDialogComponent,
    SnuDownPipe
} from './submission-dialog.component';
import {
    GotAuthService
} from "./../services";
import {
    MaterialModule,
    MdDialog,
    MdDialogRef
} from '@angular/material';
import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    GotApiService
} from "./../services/"
import {
    RedditSubmission
} from "./../models/reddit-submission.model";
import {
    click
} from "./../../testing/";
import {
    Router
} from "@angular/router";
import {
    BrowserAnimationsModule
} from "@angular/platform-browser/animations";

class GotApiServiceStub {

}

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
    selector: "arbitrary-component",
    template: "<dir-with-view-container></dir-with-view-container>",
})
class ComponentWithChildViewContainer {
    @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

    get childViewContainer() {
        return this.childWithViewContainer.viewContainerRef;
    }
}
// Taken from: http://stackoverflow.com/questions/41273391/cant-resolve-all-parameters-for-mddialogref-error-when-testing-ng2-mater
// and https://github.com/angular/material2/blob/3796f69f9d474e502e1a669747ca6c8e89e818d3/src/lib/dialog/dialog.spec.ts
@NgModule({
    declarations: [
        SnuDownPipe,
        SubmissionDialogComponent,
        ComponentWithChildViewContainer,
        DirectiveWithViewContainer
    ],
    entryComponents: [
        SubmissionDialogComponent,
        ComponentWithChildViewContainer
    ],
    exports: [
        SubmissionDialogComponent,
        ComponentWithChildViewContainer,
        DirectiveWithViewContainer
    ],
    imports: [
        MaterialModule,
        BrowserAnimationsModule,
        CommonModule
    ]
})
class SubmissionDialogTestModule { }

const expectedSubmission: RedditSubmission = {
    title: "[store] test title",
    created_utc: 2999,
    name: "t3_abcde",
    id: "abcde",
    author: "redditUser"
}
describe('SubmissionDialogComponent', () => {
    let componentFixture: ComponentFixture<SubmissionDialogComponent>;
    let router: Router;
    let dialog: MdDialog;
    let testViewContainerRef: ViewContainerRef;
    let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;
    let dialogRef: MdDialogRef<SubmissionDialogComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SubmissionDialogTestModule
            ],
            providers: [
                {
                    useClass: GotApiServiceStub,
                    provide: GotApiService
                }]
        }).compileComponents();
        dialog = TestBed.get(MdDialog);
        viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
        dialogRef = dialog.open(SubmissionDialogComponent, {
            viewContainerRef: testViewContainerRef,
            data: expectedSubmission
        });
        viewContainerFixture.detectChanges();
    }));

    afterEach(() => {
        dialogRef.close();
    });


    it('should open a dialog with SubmissionDialogComponent as component', () => {
        expect(dialogRef.componentInstance).toEqual(jasmine.any(SubmissionDialogComponent));
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
    });

    it("should set submission with dialog meta data", () => {
        expect(dialogRef.componentInstance.submission).toBe(expectedSubmission);
    });

    it("should set dialog title", () => {
        let titleDebugElement: DebugElement = viewContainerFixture.debugElement.query(By.css("h2[md-dialog-title]"));
        expect(titleDebugElement.nativeElement.textContent).toEqual(expectedSubmission.title);
    });

    it("should click author external anchor", () => {
        let btnDebugElement: DebugElement = viewContainerFixture.debugElement.query(By.css("button[md-icon-button].btnRedditUser"));
        let spy = spyOn(dialogRef.componentInstance, "openInNewTab");
        click(btnDebugElement);
        expect(spy.calls.count()).toEqual(1);
        expect(spy.calls.argsFor(0)).toEqual(["https://www.reddit.com/u/redditUser"]);
    });
});