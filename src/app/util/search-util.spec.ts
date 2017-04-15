
import {
    SearchUtil
} from "./search-util";

describe("SearchUtil", () => {
    describe("sanitzie()", () => {
        it("should remove doubled whitespace characters", () => {
            expect(SearchUtil.sanitize("test  footage  of    stuff")).toEqual("test footage of stuff");
        });
    });
});
