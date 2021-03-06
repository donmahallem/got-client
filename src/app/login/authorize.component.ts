import { Component } from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    GotAuthService
} from './../services';

@Component({
    templateUrl: './authorize.component.html',
    styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent {
    constructor(route: ActivatedRoute,
                gotAuth: GotAuthService,
                router: Router) {
        if (route.snapshot.queryParams.hasOwnProperty('code')) {
            console.log(route.snapshot.queryParams.code);
            gotAuth.exchangeCode(route.snapshot.queryParams.code)
                .subscribe(data => {
                    router.navigate(['feed']);
                },
                    error => {
                        router.navigate(['login']);
                    },
                    () => {

                    });
        }
    }

    public signin() {
        console.log('yes');
        sessionStorage.setItem('yes', 'no');
        localStorage.setItem('yes', 'no');
        console.log(localStorage.getItem('yes'));
    }

}
