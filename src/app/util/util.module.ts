import {
    NgModule
} from "@angular/core";
import {
    SnudownPipe,
    MomentFromNowPipe
} from "./"
@NgModule({
    declarations: [
        MomentFromNowPipe,
        SnudownPipe
    ],
    imports: [
    ],
    entryComponents: [
    ], exports: [
        MomentFromNowPipe, SnudownPipe
    ]
})
export class UtilModule { }
