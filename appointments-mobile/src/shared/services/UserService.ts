import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../utils/Api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RegisterModel } from "../models/RegisterModel";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { User } from "../models/User";

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserService {

    private userStorageKey: string = "user_key";
    private accessTokenKey: string = "access_token_key";
    public access_token: string;
    authChange: Subject<boolean>;
    userUpdated: Subject<User>;
    public _user: User;

    constructor(public api: Api, private storage: Storage) {
        this.authChange = new Subject<boolean>();
        this.userUpdated = new Subject<User>();
        this._user = new User();
        this.isAuthenticated().then(val => {
            if (val) {
                this.getUserInfo();
            }
        });

    }

    init() {
        this.storage.get(this.accessTokenKey).then(val => {
            this.access_token = val;
        });
    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: any) {
        let seq = this.api.post('api/account/authenticate', accountInfo).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                if (res.success) {
                    this._loggedIn(res.result);
                }

            }, err => {
                console.error('ERROR', err);
            });

        return seq;
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: RegisterModel) {
        let seq = this.api.post('api/register', accountInfo).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                console.log(res);
                // If the API returned a successful response, mark the user as logged in
                if (res.success) {
                    this._loggedIn(res.result);
                }
            }, err => {
                console.error('ERROR', err);
            });

        return seq;
    }

    isAuthenticated(): Promise<boolean> {

        return this.getAccessToken().then(val => {
            //console.log("isAuthenticated token: " + this.access_token);
            return Promise.resolve(this.access_token != null);
        }, err => {
            return Promise.resolve(false);
        });
    }

    updateUserInfo(userInfo: User) {
        var req = this.api.post("/api/services/app/user/update", userInfo).share();

        req.map(res => res.json())
            .subscribe(res => {
                console.log(res);
            });
        return req;
    }

    getUserInfo() {
        this.api.post("/api/services/app/session/getCurrentLoginInformations", null)
            .map(res => res.json())
            .subscribe(res => {
                if (res.success) {
                    this._user = res.result.user;
                    this.userUpdated.next(this._user);
                }
                console.log(this._user);
            });
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.access_token = null;
        this.storage.remove(this.accessTokenKey);
        this.authChange.next(false);
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(token) {
        this.storage.set(this.accessTokenKey, token).then(function () {
            console.log("Token successfully stored! Token: " + token);
        });

        this.access_token = token;
        this.getUserInfo();
        this.authChange.next(true);
    }

    getAccessToken(): Promise<string> {
        if (this.access_token == null) {
            return this.storage.get(this.accessTokenKey).then(val => {
                this.access_token = val;
            });
        }
        else {
            return Promise.resolve(this.access_token);
        }
    }
}
