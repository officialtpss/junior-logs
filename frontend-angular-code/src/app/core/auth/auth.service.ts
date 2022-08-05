import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import AppConstants from 'app/app.constants';
import { User } from '../user/user.types';
import { CryptoSecurityService } from 'app/services/crypto-security.service';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _crypto: CryptoSecurityService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', this._crypto.encrypt(token));
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    get accessTokenDecode(): User | any {
        return this._crypto.decrypt(localStorage.getItem('accessToken'));
    }

    set userProfile(profile: string) {
        localStorage.setItem('profile', this._crypto.encrypt(JSON.stringify(profile)));
    }

    get userProfile(): string {
        return localStorage.getItem('profile') ? JSON.parse(this._crypto.decrypt(localStorage.getItem('profile'))) : '';
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.put(AppConstants.USER, credentials).pipe(
            map((res: {
                success: boolean, message: string, data: {
                    token: string;
                    profile: any
                }
            }) => {
                if (res?.success) {
                    // Store the access token in the local storage
                    this.accessToken = res?.data.token;
                    this.userProfile = res?.data.profile;
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = res?.data.profile;
                }
                return res;
            }))
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('profile');
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post(AppConstants.USER, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated || AuthUtils.isToken(this.accessToken)) {
            return of(true);
        }
        return of(false);
    }

    /**
     * post
     *
     * @param url
     */
    post(url: string, data: any): Observable<any> {
        return this._httpClient.post(url, data);
    }
    /**
     * get
     *
     * @param url
     */
    get(url: string): Observable<any> {
        return this._httpClient.get(url);
    }
}
