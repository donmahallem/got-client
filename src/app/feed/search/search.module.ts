import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {
    UtilModule
} from './../../util/';
import {
    SearchComponent,
    SearchResultItemComponent
} from './components';
import {
    SearchHighlightPipe
} from './pipes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        SearchComponent,
        SearchResultItemComponent,
        SearchHighlightPipe
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        SearchRoutingModule,
        UtilModule
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SearchModule { }
