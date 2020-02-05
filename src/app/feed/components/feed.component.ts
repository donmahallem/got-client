import { Component } from '@angular/core';
import { FeedService } from './../feed.service';

@Component({
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    providers: [FeedService]
})
export class FeedComponent {
}
