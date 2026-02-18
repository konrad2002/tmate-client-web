import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ConfigModel, SpecialFieldsConfig} from '../../model/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "config/"

    constructor(
        private apiService: ApiService
    ) {
        super("ConfigService")
    }

    getSpecialFields(): Observable<SpecialFieldsConfig> {
        return this.apiService.get(this.API_URL, "special_fields");
    }

    getConfig(): Observable<ConfigModel> {
        return this.apiService.get(this.API_URL, "");
    }

    initConfig(): Observable<void> {
        return this.apiService.post(this.API_URL, "init", null);
    }
}
