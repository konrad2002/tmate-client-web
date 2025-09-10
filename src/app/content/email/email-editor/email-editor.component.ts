import {Component, Input, OnInit} from '@angular/core';
import {AngularEditorConfig, AngularEditorModule} from '@kolkov/angular-editor';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {EmailSenderModel} from '../../../core/model/email.model';
import {MemberModel} from '../../../core/model/member.model';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {ConfigService} from '../../../core/service/api/config.service';
import {NgIf} from '@angular/common';
import {MemberService} from '../../../core/service/api/member.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {EmailService} from '../../../core/service/api/email.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HasPermissionDirective} from '../../../core/directive/has-permission.directive';

@Component({
    selector: 'app-email-editor',
    imports: [
        AngularEditorModule,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        MatChipGrid,
        MatChipRemove,
        MatIcon,
        MatChipRow,
        NgIf,
        MatChipInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        HasPermissionDirective
    ],
    templateUrl: './email-editor.component.html',
    styleUrl: './email-editor.component.scss',
    standalone: true
})
export class EmailEditorComponent implements OnInit {
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '300px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Schreibe eine E-Mail...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            [],
            [
                'backgroundColor',
                'customClasses',
                'insertImage',
                'insertVideo',
            ]
        ]
    } as AngularEditorConfig;
    specialFields?: SpecialFieldsConfig
    members: MemberModel[] = [];
    filteredMembers = () => {
        if (!this.specialFields || !this.memberSearchText || this.memberSearchText.length < 3) return [];
        console.log("this.memberSearchText.toLowerCase()")
        console.log(this.memberSearchText)
        console.log(this.memberSearchText.toLowerCase())
        return this.members.filter(member => {
            const firstName: string = member.data[this.specialFields!.first_name];
            const lastName: string = member.data[this.specialFields!.last_name];
            return (firstName.toLowerCase().includes(this.memberSearchText.toLowerCase())) || (lastName.toLowerCase().includes(this.memberSearchText.toLowerCase()));
        })
    };

    memberSearchText = "";

    // TODO: fetch from config api
    // TODO: allow user's personal email
    availableSenders?: EmailSenderModel[];

    htmlContent = "";
    subject = "";
    sender?: string;
    @Input() receivers: MemberModel[] = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    constructor(
        private configService: ConfigService,
        private memberService: MemberService,
        private emailService: EmailService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.configService.getSpecialFields().subscribe(config => {
            this.specialFields = config;
        })

        this.memberService.getMembers().subscribe(members => {
            this.members = members;
        })

        this.emailService.getEmailSenders().subscribe(senders => {
            this.availableSenders = senders;
        })
    }

    removeReceiver(receiver: MemberModel) {
        const index = this.receivers.indexOf(receiver, 0);
        this.receivers.splice(index, 1)
    }

    addReceiver($event: MatAutocompleteSelectedEvent) {
        console.log("try to add member:")
        console.log($event.option.value)
        this.receivers.push($event.option.value)
        this.memberSearchText = "";
    }

    displayReceiverFn(member: MemberModel) {
        if (!this.specialFields) return "";
        return member.data[this.specialFields.last_name] + ", " + member.data[this.specialFields.first_name];
    }

    add($event: MatChipInputEvent) {
        console.log("add triggered", $event);
    }

    sendMail() {
        if (!this.sender) return;
        this.emailService.sendEmail(this.sender, this.receivers.map(member => {
            return member.id
        }), this.subject, this.htmlContent).subscribe({
            next: _ => {
                this.snackBar.open("Successfully sent emails!")
            },
            error: err => {
                this.snackBar.open("Failed to send emails!")
                console.log(err)
            }
        })
    }
}
