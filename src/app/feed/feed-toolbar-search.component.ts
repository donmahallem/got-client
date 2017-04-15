import {
    Component,
    OnDestroy
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import "rxjs/add/operator/startWith";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "feed-toolbar-search",
    templateUrl: "./feed-toolbar-search.component.html",
    styleUrls: ["./feed-toolbar-search.component.css"],
    animations: [
        trigger("openState", [
            state("open", style({ width: '*' })),
            transition("void => *", [
                style({ width: 0 }),
                animate(250, style({ width: "*" }))
            ]),
            transition("* => void", [
                style({ width: '*' }),
                animate(250, style({ width: 0 }))
            ])
        ])
    ]
})
export class FeedToolbarSearchComponent implements OnDestroy {
    stateCtrl: FormControl;

    states = [
        "Alabama",
        "Alaska",
    ];
    private inputSubscription: Subscription;
    private opened: boolean = false;
    constructor() {
        this.stateCtrl = new FormControl();
        this.inputSubscription = this.stateCtrl.valueChanges.skipUntil(Observable.timer(200)).subscribe(value => {
            console.log(value);
        });
    }

    public ngOnDestroy() {
        this.inputSubscription.unsubscribe();
    }

    filterStates(val: string) {
        return val ? this.states.filter(s => new RegExp(`^${val}`, "gi").test(s))
            : this.states;
    }

    public openSearch(): void {
        this.opened = true;
    }

}