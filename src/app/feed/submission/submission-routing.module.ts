import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes,
    Data
} from "@angular/router";
import {
    SubmissionComponent, SubmissionBodyComponent
} from "./components";

const rootRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: ":id",
                component: SubmissionComponent,
            },
            {
                path: "**",
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
    ]
})
export class SubmissionRoutingModule { }