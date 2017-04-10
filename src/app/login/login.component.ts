import { Component } from '@angular/core';
import {
    Router
} from "@angular/router";
import {
    AppConfigService
} from "./../services/"

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private router: Router,
        private appConfig: AppConfigService) {
    }

    public signin() {
        window.location.href = this.appConfig.getConfig("redirect_uri");
    }

}
