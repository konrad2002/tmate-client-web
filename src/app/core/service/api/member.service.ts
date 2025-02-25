import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {MemberModel} from '../../model/member.model';
import {QueryResultDto} from '../../model/query-result-dto.model';
import {Families} from '../../model/family.model';

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

    getMembersUsingQuery(queryId: string): Observable<QueryResultDto> {
        return this.apiService.get(this.API_URL, "query/" + queryId);
    }

    getMemberById(id: string): Observable<MemberModel> {
        return this.apiService.get(this.API_URL, "id/" + id);
    }

    getFamilies(): Observable<Families> {
        return this.apiService.get(this.API_URL, "families");
    }

    addMember(member: MemberModel, familyMemberId?: string): Observable<MemberModel> {
        let familyString = "";
        if (familyMemberId) familyString = "?family_member_id=" + familyMemberId
        return this.apiService.post(this.API_URL, "" + familyString, member);
    }

    updateMember(member: MemberModel, familyMemberId?: string): Observable<MemberModel> {
        let familyString = "";
        if (familyMemberId) familyString = "?family_member_id=" + familyMemberId
        return this.apiService.put(this.API_URL, "" + familyString, member);
    }
}
