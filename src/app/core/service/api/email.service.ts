import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {SpecialFieldsConfig} from '../../model/config.model';
import {EmailSenderModel, SendMailDto} from '../../model/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends BaseService {
    private API_URL: string = environment.api_urls.tmate_server + "email/"

    constructor(
        private apiService: ApiService
    ) {
        super("EmailService")
    }

    getEmailSenders(): Observable<EmailSenderModel[]> {
        return this.apiService.get(this.API_URL, "senders");
    }

    sendEmail(sender: string, receivers: string[], subject: string, body: string): Observable<any> {
        return this.apiService.post(this.API_URL, "send", {sender: sender, receivers: receivers, subject: subject, body_template: body} as SendMailDto)
    }
}
