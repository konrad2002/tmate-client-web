import {Component, inject, Inject, OnInit} from '@angular/core';
import {MemberModel} from '../../../core/model/member.model';
import {
    MAT_DIALOG_DATA, MatDialog,
    MatDialogActions, MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton,} from '@angular/material/button';
import {FieldService} from '../../../core/service/api/field.service';
import {FieldModel, FieldType} from '../../../core/model/field.model';
import {MatOption, MatSelect} from '@angular/material/select';
import {KeyValuePipe} from '@angular/common';
import {MemberService} from '../../../core/service/api/member.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PartialObserver} from 'rxjs';
import {SpinnerComponent} from '../../elements/spinner/spinner.component';
import {FamilyMemberFindDialogComponent} from '../family-member-find-dialog/family-member-find-dialog.component';
import {Families,} from '../../../core/model/family.model';
import {SpecialFieldsConfig} from '../../../core/model/config.model';
import {ConfigService} from '../../../core/service/api/config.service';
import {MatIcon} from '@angular/material/icon';
import {FormModel} from '../../../core/model/form.model';
import {FormService} from '../../../core/service/api/form.service';

export interface MemberCreationDialogData {
    formId: string;
    member: MemberModel;
    edit: boolean;
}

@Component({
    selector: 'app-member-creation-dialog',
    templateUrl: './member-creation-dialog.component.html',
    styleUrl: './member-creation-dialog.component.scss',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        FormsModule,
        MatInput,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatLabel,
        MatSelect,
        MatOption,
        KeyValuePipe,
        SpinnerComponent,
        MatIconButton,
        MatIcon,
    ],
    standalone: true
})
export class MemberCreationDialogComponent implements OnInit {
    protected readonly FieldType = FieldType;

    private snackBar: MatSnackBar = inject(MatSnackBar);
    private fieldService: FieldService = inject(FieldService);
    private memberService: MemberService = inject(MemberService);
    private configService: ConfigService = inject(ConfigService);
    private dialog: MatDialog = inject(MatDialog);
    private formService: FormService = inject(FormService);

    fields: FieldModel[] = [];
    member: MemberModel = {data: {}} as MemberModel;

    fetching = 0;

    families?: Families;

    form?: FormModel;

    special_fields: SpecialFieldsConfig = {} as SpecialFieldsConfig;

    addedFamilyMember?: MemberModel

    constructor(
        public dialogRef: MatDialogRef<MemberCreationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MemberCreationDialogData
    ) {
    }

    ngOnInit() {
        this.fetching++;
        this.fieldService.getFields().subscribe({
            next: fields => {
                this.fields = fields;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetching++;
        this.formService.getFormById(this.data.formId).subscribe({
            next: form => {
                this.form = form;

                if (!this.data.edit) {
                    for (const [key, value] of Object.entries(this.form.defaults)) {
                        this.member.data[key] = value;
                    }
                }

                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetching++;
        this.memberService.getFamilies().subscribe({
            next: families => {
                this.families = families;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        this.fetching++;
        this.configService.getSpecialFields().subscribe({
            next: config => {
                this.special_fields = config;
                this.fetching--;
            }, error: _ => { this.fetching--; }
        })

        if (this.data.edit) {
            this.fetching++;
            this.memberService.getMemberById(this.data.member.id).subscribe({
                next: member => {
                    this.member = member;
                    console.log("loaded details for member: ", member);
                    this.fetching--;
                }, error: _ => {
                    this.fetching--;
                }
            })
        }
    }

    saveMember() {
        if (this.data.edit) {
            this.memberService.updateMember(this.member, this.addedFamilyMember?.id).subscribe(this.handleAfterSave)
        } else {
            this.memberService.addMember(this.member, this.addedFamilyMember?.id).subscribe(this.handleAfterSave);
        }
    }

    handleAfterSave: PartialObserver<MemberModel> = {
        next: member => {
            this.snackBar.open("Mitglied erfolgreich gespeichert!");
            this.dialogRef.close(member);
        },
        error: _ => {
            this.snackBar.open("Fehler beim Speichern des Mitglieds!");
        }
    }

    openMemberSearchDialog() {
        const dialogRef = this.dialog.open(FamilyMemberFindDialogComponent, {
            width: '95%',
            maxWidth: '950px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.addedFamilyMember = result;
        });
    }

    getFieldByName(fieldName: string): FieldModel {
        return this.fields.find(field => field.name === fieldName)!;
    }
}
