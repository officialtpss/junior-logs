// -----------------------------------------------------------------------------------------------------
// @ AUTH UTILITIES


export class AuthUtils {
    /**
     * Constructor
     */
    constructor() {
    }

    /**
     *
     * @param token
     */
    static isToken(token: string): boolean {
        return token?.length > 0;
    }

}
