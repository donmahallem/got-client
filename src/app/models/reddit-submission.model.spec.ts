import {
    RedditSubmission,
    RedditSubmissionType
} from "./reddit-submission.model";


describe("RedditSubmission", () => {
    describe("parseType()", () => {
        it("should detect a store submission from the flair", () => {
            let submission: RedditSubmission = new RedditSubmission();
            submission.link_flair_text = "Store";
            expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.STORE);
        });
        it("should detect a store submission from the title", () => {
            let submission: RedditSubmission = new RedditSubmission();
            let titles: string[] = [
                "[H] a [W] b",
                "[H] a [w] b",
                "[h] a [W] b",
                "[h] a [w] b",
                "[W] a [H] b",
                "[W] a [h] b",
                "[w] a [h] b",
                "[w] a [H] b"
            ];
            for (let title of titles) {
                submission.title = title;
                expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.STORE);
            }
        });
    });
});