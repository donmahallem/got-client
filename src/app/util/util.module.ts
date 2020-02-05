import {
    NgModule
} from '@angular/core';
import {
    MomentFromNowPipe
} from './moment-from-now.pipe';
@NgModule({
    declarations: [
        MomentFromNowPipe
    ],
    imports: [
    ],
    entryComponents: [
    ], exports: [
        MomentFromNowPipe
    ]
})
export class UtilModule { }
