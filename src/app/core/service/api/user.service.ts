import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "user/"


    constructor(
        private apiService: ApiService
    ) {
        super("UserService")
    }

    getUsers(): Observable<UserModel[]> {
        return this.apiService.get(this.API_URL, "");
    }

    login(username: string, password: string): Observable<string> {
        return this.apiService.post(this.API_URL, "login", {username: username, password: password});
    }
}
