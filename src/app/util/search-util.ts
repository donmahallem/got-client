export class SearchUtil {

    /**
     * Sanitizes the search value like removing double whitespace characters
     * @param search the search term
     */
    public static sanitize(search: string): string {
        //replace all line breaks
        let san: string = search.replace(/(\n|\r)+/g, "");
        //remove double whitespace characters of any kind
        san = san.replace(/\s+/g, " ");
        return san;
    }
}