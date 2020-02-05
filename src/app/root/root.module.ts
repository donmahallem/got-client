import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './root.component';
import { RootRoutingModule } from './root-routing.module';

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
