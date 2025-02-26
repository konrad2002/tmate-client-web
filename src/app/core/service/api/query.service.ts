import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {QueryModel} from '../../model/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "query/"


    constructor(
        private apiService: ApiService
    ) {
        super("QueryService")
    }

    getQueries(): Observable<QueryModel[]> {
        return this.apiService.get(this.API_URL, "");
    }

    addQuery(query: QueryModel): Observable<QueryModel> {
        return this.apiService.post(this.API_URL, "", query);
    }

    updateQuery(query: QueryModel): Observable<QueryModel> {
        return this.apiService.put(this.API_URL, "", query);
    }

    getQueryById(id: string): Observable<QueryModel> {
        return this.apiService.get(this.API_URL, "id/" + id);
    }

    removeQueryById(id: string): Observable<QueryModel> {
        return this.apiService.delete(this.API_URL, "" + id);
    }

}
