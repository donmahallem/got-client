import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes,
    Data
} from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import {
    FeedListComponent,
    FeedComponent
} from "./components/";

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
                path: "search",
                loadChildren: "app/feed/search/search.module#SearchModule"
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