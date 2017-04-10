import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
    Data
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from "./not-found.component";

const rootRoutes: Routes = [
    {
        path: 'feed',
        loadChildren: "app/feed/feed.module#FeedModule"
    },
    {
        path: 'login',
        loadChildren: "app/login/login.module#LoginModule"
    },
    {
        path: '',
        redirectTo: "feed",
        pathMatch: "full"
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(rootRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        NotFoundComponent
    ]
})

export class AppRoutingModule { }