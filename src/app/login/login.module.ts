import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from "./login-routing.module";
import {
    MaterialModule
} from '@angular/material';
import { LoginComponent } from "./login.component";
import { AuthorizeComponent } from "./authorize.component";
import {
    MdInputContainer,
    MdHint,
    MdButton
} from '@angular/material';

@NgModule({
    declarations: [
        LoginComponent,
        AuthorizeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        MaterialModule,
        LoginRoutingModule
    ],
    providers: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }
