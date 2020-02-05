import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    SubmissionComponent, SubmissionBodyComponent
} from './components';
import {
    SubmissionResolver
} from './submission.resolver';

const rootRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: SubmissionComponent,
                resolve: {
                    submission: SubmissionResolver
                }
            },
            {
                path: '**',
                component: SubmissionBodyComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(rootRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SubmissionResolver
    ]
})
export class SubmissionRoutingModule { }
