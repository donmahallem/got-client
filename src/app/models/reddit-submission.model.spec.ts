import {
    RedditSubmission,
    RedditSubmissionType
} from "./reddit-submission.model";


describe("RedditSubmission", () => {
    describe("parseType()", () => {
        it("should detect a trade submission from the flair", () => {
            let submission: RedditSubmission = new RedditSubmission();
            submission.link_flair_text = "Trade";
            expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.TRADE);
        });
        it("should detect a trade submission from the title", () => {
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
                let submission: RedditSubmission = new RedditSubmission();
                submission.title = title;
                expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.TRADE);
            }
        });
    });
});