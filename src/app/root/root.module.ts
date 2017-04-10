import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RootComponent } from './root.component';
import { RootRoutingModule } from "./root-routing.module";

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        RootRoutingModule
    ],
    providers: [],
    bootstrap: [RootComponent]
})
export class RootModule { }
