import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {MemberModel} from '../../model/member.model';
import {QueryModel} from '../../model/query.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "member/"


    constructor(
        private apiService: ApiService
    ) {
        super("MemberService")
    }

    getMembers(): Observable<MemberModel[]> {
        return this.apiService.get(this.API_URL, "");
    }

    getMembersUsingQuery(query: QueryModel): Observable<MemberModel[]> {
        return this.apiService.get(this.API_URL, "query/" + query.id);
    }
}
