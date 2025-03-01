export interface EmailSenderModel {
    address: string;
    name: string;
}

export interface SendMailDto {
    sender: string;
    receivers: string[];
    subject: string;
    body_template: string;
}
