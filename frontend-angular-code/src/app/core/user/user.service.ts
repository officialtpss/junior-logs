import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import AppConstants from 'app/app.constants';
import { CryptoSecurityService } from 'app/services/crypto-security.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _crypto: CryptoSecurityService
    ) {
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get userProfile(): any {
        return localStorage.getItem('profile') ? JSON.parse(this._crypto.decrypt(localStorage.getItem('profile'))) : '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User | any>(`${AppConstants.USER}/${this.userProfile?._id}`).pipe(
            tap((user) => {
                this._user.next(user.data);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>(`${AppConstants.USER}/${this.userProfile?._id}`, { user });
    }

    /**
    * Update the user
    *
    * @param user
    */
    updateUser(user: User, userId: string): Observable<any> {
        return this._httpClient.patch<User>(`${AppConstants.USER}/${userId}`, user);
    }

    /**
     * create the user
     *
     * @param user
     */
    create(user: User): Observable<any> {
        return this._httpClient.post<User>(`${AppConstants.USER}`, user);
    }
}
