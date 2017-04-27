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
    SearchComponent,
    SearchResultItemComponent
} from "./components";
import {
    SearchHighlightPipe
} from "./pipes";

@NgModule({
    declarations: [
        SearchComponent,
        SearchResultItemComponent,
        SearchHighlightPipe
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
