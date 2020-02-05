import {
    RedditSubmission,
    RedditSubmissionType
} from './reddit-submission.model';


describe('RedditSubmission', () => {
    describe('parseType()', () => {
        it('should detect a trade submission from the flair', () => {
            const submission: RedditSubmission = new RedditSubmission();
            submission.link_flair_text = 'Trade';
            expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.TRADE);
        });
        it('should detect a trade submission from the title', () => {
            const titles: string[] = [
                '[H] a [W] b',
                '[H] aasdf [w] b',
                '[h] aas sadffasdfasd [W] b af asdf as',
                '[h] asdaf asf  [w] b asdf asd ',
                '[W] asdaf a sdaf sad [H] bas saf',
                '[W] aas assd  [h] b asd sda ',
                '[w] a asdAasdf asd [h] bs adsd fsda asd ',
                '[w] a sdafas [H] bsad asdf asdf '
            ];
            for (const title of titles) {
                const submission: RedditSubmission = new RedditSubmission();
                submission.title = title;
                expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.TRADE);
            }
        });
        it('should detect a store submission from the flair', () => {
            const submission: RedditSubmission = new RedditSubmission();
            submission.link_flair_text = 'Store';
            expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.STORE);
        });
        it('should detect a store submission from the title', () => {
            const titles: string[] = [
                '[store] dasi as dfm asdoif asd',
                '[STORE] dasi as dfm asdoif asd',
                '[StOrE] dasi as dfm asdoif asd'
            ];
            for (const title of titles) {
                const submission: RedditSubmission = new RedditSubmission();
                submission.title = title;
                expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.STORE);
            }
        });
        it('should detect a question submission from the flair', () => {
            const submission: RedditSubmission = new RedditSubmission();
            submission.link_flair_text = 'Question';
            expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.QUESTION);
        });
        it('should detect a question submission from the title', () => {
            const titles: string[] = [
                '[q] dasi as dfm asdoif asd',
                '[q] dasi as dfm asdoif asd',
                '[q] dasi as dfm asdoif asd'
            ];
            for (const title of titles) {
                const submission: RedditSubmission = new RedditSubmission();
                submission.title = title;
                expect(RedditSubmission.parseType(submission)).toEqual(RedditSubmissionType.QUESTION);
            }
        });
    });
});
