
export enum RedditSubmissionType {
    OTHER = 0,
    STORE = 1,
    TRADE = 2,
    PSA = 3,
    QUESTION = 4,
    PRICECHECK = 5,
    DISCUSSION = 6,
    FREE = 7
}

export class RedditSubmission {
    id?: string;
    name: string;
    title?: string;
    created_utc?: number;
    author?: string;
    link_flair_text?: string;
    selftext?: string;
    selftext_html?: string;
    url?: string;
    over_18: boolean;

    public static parseType(submission: RedditSubmission): RedditSubmissionType {
        if (typeof submission.link_flair_text === 'string'
            && submission.link_flair_text !== '') {
            const txt = submission.link_flair_text.toLowerCase();
            if (txt === 'discuss') {
                return RedditSubmissionType.DISCUSSION;
            } else if (txt === 'psa') {
                return RedditSubmissionType.PSA;
            } else if (txt === 'trade') {
                return RedditSubmissionType.TRADE;
            } else if (txt === 'store') {
                return RedditSubmissionType.STORE;
            } else if (txt === 'free') {
                return RedditSubmissionType.FREE;
            } else if (txt === 'pricecheck') {
                return RedditSubmissionType.PRICECHECK;
            } else if (txt === 'question') {
                return RedditSubmissionType.QUESTION;
            }
        }
        if (typeof submission.title === 'string'
            && submission.title !== '') {
            if (submission.title.match(/\[(W|H)\].*\[(W|H)\]/i)) {
                return RedditSubmissionType.TRADE;
            } else if (submission.title.match(/\[store\].*/i)) {
                return RedditSubmissionType.STORE;
            } else if (submission.title.match(/\[q\].*/i)) {
                return RedditSubmissionType.QUESTION;
            } else if (submission.title.match(/^\[pc\].*/i)) {
                return RedditSubmissionType.PRICECHECK;
            }
        }
        return RedditSubmissionType.OTHER;
    }
}
export type RedditSubmissions = RedditSubmission[];
