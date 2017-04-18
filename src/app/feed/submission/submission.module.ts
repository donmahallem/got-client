import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { SubmissionRoutingModule } from "./submission-routing.module";
import {
    SubmissionComponent,
    SubmissionBodyComponent,
    SubmissionLoadingIndicatorComponent
} from "./components";
import {
    MaterialModule
} from "@angular/material";
import {
    SnudownPipe
} from "./../../util/";
@NgModule({
    declarations: [
        SubmissionComponent,
        SubmissionBodyComponent,
        SnudownPipe,
        SubmissionLoadingIndicatorComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        SubmissionRoutingModule
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SubmissionModule { }
