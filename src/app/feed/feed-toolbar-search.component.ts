import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import "rxjs/add/operator/startWith";

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
export class FeedToolbarSearchComponent {
    stateCtrl: FormControl;
    filteredStates: any;

    states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];
    private opened: boolean = false;
    constructor() {
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
    }

    filterStates(val: string) {
        return val ? this.states.filter(s => new RegExp(`^${val}`, "gi").test(s))
            : this.states;
    }

    public openSearch(): void {
        this.opened = true;
    }

}