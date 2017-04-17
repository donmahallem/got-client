import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {
    RedditSubmission,
    VoteState
} from "./../../models/"
import {
    GotLiveService
} from './../../services/';

@Injectable()
export class SubmissionResolver implements Resolve<RedditSubmission> {
    constructor(private got: GotLiveService) {

    }
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<RedditSubmission> {
        let id = route.params['id'];
        return new Promise((resolve, reject) => {
            this.got.getSubmission(id)
                .then(value => {
                    resolve(value);
                })
                .catch(err => {
                    resolve(null);
                });
        });
    }
}