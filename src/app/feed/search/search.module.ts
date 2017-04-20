import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { SearchRoutingModule } from "./search-routing.module";
import {
    MaterialModule
} from "@angular/material";
import {
    UtilModule
} from "./../../util/";
import {
    SearchComponent
} from "./components";

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        SearchRoutingModule,
        UtilModule
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SearchModule { }
