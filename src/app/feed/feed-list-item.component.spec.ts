import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {
    DebugElement
} from '@angular/core';
import {
    MdIcon,
    MdListItem
} from '@angular/material';
import {
    By
} from '@angular/platform-browser';
import {
    FeedListItemComponent
} from './feed-list-item.component';
import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    GotAuthService
} from "./../services";
import {
    MomentFromNowPipe
} from "./../util/moment-from-now.pipe"
import {
    BrowserDynamicTestingModule
} from "@angular/platform-browser-dynamic/testing";

class GotAuthServiceStub {

}

describe('FeedListItemComponent', () => {
    let comp: FeedListItemComponent;
    let fixture: ComponentFixture<FeedListItemComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeedListItemComponent,
                MdIcon,
                MdListItem,
                MomentFromNowPipe
            ], imports: [
            ],
            providers: [{
                provide: GotAuthService,
                useValue: GotAuthServiceStub
            },
                BrowserDynamicTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(FeedListItemComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h4'));
        el = de.nativeElement;
    }));


    it(`should have as title 'app works!'`, async(() => {
        const fixture = TestBed.createComponent(FeedListItemComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app works!');
    }));

});
