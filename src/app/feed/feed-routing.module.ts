import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes,
    Data
} from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FeedComponent } from "./feed.component";
import { SubmissionDialogComponent } from "./submission-dialog.component";

const rootRoutes: Routes = [
    {
        path: "**",
        component: FeedComponent
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

export class FeedRoutingModule { }