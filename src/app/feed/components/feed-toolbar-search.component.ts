import {
    Component,
    OnDestroy
} from '@angular/core';
import {
    FormControl
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    SearchUtil
} from './../../util/';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-feed-toolbar-search',
    templateUrl: './feed-toolbar-search.component.html',
    styleUrls: ['./feed-toolbar-search.component.scss']
})
export class FeedToolbarSearchComponent implements OnDestroy {
    public stateCtrl: FormControl;
    filteredStates: any;

    states = [
        'Alabama',
        'Alaska',
    ];
    private inputSubscription: Subscription;
    constructor(private router: Router) {
        this.stateCtrl = new FormControl();
        this.inputSubscription = this.stateCtrl.valueChanges
            .pipe(debounceTime(500))
            .subscribe(value => {
                console.log(value);
                this.router.navigate(['feed', 'search'], {
                    queryParams: {
                        q: SearchUtil.sanitize(this.stateCtrl.value)
                    }
                });
            });
    }

    public ngOnDestroy() {
        this.inputSubscription.unsubscribe();
    }

    public filterStates(val: string) {
        return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
            : this.states;
    }

    public search(): void {
        if (this.stateCtrl.value !== '' && this.stateCtrl.value) {
            this.router.navigate(['feed', 'search'], {
                queryParams: {
                    q: SearchUtil.sanitize(this.stateCtrl.value)
                }
            });
        }
    }

}
