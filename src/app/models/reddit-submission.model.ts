export interface RedditSubmission {
    id?: string;
    name: string;
    title?: string;
    created_utc?: number;
    author?: string;
    link_flair_text?: string;
    selftext?: string;
    url?: string;
}
export type RedditSubmissions = RedditSubmission[]; 