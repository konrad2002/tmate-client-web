import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {QueryModel} from '../../model/query.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "export/"

    constructor(
        private apiService: ApiService
    ) {
        super("ExportService")
    }

    downloadQueryAsExcel(query: QueryModel) {
        return this.apiService.getDownload(this.API_URL, "excel/" + query.id);
    }
}
