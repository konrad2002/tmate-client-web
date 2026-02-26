import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, distinctUntilChanged, Observable} from 'rxjs';
import {ApiService} from './api.service';
import { FormModel } from '../../model/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "form/"

    private formsSubject: BehaviorSubject<FormModel[]> = new BehaviorSubject<FormModel[]>([]);
    public forms = this.formsSubject.asObservable().pipe(distinctUntilChanged());

    constructor(
        private apiService: ApiService
    ) {
        super("FormService")
    }

    fetchForms() {
        this.getForms().subscribe(forms => {
            this.formsSubject.next(forms);
            console.log(forms);
        })
    }

    getDefaultForm() {
        return this.formsSubject.value.find(form => {
            return form.special_form === "default"
        })
    }

    getCourseForm() {
        return this.formsSubject.value.find(form => {
            return form.special_form === "course"
        })
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
