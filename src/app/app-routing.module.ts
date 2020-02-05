import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const rootRoutes: Routes = [
    {
        path: 'feed',
        loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: '**',
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
