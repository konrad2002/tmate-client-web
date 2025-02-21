import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {FieldModel} from '../../model/field.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "field/"

  constructor(
      private apiService: ApiService
  ) {
      super("FieldService")
  }

  getFields(): Observable<FieldModel[]> {
      return this.apiService.get(this.API_URL, "");
  }
}
