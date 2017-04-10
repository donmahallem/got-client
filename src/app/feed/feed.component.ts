import { Component } from '@angular/core';
import { FeedService } from "./feed.service";

@Component({
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
    providers: [FeedService]
})
export class FeedComponent {
    title = 'feed works!';
    folders = [
        {
            name: 'Photos',
            updated: new Date('1/1/16'),
        },
        {
            name: 'Recipes',
            updated: new Date('1/17/16'),
        },
        {
            name: 'Work',
            updated: new Date('1/28/16'),
        }
    ];
    notes = [
        {
            name: 'Vacation Itinerary',
            updated: new Date('2/20/16'),
        },
        {
            name: 'Kitchen Remodel',
            updated: new Date('1/18/16'),
        }
    ];
}
