export class SearchUtil {

    /**
     * Sanitizes the search value like removing double whitespace characters
     * @param search the search term
     */
    public static sanitize(search: string): string {
        //remove double whitespace characters of any kind
        let san: string = search.replace(/\s+/, " ");
        return san;
    }
}