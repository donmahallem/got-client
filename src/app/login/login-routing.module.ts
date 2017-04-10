import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
    Data
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from "./login.component";
import { AuthorizeComponent } from "./authorize.component";
import {
    MaterialModule,
    MdIcon,
    MdIconModule,
    MdListModule
} from '@angular/material';

const rootRoutes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "reddit/authorize",
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