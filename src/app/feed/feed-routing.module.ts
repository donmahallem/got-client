import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes,
    Data
} from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FeedComponent } from "./feed.component";
import { FeedListComponent } from "./feed-list.component";

const rootRoutes: Routes = [
    {
        path: "",
        component: FeedComponent,
        children: [
            {
                path: "submission",
                loadChildren: "app/feed/submission/submission.module#SubmissionModule"
            },
            {
                path: "",
                component: FeedListComponent
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

export class FeedRoutingModule { }