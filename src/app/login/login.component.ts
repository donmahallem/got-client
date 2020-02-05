import { Component } from '@angular/core';
import {
    AppConfigService
} from './../services/';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private appConfig: AppConfigService) {
    }

    public signin() {
        window.location.href = this.appConfig.getConfig('redirect_uri');
    }

}
