import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import { FormModel } from '../../model/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "form/"

    constructor(
        private apiService: ApiService
    ) {
        super("FormService")
    }

    getForms(): Observable<FormModel[]> {
        return this.apiService.get(this.API_URL, "");
    }

    addForm(Form: FormModel): Observable<FormModel> {
        return this.apiService.post(this.API_URL, "", Form);
    }

    updateForm(Form: FormModel): Observable<FormModel> {
        return this.apiService.put(this.API_URL, "", Form);
    }

    getFormById(id: string): Observable<FormModel> {
        return this.apiService.get(this.API_URL, "id/" + id);
    }

    removeFormById(id: string): Observable<FormModel> {
        return this.apiService.delete(this.API_URL, "" + id);
    }
}
