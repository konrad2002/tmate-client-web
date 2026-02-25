import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BaseService} from './base.service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {
    MemberModel,
    transformMemberObservable,
    transformMembersObservable,
    transformQueryResultObservable
} from '../../model/member.model';
import {QueryResultDto} from '../../model/query-result-dto.model';
import {Families} from '../../model/family.model';
import {QuerySortingModel} from '../../model/query.model';

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
        return transformMembersObservable(this.apiService.get(this.API_URL, ""));
    }

    getMembersUsingQuery(queryId: string, sorting?: QuerySortingModel): Observable<QueryResultDto> {
        let queryString = "";
        if (sorting)
            queryString = "?sort_field=" + sorting.field.name + "&sort_direction=" + sorting.direction;
        return transformQueryResultObservable(this.apiService.get(this.API_URL, "query/" + queryId + queryString));
    }

    getMemberById(id: string): Observable<MemberModel> {
        return transformMemberObservable(this.apiService.get(this.API_URL, "id/" + id));
    }

    getFamilies(): Observable<Families> {
        return this.apiService.get(this.API_URL, "families");
    }

    getMembersByCourse(courseId: string): Observable<MemberModel[]> {
        return this.apiService.get(this.API_URL, "course/" + courseId);
    }

    addMember(member: MemberModel, familyMemberId?: string): Observable<MemberModel> {
        let familyString = "";
        if (familyMemberId) familyString = "?family_member_id=" + familyMemberId
        return transformMemberObservable(this.apiService.post(this.API_URL, "" + familyString, member));
    }

    updateMember(member: MemberModel, familyMemberId?: string): Observable<MemberModel> {
        let familyString = "";
        if (familyMemberId) familyString = "?family_member_id=" + familyMemberId
        return transformMemberObservable(this.apiService.put(this.API_URL, "" + familyString, member));
    }


}
