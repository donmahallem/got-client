import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    SearchComponent
} from './components';

const rootRoutes: Routes = [
    {
        path: '',
        component: SearchComponent
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
export class SearchRoutingModule { }
