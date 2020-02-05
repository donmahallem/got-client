import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthorizeComponent } from './authorize.component';

const rootRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'reddit/authorize',
        component: AuthorizeComponent
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

export class LoginRoutingModule { }
