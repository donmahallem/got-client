import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { SubmissionRoutingModule } from "./submission-routing.module";
import {
    SubmissionComponent,
    SubmissionBodyComponent,
    SubmissionLoadingIndicatorComponent,
    SubmissionTitleComponent
} from "./components";
import {
    MaterialModule
} from "@angular/material";
import {
    UtilModule
} from "./../../util/";
@NgModule({
    declarations: [
        SubmissionComponent,
        SubmissionBodyComponent,
        SubmissionLoadingIndicatorComponent,
        SubmissionTitleComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        SubmissionRoutingModule,
        UtilModule
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SubmissionModule { }
