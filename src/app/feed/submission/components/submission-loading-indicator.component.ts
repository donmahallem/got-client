import {
    Component,
    OnInit,
    OnDestroy
} from "@angular/core";
import {
    ActivatedRoute
} from "@angular/router";
import {
    RedditSubmission
} from "./../../../models/"
import { Subscription } from "rxjs/Subscription";
import {
    RedditApiService
} from "./../../../services/";
import {
    Logger
} from "./../../../util/";
import { XmlEntities } from "html-entities";

@Component({
    selector: "submission-loading-indicator",
    templateUrl: "./submission-loading-indicator.component.html",
    styleUrls: ["./submission-loading-indicator.component.css"]
})
export class SubmissionLoadingIndicatorComponent {
}
