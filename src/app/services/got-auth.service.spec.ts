import {
    TestBed,
    async,
    inject
} from "@angular/core/testing";
import {
    Http,
    Headers,
    RequestOptions,
    Response,
    BaseRequestOptions,
    XHRBackend,
    ResponseOptions,
    RequestMethod
} from "@angular/http";
import {
    MockBackend,
    MockConnection
} from "@angular/http/testing";
import {
    GotAuthService
} from "./got-auth.service";

describe("GotLiveService", () => {
    let gotAuthService: GotAuthService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ], imports: [
            ],
            providers: [
                GotAuthService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        }).compileComponents();
        gotAuthService = TestBed.get(GotAuthService);
    }));
    describe("exchangeRefreshToken()", () => {
        beforeEach(async(() => {

        }));
        it("should exchange successfully", async(inject([MockBackend], (mockBackend: MockBackend) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    expect(connection.request.method).toEqual(RequestMethod.Post);
                    expect(JSON.parse(connection.request.getBody())).toEqual(jasmine.objectContaining({
                        "type": "refresh_token",
                        "refresh_token": "test_token"
                    }));
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            body: { data: { success: true } }
                        }
                        )));
                });
            gotAuthService.exchangeRefreshToken("test_token")
                .subscribe(resp => {
                    expect(resp).toBeTruthy();
                });
        })));
    });
});
