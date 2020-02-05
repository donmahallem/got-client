import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SubmissionRoutingModule } from './submission-routing.module';
import {
    SubmissionComponent,
    SubmissionBodyComponent,
    SubmissionLoadingIndicatorComponent,
    SubmissionTitleComponent
} from './components';
import {
    UtilModule
} from './../../util/';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        SubmissionComponent,
        SubmissionBodyComponent,
        SubmissionLoadingIndicatorComponent,
        SubmissionTitleComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        SubmissionRoutingModule,
        UtilModule
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SubmissionModule { }
