import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthorizeComponent } from './authorize.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        LoginComponent,
        AuthorizeComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        LoginRoutingModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
