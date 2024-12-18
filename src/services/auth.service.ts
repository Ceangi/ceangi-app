import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';

const API_URL = environment.endpoint + 'api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: any;

    constructor(
        private http: HttpClient,
    ) {
    }
    login(user: User): Observable<any> {
        return this.http.post(
            API_URL + 'signin',
            {
                user
            },
            httpOptions,
        );
    }

    register(
        user: User
    ): Observable<any> {
        console.log(user)
        return this.http.post(
            API_URL + 'signup',
            {
                user
            },
            httpOptions,
        );
    }

    logout(): Observable<any> {
        return this.http.post(API_URL + 'signout', {}, httpOptions);
    }

}
