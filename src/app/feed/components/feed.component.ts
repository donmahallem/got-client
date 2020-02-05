import { Component } from '@angular/core';
import { FeedService } from './../feed.service';

@Component({
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
    providers: [FeedService]
})
export class FeedComponent {
}
