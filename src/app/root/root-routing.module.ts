import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
    Data
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


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
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(rootRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RootRoutingModule { }