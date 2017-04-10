export interface RedditListingResponse<T> {
    modhash?: string;
    children: {
        kind: string,
        data: T
    }[];
}